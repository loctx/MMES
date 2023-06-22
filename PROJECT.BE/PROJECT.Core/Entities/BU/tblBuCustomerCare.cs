using PROJECT.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.CORE.Entities.BU
{
    public class tblBuCustomerCare : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [MaxLength(50)]
        public string OrderCode { get; set; }

        public DateTime CareDate { get; set; }

        public string Content { get; set; }
    }
}
