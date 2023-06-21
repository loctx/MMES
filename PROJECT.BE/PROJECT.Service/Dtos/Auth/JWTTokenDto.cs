using PROJECT.BUSINESS.Dtos.AD;

namespace PROJECT.BUSINESS.Dtos.Auth
{
    public class JWTTokenDto
    {
        public string accessToken { get; set; }
        public string refreshToken { get; set; }
        public tblAccountDto accountInfo { get; set; }
    }
}
