using PROJECT.BUSINESS.Filter.Common;

namespace PROJECT.BUSINESS.Filter.AD
{
    public class AccountFilter : BaseFilter
    {
        public Guid? GroupId { get; set; }
        public bool? State { get; set; }
    }
}
