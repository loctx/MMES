using PROJECT.CORE.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.CORE.Entities.MD
{
    public class tblMdPartner : BaseEntity
    {
        public Guid Id { get; set; }

        [Key]
        [Required]
        [MaxLength(50)]
        public string Code { get; set; }

        [Required]
        [MaxLength(225)]
        public string Name { get; set; }

        public bool IsCustomer { get; set; }

        public bool IsProvider { get; set; }

        [MaxLength(255)]
        public string Address { get; set; }

        [MaxLength(15)]
        public string PhoneNumber { get; set; }

        [MaxLength(50)]
        public string Email { get; set; }
    }
}
