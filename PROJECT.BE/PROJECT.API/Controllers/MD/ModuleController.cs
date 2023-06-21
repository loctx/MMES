using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PROJECT.API.AppCode.Enum;
using PROJECT.API.AppCode.Extensions;
using PROJECT.BUSINESS.Common.Class;
using PROJECT.BUSINESS.Dtos.MD;
using PROJECT.BUSINESS.Services.MD;

namespace PROJECT.API.Controllers.MD
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModuleController : ControllerBase
    {
        public readonly IModuleService _service;
        public ModuleController(IModuleService service)
        {
            _service = service;
        }

        [AllowAnonymous]
        [HttpGet("getDataTree")]
        public async Task<IActionResult> GetDataTree()
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
                transferObject.GetMessage("2000", _service);
            }
            return Ok(transferObject);
        }


        [HttpPut("updateOrderTree")]
        public async Task<IActionResult> UpdateNews([FromBody] tblMdModuleDto moduleDto)
        {
            var transferObject = new TransferObject();
            await _service.UpdateOrderTree(moduleDto);
            if (_service.Status)
            {
                transferObject.Status = true;
                transferObject.MessageObject.MessageType = MessageType.Success;
                transferObject.GetMessage("0103", _service);
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0104", _service);
            }
            return Ok(transferObject);
        }
    }
}
