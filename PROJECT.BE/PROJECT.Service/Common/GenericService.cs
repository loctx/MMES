using AutoMapper;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.EntityFrameworkCore;
using PROJECT.CORE;
using PROJECT.BUSINESS.Common.Class;
using PROJECT.BUSINESS.Dtos.Common;
using PROJECT.BUSINESS.Filter.Common;
using DocumentFormat.OpenXml.VariantTypes;
using System.Reflection;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.BUSINESS.Common
{
    public abstract class GenericService<TEntity, TDto> : BaseService, IGenericService<TEntity, TDto> where TDto : class where TEntity : class
    {

        public GenericService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {

        }

        /// <summary>
        /// Lấy ra thuộc tính được thiết lập là key trong DTO
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        private PropertyInfo GetKeyField(TDto dto)
        {
            PropertyInfo keyProperty = null;
            Type t = dto.GetType();
            foreach (PropertyInfo pi in t.GetProperties())
            {
                object[] attrs = pi.GetCustomAttributes(typeof(KeyAttribute), false);
                if (attrs != null && attrs.Length == 1)
                {
                    keyProperty = pi;
                    break;
                }
            }
            return keyProperty;
        }

        /// <summary>
        /// Lấy giá trị của thuộc tính được thiết lập là key trong DTO
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        private object GetValueOfKeyField(TDto dto, PropertyInfo keyProperty)
        {
            object value = null;
            if (keyProperty != null)
            {
                value = keyProperty.GetValue(dto, null);
            }
            return value;
        }

        public virtual async Task<PagedResponseDto> Search(BaseFilter filter)
        {
            return null;
        }

        public virtual async Task<IList<TDto>> GetAll()
        {
            try
            {
                var lstEntity = await this._dbContext.Set<TEntity>().ToListAsync();
                return _mapper.Map<List<TDto>>(lstEntity);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public virtual async Task<TDto> GetById(object id)
        {
            try
            {
                var entity = await this._dbContext.Set<TEntity>().FindAsync(id);
                return _mapper.Map<TDto>(entity);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public virtual async Task<TDto> Add(TDto dto)
        {
            try
            {
                var keyField = this.GetKeyField(dto);
                if (keyField == null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "2002";
                    return null;
                }
                var keyValue = this.GetValueOfKeyField(dto, keyField);
                var entityInDB = await this._dbContext.Set<TEntity>().FindAsync(keyValue);
                if (entityInDB != null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "2001";
                    return null;
                }
                var entity = _mapper.Map<TEntity>(dto);
                var entityResult = await this._dbContext.Set<TEntity>().AddAsync(entity);
                await this._dbContext.SaveChangesAsync();
                var dtoResult = _mapper.Map<TDto>(entityResult.Entity);
                return dtoResult;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }
        public virtual async Task Delete(TDto dto)
        {
            try
            {
                var entity = _mapper.Map<TEntity>(dto);
                this._dbContext.Entry(entity).State = EntityState.Deleted;
                //this._dbContext.Set<TEntity>().Remove(entity);
                await this._dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }

        /// <summary>
        /// Chú ý khi sử dụng phương thức Update Generic. Nó sẽ update toàn bộ thuộc tính của TEntity
        /// Để chỉ update các thuộc tính trong DTO cần overide lại hàm này
        /// Ví dụ
        /// var saleOrderInDB = await this._dbContext.tblStoreOrderOperating.FindAsync(saleOrder.Id); --> lấy entity để tracker
        /// this._mapper.Map(saleOrder, saleOrderInDB); --> Dòng code này sẽ cập nhật dữ liệu từ DTO --> entity đang được tracker
        /// await this._dbContext.SaveChangesAsync();
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public virtual async Task Update(TDto dto)
        {
            try
            {
                var keyField = this.GetKeyField(dto);
                if (keyField == null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "2002";
                    return;
                }
                var keyValue = this.GetValueOfKeyField(dto, keyField);
                var entityInDB = await this._dbContext.Set<TEntity>().FindAsync(keyValue);
                if (entityInDB == null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "2003";
                    return;
                }
                this._mapper.Map(dto, entityInDB);
                await this._dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }

        public virtual async Task<PagedResponseDto> Paging(IQueryable<TEntity> query, BaseFilter filter)
        {
            try
            {
                var pagedResponseDto = new PagedResponseDto();
                pagedResponseDto.TotalRecord = await query.CountAsync();
                pagedResponseDto.CurrentPage = filter.CurrentPage;
                pagedResponseDto.PageSize = filter.PageSize;
                pagedResponseDto.TotalPage = Convert.ToInt32(Math.Ceiling((double)pagedResponseDto.TotalRecord / (double)pagedResponseDto.PageSize));
                var result = query.Skip((filter.CurrentPage - 1) * filter.PageSize).Take(filter.PageSize).ToList();
                //this._dbContext.ChangeTracker.Clear();
                //this._dbContext.Dispose();
                pagedResponseDto.Data = _mapper.Map<List<TDto>>(result);
                return pagedResponseDto;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }
    }
}
