using Microsoft.AspNetCore.Mvc;
using PROJECT.BUSINESS.Filter.Common;

namespace PROJECT.API.Controllers.Common
{
    public interface IControllerBase
    {
        Task<IActionResult> Search(BaseFilter filter);
    }
}
