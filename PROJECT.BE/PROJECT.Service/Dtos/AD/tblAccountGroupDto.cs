using AutoMapper;
using PROJECT.CORE.Entities.AD;
using PROJECT.BUSINESS.Common.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.BUSINESS.Dtos.AD
{
    public class tblAccountGroupDto : IMapFrom
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool State { get; set; } = true;
        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccountGroup, tblAccountGroupDto>().ReverseMap();
        }
    }
}
