using AutoMapper;
using PROJECT.BUSINESS.Common;
using PROJECT.BUSINESS.Dtos.AD;
using PROJECT.BUSINESS.Dtos.Common;
using PROJECT.BUSINESS.Filter.Common;
using PROJECT.CORE;
using PROJECT.CORE.Entities.AD;

namespace PROJECT.BUSINESS.Services.AD
{
    public interface IAccountGroupService : IGenericService<tblAdAccountGroup, tblAccountGroupDto>
    {
    }

    public class AccountGroupService : GenericService<tblAdAccountGroup, tblAccountGroupDto>, IAccountGroupService
    {
        public AccountGroupService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
