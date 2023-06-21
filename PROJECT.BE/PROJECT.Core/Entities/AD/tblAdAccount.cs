using PROJECT.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.CORE.Entities.AD
{
    public class tblAdAccount : BaseEntity
    {
        [Key]
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public Guid GroupId { get; set; }
        public bool State { get; set; } = true;
        public virtual tblAdAccountGroup AccountGroup { get; set; }
    }
}
