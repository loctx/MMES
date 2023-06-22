using AutoMapper;
using PROJECT.BUSINESS.Common;
using PROJECT.BUSINESS.Dtos.BU;
using PROJECT.BUSINESS.Dtos.Common;
using PROJECT.BUSINESS.Filter.Common;
using PROJECT.CORE;
using PROJECT.CORE.Entities.BU;

namespace PROJECT.BUSINESS.Services.BU
{
    public interface ICustomerCareService : IGenericService<tblBuCustomerCare, tblCustomerCareDto>
    {
    }
    public class CustomerCareService : GenericService<tblBuCustomerCare, tblCustomerCareDto>, ICustomerCareService
    {
        public CustomerCareService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override async Task<PagedResponseDto> Search(BaseFilter filter)
        {
            try
            {
                var query = _dbContext.tblBuCustomerCare.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.OrderCode.Contains(filter.KeyWord) ||
                        x.Content.Contains(filter.KeyWord)
                    );
                }
                query = query.OrderBy(x => x.OrderCode);
                return await Paging(query, filter);
            }
            catch (Exception ex)
            {
                Status = false;
                Exception = ex;
                return null;
            }
        }
    }
}
