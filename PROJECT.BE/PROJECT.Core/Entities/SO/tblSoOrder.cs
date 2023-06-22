using PROJECT.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PROJECT.CORE.Entities.SO
{
    public class tblSoOrder : BaseEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string State { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PartnerCode { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string PartnerNote { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string AreaCode { get; set; }

        public DateTime? PourDate { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string PourLocation { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string PourCategory { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PourType { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string OrderType { get; set; }

        public virtual ICollection<tblSoOrderDetail> OrderDetails { get; set; }
    }
}
