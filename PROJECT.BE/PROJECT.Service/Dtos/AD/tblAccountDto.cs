using AutoMapper;
using PROJECT.CORE.Entities.AD;
using PROJECT.BUSINESS.Common.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.BUSINESS.Dtos.AD
{
    public class tblAccountDto : IMapFrom
    {
        [Key]
        public string UserName { get; set; }
        public string FullName { get; set; }
        public Guid GroupId { get; set; }
        public bool State { get; set; } = true;
        public tblAccountGroupDto AccountGroup { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccount, tblAccountDto>().ReverseMap();
        }
    }
}
