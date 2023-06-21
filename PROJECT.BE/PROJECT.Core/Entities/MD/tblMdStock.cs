using PROJECT.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.CORE.Entities.MD
{
    public class tblMdStock : BaseEntity
    {
        [Required]
        [MaxLength(20)]
        [Key]
        public string Code { get; set; }

        [Required]
        [MaxLength(250)]
        public string Name { get; set; }
    }
}
