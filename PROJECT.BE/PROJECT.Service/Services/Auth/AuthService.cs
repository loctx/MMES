using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PROJECT.BUSINESS.Common;
using PROJECT.BUSINESS.Common.Util;
using PROJECT.BUSINESS.Dtos.AD;
using PROJECT.BUSINESS.Dtos.Auth;
using PROJECT.CORE;
using PROJECT.CORE.Entities.AD;

namespace PROJECT.BUSINESS.Services.Auth
{
    public interface IAuthService : IGenericService<tblAdAccount, tblAccountDto>
    {
        Task<tblAccountDto> CheckLogin(LoginDto loginInfo);
        Task<tblAccountDto> GetAccount(string userName);

    }

    public class AuthService : GenericService<tblAdAccount, tblAccountDto>, IAuthService
    {
        public AuthService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<tblAccountDto> CheckLogin(LoginDto loginInfo)
        {
            if (string.IsNullOrWhiteSpace(loginInfo.UserName) || string.IsNullOrWhiteSpace(loginInfo.Password))
            {
                this.Status = false;
                this.MessageObject.Code = "1001"; //Để trống username, mật khẩu
                return null;
            }
            try
            {
                var account = await _dbContext.tblAdAccount.FirstOrDefaultAsync(
                    x => x.UserName == loginInfo.UserName &&
                    x.Password == Utils.CryptographyMD5(loginInfo.Password));
                if (account == null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "1002"; //Sai username hoặc mật khẩu
                    return null;
                }

                if (!account.State)
                {
                    this.Status = false;
                    this.MessageObject.Code = "1003"; //Tài khoản bị khóa
                    return null;
                }

                return _mapper.Map<tblAccountDto>(account);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<tblAccountDto> GetAccount(string userName)
        {
            var account = await _dbContext.tblAdAccount.FirstOrDefaultAsync(
                    x => x.UserName == userName);

            return _mapper.Map<tblAccountDto>(account);
        }
    }
}
