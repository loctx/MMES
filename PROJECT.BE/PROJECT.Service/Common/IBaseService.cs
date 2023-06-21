using PROJECT.BUSINESS.Common.Class;

namespace PROJECT.BUSINESS.Common
{
    public interface IBaseService
    {
        MessageObject MessageObject { get; set; }
        Exception Exception { get; set; }
        bool Status { get; set; }
    }
}
