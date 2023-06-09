using System.ComponentModel.DataAnnotations;

namespace PROJECT.CORE.Common
{
    public class BaseEntity : IBaseEntity
    {
        public string CreateBy { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? CreateDay { get; set; }
        public DateTime? UpdateDay { get; set; }
    }
}
