using AutoMapper;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.EntityFrameworkCore;
using PROJECT.CORE;
using PROJECT.BUSINESS.Common.Class;
using PROJECT.BUSINESS.Dtos.Common;
using PROJECT.BUSINESS.Filter.Common;

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
                var dtoResult = _mapper.Map<TDto>(entityResult);
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
                this._dbContext.Set<TEntity>().Remove(entity);
                await this._dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }
        public virtual async Task Update(TDto dto)
        {
            try
            {
                var entity = _mapper.Map<TEntity>(dto);
                this._dbContext.Set<TEntity>().Update(entity);
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
                pagedResponseDto.Data = query.Skip((filter.CurrentPage - 1) * filter.PageSize).Take(filter.PageSize);
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
