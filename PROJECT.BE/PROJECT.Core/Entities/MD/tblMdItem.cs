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
        [MaxLength(225)]
        public string Name { get; set; }

        [Required]
        public string UnitCode { get; set; }

        [Required]
        public string TypeCode { get; set; }
    }
}
