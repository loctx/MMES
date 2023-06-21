﻿using PROJECT.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PROJECT.CORE.Entities.AD
{
    public class tblAdAccountGroupRight : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public Guid GroupId { get; set; }
        public string RightId { get; set; }
        public virtual tblAdAccountGroup AccountGroup { get; set; }
        public virtual tblAdRight Right { get; set; }
    }
}
