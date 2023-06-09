using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROJECT.API.AppCode.Enum;
using PROJECT.API.AppCode.Util;
using PROJECT.BUSINESS.Common.Class;
using PROJECT.BUSINESS.Dtos.Auth;
using PROJECT.BUSINESS.Dtos.MD;
using PROJECT.BUSINESS.Filter.SO;
using PROJECT.BUSINESS.Services.AD;
using PROJECT.BUSINESS.Services.MD;
using PROJECT.CORE.Entities.MD;

namespace PROJECT.API.Controllers.MD
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitController : ControllerBase
    {
        public readonly IUnitService _service;
        public UnitController(IUnitService service)
        {
            _service = service;
        }

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] UnitFilter filter)
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

        [HttpPost("Insert")]
        public async Task<IActionResult> Insert([FromBody] tblMDUnitDto unit)
        {
            var transferObject = new TransferObject();
            var result = await _service.Add(unit);
            if (_service.Status)
            {
                transferObject.Data = result;
                transferObject.Status = true;
                transferObject.MessageObject.MessageType = MessageType.Success;
                MessageUtil.GetMessage("2002", _service, transferObject);
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                MessageUtil.GetMessage("2003", _service, transferObject);
            }
            return Ok(transferObject);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] tblMDUnitDto unit)
        {
            var transferObject = new TransferObject();
            await _service.Update(unit);
            if (_service.Status)
            {
                transferObject.Status = true;
                transferObject.MessageObject.MessageType = MessageType.Success;
                MessageUtil.GetMessage("2003", _service, transferObject);
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                MessageUtil.GetMessage("2004", _service, transferObject);
            }
            return Ok(transferObject);
        }
    }
}
