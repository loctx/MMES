using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROJECT.API.AppCode.Enum;
using PROJECT.API.AppCode.Extensions;
using PROJECT.API.AppCode.Util;
using PROJECT.BUSINESS.Common.Class;
using PROJECT.BUSINESS.Dtos.Auth;
using PROJECT.BUSINESS.Dtos.MD;
using PROJECT.BUSINESS.Filter.Common;
using PROJECT.BUSINESS.Filter.SO;
using PROJECT.BUSINESS.Services.AD;
using PROJECT.BUSINESS.Services.MD;
using PROJECT.CORE.Entities.MD;

namespace PROJECT.API.Controllers.MD
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartnerController : ControllerBase
    {
        public readonly IPartnerService _service;
        public PartnerController(IPartnerService service)
        {
            _service = service;
        }

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] BaseFilter filter)
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
                transferObject.GetMessage("2000", _service);
            }
            return Ok(transferObject);
        }

        [HttpPost("Insert")]
        public async Task<IActionResult> Insert([FromBody] tblPartnerDto unit)
        {
            var transferObject = new TransferObject();
            // unit.Id = Guid.NewGuid();
            var result = await _service.Add(unit);
            if (_service.Status)
            {
                transferObject.Data = result;
                transferObject.Status = true;
                transferObject.MessageObject.MessageType = MessageType.Success;
                transferObject.GetMessage("0100", _service);
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0101", _service);
            }
            return Ok(transferObject);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] tblPartnerDto unit)
        {
            var transferObject = new TransferObject();
            await _service.Update(unit);
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

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromBody] tblPartnerDto unit)
        {
            var transferObject = new TransferObject();
            await _service.Delete(unit);
            if (_service.Status)
            {
                transferObject.Status = true;
                transferObject.MessageObject.MessageType = MessageType.Success;
                transferObject.GetMessage("0105", _service);
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0106", _service);
            }
            return Ok(transferObject);
        }
    }
}
