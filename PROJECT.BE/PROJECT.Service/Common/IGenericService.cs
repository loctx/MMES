using PROJECT.CORE;
using PROJECT.BUSINESS.Common.Class;

namespace PROJECT.BUSINESS.Common
{
    public interface IGenericService<TEntity, TDto> : IBaseService
    {
        Task<IList<TDto>> GetAll();
        Task<TDto> Add(TDto dto);
        Task Update(TDto dto);
        Task Delete(TDto dto);
    }
}
