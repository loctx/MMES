using PROJECT.CORE;
using PROJECT.BUSINESS.Common.Class;
using PROJECT.BUSINESS.Dtos.Common;
using PROJECT.BUSINESS.Filter.Common;

namespace PROJECT.BUSINESS.Common
{
    public interface IGenericService<TEntity, TDto> : IBaseService
    {
        Task<IList<TDto>> GetAll();
        Task<TDto> GetById(object id);
        Task<TDto> Add(TDto dto);
        Task Update(TDto dto);
        Task Delete(TDto dto);
        Task<PagedResponseDto> Paging(IQueryable<TEntity> query, BaseFilter filter);
    }
}
