using PROJECT.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.CORE.Entities.MD
{
    public class tblMdItem : BaseEntity
    {
        public Guid Id { get; set; }

        [Key]
        [Required]
        [MaxLength(50)]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public bool? State { get; set; }

        [Required]
        [MaxLength(50)]
        public string UnitCode { get; set; }

        [Required]
        [MaxLength(50)]
        public string TypeCode { get; set; }
    }
}
