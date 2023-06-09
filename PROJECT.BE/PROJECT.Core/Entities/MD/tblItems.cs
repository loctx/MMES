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
        public int ItemId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Code { get; set; }

        [Required]
        [MaxLength(225)]
        public string Name { get; set; }

        // [Required]
        // [MaxLength(50)]
        // public Guid PartnerId { get; set; }

        [Required]
        public string UnitCode { get; set; }

        public double? Price { get; set; }

        public string Note { get; set; }

        public bool State { get; set; } = true;

        public bool? IsDeleted { get; set; } = true;

        public bool? IsFinishedProduct { get; set; } = true;

        public int Type { get; set; }
    }
}
