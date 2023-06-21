using PROJECT.CORE.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.CORE.Entities.MD
{
    public class tblMdArea : BaseEntity
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
