using PROJECT.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.CORE.Entities.AD
{
    public class tblAdMessage : BaseEntity
    {
        [Key]
        public string Code { get; set; }

        public string Lang { get; set; }

        public string Value { get; set; }
    }
}
