using PROJECT.CORE.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.CORE.Entities.MD
{
    public class tblItems : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

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
