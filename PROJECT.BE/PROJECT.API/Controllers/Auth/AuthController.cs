using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UAParser;
using PROJECT.BUSINESS.Common.Authentication;
using PROJECT.BUSINESS.Services.AD;
using PROJECT.BUSINESS.Dtos.Auth;
using PROJECT.BUSINESS.Common.Class;
using PROJECT.API.AppCode.Util;
using PROJECT.BUSINESS.Services.Auth;
using PROJECT.API.AppCode.Enum;

namespace PROJECT.API.Controllers.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IAuthService _service;
        public IConfiguration _configuration { get; set; }
        public AuthController(IAuthService service, IConfiguration configuration)
        {
            _service = service;
            _configuration = configuration;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginInfo)
        {
            var transferObject = new TransferObject();
            var account = _service.CheckLogin(loginInfo);
            if (_service.Status)
            {
                var token = await this.GenJwtToken(loginInfo.UserName);
                var jwtTokenDto = new JWTTokenDto()
                {
                    accessToken = token,
                    accountInfo = account
                };
                transferObject.Data = jwtTokenDto;
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                MessageUtil.GetMessage("1000", _service, transferObject);
            }
            return Ok(transferObject);
        }

        /// <summary>
        /// Tạo token JWT
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        private async Task<string> GenJwtToken(string userName)
        {
            var claims = new[] { 
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim(ClaimTypes.Name, userName)
                    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: signIn);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
