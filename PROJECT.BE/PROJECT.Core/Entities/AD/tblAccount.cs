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
    public class tblAccount : BaseEntity
    {
        public int Id { get; set; }
        [Key]
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        [NotMapped]
        public string Email { get; set; }
        public int GroupId { get; set; }
        public bool State { get; set; } = true;
        public string DeviceId { get; set; }
        public DateTime? DeviceIdDayUpdate { get; set; }
    }
}
