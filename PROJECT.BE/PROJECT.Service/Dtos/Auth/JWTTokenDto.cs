using PROJECT.BUSINESS.Dtos.AD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.BUSINESS.Dtos.Auth
{
    public class JWTTokenDto
    {
        public string accessToken { get; set; }
        public string refreshToken { get; set; }
        public tblAccountDto accountInfo { get; set; }
    }
}
