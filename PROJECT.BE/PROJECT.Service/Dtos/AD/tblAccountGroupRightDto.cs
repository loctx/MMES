using AutoMapper;
using PROJECT.CORE.Entities.AD;
using PROJECT.BUSINESS.Common.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PROJECT.BUSINESS.Dtos.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.BUSINESS.Dtos.AD
{
    public class tblAccountGroupRightDto : IMapFrom
    {
        public Guid Id { get; set; }
        public Guid GroupId { get; set; }
        public string RightId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccountGroupRight, tblAccountGroupRightDto>().ReverseMap();
        }
    }
}
