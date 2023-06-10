using AutoMapper;
using PROJECT.BUSINESS.Common;
using PROJECT.BUSINESS.Dtos.AD;
using PROJECT.BUSINESS.Dtos.Auth;
using PROJECT.CORE;
using PROJECT.CORE.Entities.AD;

namespace PROJECT.BUSINESS.Services.Auth
{
    public interface IAuthService : IGenericService<tblAccount, tblAccountDto>
    {
        tblAccountDto CheckLogin(LoginDto loginInfo);
    }

    public class AuthService : GenericService<tblAccount, tblAccountDto>, IAuthService
    {
        public AuthService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public tblAccountDto CheckLogin(LoginDto loginInfo)
        {
            if (string.IsNullOrWhiteSpace(loginInfo.UserName) || string.IsNullOrWhiteSpace(loginInfo.Password))
            {
                this.Status = false;
                this.MessageObject.Code = "1001"; //Để trống username, mật khẩu
                return null;
            }
            try
            {
                throw new Exception("test");

                var account = this._dbContext.tblAccount.FirstOrDefault(
                    x => x.UserName == loginInfo.UserName &&
                    x.Password == this.CryptographyMD5(loginInfo.Password));
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

        private string CryptographyMD5(string source)
        {
            System.Security.Cryptography.MD5CryptoServiceProvider objMD5 = new System.Security.Cryptography.MD5CryptoServiceProvider();
            byte[] buffer = System.Text.Encoding.UTF8.GetBytes(source);
            byte[] bytHash = objMD5.ComputeHash(buffer);
            string result = "";
            foreach (byte a in bytHash)
            {
                result += int.Parse(a.ToString(), System.Globalization.NumberStyles.HexNumber).ToString();
            }
            return result;
        }
    }
}
