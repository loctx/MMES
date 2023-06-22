using PROJECT.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PROJECT.CORE.Entities.SO
{
    public class tblSoOrderDetail : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [ForeignKey("tblSoOrder")]
        [Column(TypeName = "varchar(50)")]
        public string OrderCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string ItemCode { get; set; }

        public bool? IsMainItem { get; set; }

        public double OrderNumber { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string SandCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string StoneCode { get; set; }
        public virtual tblSoOrder Order { get; set; }
    }
}
