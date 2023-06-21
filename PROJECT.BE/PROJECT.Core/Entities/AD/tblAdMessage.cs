using PROJECT.CORE.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
