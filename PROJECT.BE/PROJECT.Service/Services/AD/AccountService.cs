using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PROJECT.BUSINESS.Common;
using PROJECT.BUSINESS.Common.Util;
using PROJECT.BUSINESS.Dtos.AD;
using PROJECT.BUSINESS.Dtos.Common;
using PROJECT.BUSINESS.Filter.Common;
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

        public override async Task<PagedResponseDto> Search(BaseFilter filter)
        {
            try
            {
                var query = this._dbContext.tblAdAccount.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.UserName.Contains(filter.KeyWord) ||
                        x.FullName.Contains(filter.KeyWord)
                    );
                }
                query = query.Include(x => x.AccountGroup).OrderBy(x => x.UserName);
                return await this.Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public override async Task<tblAccountDto> Add(tblAccountDto dto)
        {
            try
            {
                var find = await this.GetById(dto.UserName);
                if (find != null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "2001"; // Mã key đã tồn tại
                    return null;
                }

                var account = _mapper.Map<tblAdAccount>(dto);
                account.Password = Utils.CryptographyMD5($"{account.UserName}@123");
                var result = await this._dbContext.AddAsync(account);
                await this._dbContext.SaveChangesAsync();
                var dtoResult = _mapper.Map<tblAccountDto>(result.Entity);
                return dtoResult;
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
