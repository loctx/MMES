using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PROJECT.BUSINESS.Services.AD;
using System.Security.Claims;

namespace PROJECT.API.Controllers.MD
{
    [ApiController]
    //[Authorize]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _service;
        public AccountController(IAccountService service)
        {
            _service = service;
        }

        
    }
}
