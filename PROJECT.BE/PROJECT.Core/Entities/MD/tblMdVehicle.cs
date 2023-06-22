using PROJECT.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.CORE.Entities.MD
{
    public class tblMdVehicle : BaseEntity
    {
        [Required]
        [MaxLength(50)]
        [Key]
        public string Code { get; set; }

        public double Tonnage { get; set; }

        [MaxLength(255)]
        public string Driver { get; set; }

        public string TypeCode { get; set; }

        public virtual tblMdVehicleType VehicleType { get; set; }
    }
}
