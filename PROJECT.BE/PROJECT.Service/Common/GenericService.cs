using AutoMapper;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.EntityFrameworkCore;
using PROJECT.CORE;
using PROJECT.BUSINESS.Common.Class;
using PROJECT.BUSINESS.Dtos.Common;
using PROJECT.BUSINESS.Filter.Common;
using DocumentFormat.OpenXml.VariantTypes;

namespace PROJECT.BUSINESS.Common
{
    public abstract class GenericService<TEntity, TDto> : BaseService, IGenericService<TEntity, TDto> where TDto : class where TEntity : class
    {
        
        public GenericService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            
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
                var entity = _mapper.Map<TEntity>(dto);
                this._dbContext.Entry(entity).State = EntityState.Modified;
                //this._dbContext.Set<TEntity>().Update(entity);
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
                pagedResponseDto.Data = _mapper.Map<List<TDto>>(query.Skip((filter.CurrentPage - 1) * filter.PageSize).Take(filter.PageSize));
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
