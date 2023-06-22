using PROJECT.CORE.Common;
using System.ComponentModel.DataAnnotations;

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
        [MaxLength(100)]
        public string Name { get; set; }

        public bool? State { get; set; }

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
