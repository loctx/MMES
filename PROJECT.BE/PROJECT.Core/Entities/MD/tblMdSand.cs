using PROJECT.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.CORE.Entities.MD
{
    public class tblMdSand : BaseEntity
    {
        [Required]
        [MaxLength(50)]
        [Key]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public bool? State { get; set; }
    }
}
