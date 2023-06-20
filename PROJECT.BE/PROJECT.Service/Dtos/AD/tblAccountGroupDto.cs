using AutoMapper;
using PROJECT.CORE.Entities.AD;
using PROJECT.BUSINESS.Common.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PROJECT.BUSINESS.Dtos.Common;

namespace PROJECT.BUSINESS.Dtos.AD
{
    public class tblAccountGroupDto : BaseDto, IMapFrom
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public bool State { get; set; } = true;
        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccountGroup, tblAccountGroupDto>().ReverseMap();
        }
    }
}
