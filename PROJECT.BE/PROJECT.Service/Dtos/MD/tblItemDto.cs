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
    public class tblItemDto : IMapFrom
    {
        public Guid Id { get; set; }

        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public string UnitCode { get; set; }

        public string TypeCode { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdItem, tblItemDto>().ReverseMap();
        }
    }
}
