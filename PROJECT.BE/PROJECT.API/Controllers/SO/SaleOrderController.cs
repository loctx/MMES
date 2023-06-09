using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PROJECT.API.AppCode.Enum;
using PROJECT.API.AppCode.Util;
using PROJECT.API.Controllers.Common;
using PROJECT.BUSINESS.Common.Class;
using PROJECT.BUSINESS.Dtos.Auth;
using PROJECT.BUSINESS.Filter.SO;
using PROJECT.BUSINESS.Services.AD;

namespace PROJECT.API.Controllers.SO
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleOrderController : ControllerBase, IControllerBase
    {
        public readonly ISaleOrderService _service;
        public SaleOrderController(ISaleOrderService service)
        {
            _service = service;
        }

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] SaleOrderFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.Search(filter);
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
