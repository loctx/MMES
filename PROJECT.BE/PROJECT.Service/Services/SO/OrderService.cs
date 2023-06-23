using AutoMapper;
using PROJECT.BUSINESS.Common;
using PROJECT.BUSINESS.Dtos.Common;
using PROJECT.BUSINESS.Dtos.SO;
using PROJECT.BUSINESS.Filter.Common;
using PROJECT.CORE;
using PROJECT.CORE.Entities.SO;

namespace PROJECT.BUSINESS.Services.SO
{
    public interface IOrderService : IGenericService<tblSoOrder, tblOrderDto>
    {

    }
    public class OrderService : GenericService<tblSoOrder, tblOrderDto>, IOrderService
    {
        public OrderService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override Task<PagedResponseDto> Search(BaseFilter filter)
        {
            try
            {
                var query = _dbContext.tblSoOrder
                .Where(x => string.IsNullOrEmpty(filter.KeyWord)
                            || x.Code.Contains(filter.KeyWord)
                            || x.PartnerCode.Contains(filter.KeyWord))
                .OrderByDescending(x => x.CreateDate);

                return base.Paging(query, filter);
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
