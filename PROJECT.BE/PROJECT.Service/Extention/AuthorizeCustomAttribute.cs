using Azure.Core.GeoJson;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using PROJECT.Service.Interfaces.AD;
using System.Security.Claims;

namespace PROJECT.Service.Extention
{
    public class RightAttribute : TypeFilterAttribute
    {
        public RightAttribute(string claimType, string claimValue) : base(typeof(CustomAuthorization))
        {
            Arguments = new object[] { new Claim(claimType, claimValue) };
        }
    }

    public class CustomAuthorization : IAuthorizationFilter
    {
        readonly Claim _claim;
        private readonly IUserService _userService;

        public CustomAuthorization(Claim claim, IUserService service)
        {
            _claim = claim;
            _userService = service;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var username = context.HttpContext.User.Claims.Where(c => c.Type == "username").FirstOrDefault()?.Value;
            var listRight = _claim.Value.Split(", ");
            var listRightDb = _userService.GetRightUserAuthentication(username);
            var check = 0;
            foreach (var item in listRight)
            {
                var hasClaim = listRightDb.Result.Any(x => x == item);
                if (hasClaim)
                {
                    check++;
                }
            }
            if (check == 0)
            {
                context.Result = new ObjectResult(new TranferObject
                {
                    Status = false,
                    Message = new MessageObject
                    {
                        Code = "E100",
                        MessageType = "E",
                        Message = "Oppsss!",
                        MessageDetail = $"Bạn chưa được phân quyền để vào chức năng này! Mã quyền cần phần quyền: {_claim.Value} !",
                    },
                    Data = null,
                });
            }
        }
    }
}
