using AutoMapper;
using PROJECT.BUSINESS.Common;
using PROJECT.BUSINESS.Dtos.Common;
using PROJECT.BUSINESS.Dtos.MD;
using PROJECT.BUSINESS.Filter.Common;
using PROJECT.CORE;
using PROJECT.CORE.Entities.MD;

namespace PROJECT.BUSINESS.Services.MD
{
    public interface IStoneService : IGenericService<tblMdStone, tblStoneDto>
    {
    }
    public class StoneService : GenericService<tblMdStone, tblStoneDto>, IStoneService
    {
        public StoneService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override async Task<PagedResponseDto> Search(BaseFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdStone.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Code.Contains(filter.KeyWord) ||
                        x.Name.Contains(filter.KeyWord)
                    );
                }
                query = query.OrderBy(x => x.Code);
                return await this.Paging(query, filter);
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
