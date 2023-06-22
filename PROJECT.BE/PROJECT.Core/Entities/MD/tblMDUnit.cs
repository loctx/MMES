using PROJECT.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.CORE.Entities.MD
{
    public class tblMdUnit : BaseEntity
    {
        [Required]
        [MaxLength(50)]
        [Key]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public virtual List<tblMdItem> ListItem { get; set; }

        public tblMdUnit()
        {
            ListItem = new List<tblMdItem>();
        }

        public bool? State { get; set; }
    }
}
