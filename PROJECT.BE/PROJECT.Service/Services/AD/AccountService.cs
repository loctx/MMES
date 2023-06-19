using AutoMapper;
using PROJECT.BUSINESS.Common;
using PROJECT.BUSINESS.Dtos.AD;
using PROJECT.CORE;
using PROJECT.CORE.Entities.AD;

namespace PROJECT.BUSINESS.Services.AD
{
    public interface IAccountService : IGenericService<tblAdAccount, tblAccountDto>
    {

    }

    public class AccountService : GenericService<tblAdAccount, tblAccountDto>, IAccountService
    {
        public AccountService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
