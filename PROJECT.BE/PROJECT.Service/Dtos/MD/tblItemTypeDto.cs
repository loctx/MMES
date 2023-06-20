using AutoMapper;
using PROJECT.BUSINESS.Common.Mapping;
using PROJECT.CORE.Dtos.SO;
using PROJECT.CORE.Entities.MD;
using PROJECT.CORE.Entities.SO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.BUSINESS.Dtos.MD
{
    public class tblItemTypeDto : IMapFrom
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdItemType, tblItemTypeDto>().ReverseMap();
        }
    }
}
