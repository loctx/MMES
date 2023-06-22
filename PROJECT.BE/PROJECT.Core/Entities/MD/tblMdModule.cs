using PROJECT.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.CORE.Entities.MD
{
    public class tblMdModule : BaseEntity
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string PId { get; set; }
        public string Notes { get; set; }
        public string LicenseKey { get; set; }
        public int? NumberOrder { get; set; }
        public bool? State { get; set; }
    }
}
