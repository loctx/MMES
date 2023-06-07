using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UAParser;
using PROJECT.Service.Interfaces.AD;
using PROJECT.Service.Commons.Authentication;
using PROJECT.Core.Models.AD;
using PROJECT.Service.Extention;

namespace PROJECT.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        public readonly IUserService _service;
        public AuthenticationController(IUserService service)
        {
            _service = service;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] Login user)
        {
            var userAgent = HttpContext.Request.Headers["User-Agent"];
            var uaParser = Parser.GetDefault();
            ClientInfo clientInfo = uaParser.Parse(userAgent);

            var result = await _service.CheckUserAuthentication(user);

            if (result == null)
            {
                return Ok(new TranferObject
                {
                    Status = false,
                    Data = null,
                    Message = new MessageObject()
                    {
                        Code = "E-LOGIN",
                        MessageDetail = "Sai tên đăng nhập hoặc mật khẩu!",
                        Message = "Đăng nhập không thành công!",
                        MessageType = "E"
                    }
                });
            }
            else
            {
                //Lấy các role quyền
                var lstRole = await _service.GetRightUserAuthentication(user.UserName);

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManager.AppSetting["JWT:Secret"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim>();
                claims.Add(new Claim("username", user.UserName.ToString()));
                claims.Add(new Claim(JwtRegisteredClaimNames.Name, user.UserName));
                claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

                foreach (var role in lstRole)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role.ToString()));
                }

                var tokeOptions = new JwtSecurityToken(issuer: ConfigurationManager.AppSetting["JWT:ValidIssuer"], audience: ConfigurationManager.AppSetting["JWT:ValidAudience"], claims, expires: DateTime.Now.AddHours(2), signingCredentials: signinCredentials);
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                ////Lưu lịch sử đăng nhập
                //var info = new T_AD_HISTORY_LOGIN()
                //{
                //    ID = Guid.NewGuid(),
                //    USER_NAME = result.USER_NAME,
                //    FULL_NAME = result.FULL_NAME,
                //    LOGIN_TIME = DateTime.Now,
                //    OS = clientInfo.OS.Family + " " + clientInfo.OS.Major,
                //    BROWSER = clientInfo.UA.Family + " " + clientInfo.UA.Major + "." + clientInfo.UA.Minor,
                //    IP_ADDRESS = Request.HttpContext.Connection.RemoteIpAddress?.ToString(),
                //    CONNECTION_ID = Request.HttpContext.Connection.Id.ToString()
                //};
                //await _service._context.T_AD_HISTORY_LOGIN.AddAsync(info);
                //await _service._context.SaveChangesAsync();

                result.PASSWORD = "";
                return Ok(new TranferObject
                {
                    Status = false,
                    Data = new JWTTokenResponse
                    {
                        Token = tokenString,
                        User = result,
                        ListRight = lstRole.Distinct().ToList(),

                    },
                    Message = new MessageObject()
                    {
                        Code = "S-LOGIN",
                        MessageDetail = $"Xin chào! {user.UserName}!",
                        Message = "Hoorayyy!",
                        MessageType = "S"
                    }
                });
            }
            return Unauthorized();
        }
    }
}
