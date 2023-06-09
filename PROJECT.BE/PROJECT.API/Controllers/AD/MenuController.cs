using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PROJECT.API.AppCode.Enum;
using PROJECT.API.AppCode.Util;
using PROJECT.BUSINESS.Common.Class;
using PROJECT.BUSINESS.Filter.SO;
using PROJECT.BUSINESS.Services.AD;

namespace PROJECT.API.Controllers.AD
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        public readonly IMenuService _service;
        public MenuController(IMenuService service)
        {
            _service = service;
        }

        [HttpGet("GetMenuOfUser")]
        public async Task<IActionResult> GetMenuOfUser(string userName)
        {
            var transferObject = new TransferObject();
            var result = await _service.BuildDataForTree();
            if (_service.Status)
            {
                transferObject.Data = result;
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                MessageUtil.GetMessage("2000", _service, transferObject);
            }
            return Ok(transferObject);
        }
    }
}
