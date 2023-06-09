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
    public class tblMenu : BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }

        public string PId { get; set; }

        public int OrderNumber { get; set; }

        public string RightId { get; set; }
        public string Url { get; set; }

        public string Icon { get; set; }
    }
}
