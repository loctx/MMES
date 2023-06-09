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
    public class tblItemsDto : IMapFrom
    {
        public int ItemId { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string UnitCode { get; set; }

        public double? Price { get; set; }

        public string Note { get; set; }

        public bool State { get; set; } = true;

        public bool? IsDeleted { get; set; } = true;

        public bool? IsFinishedProduct { get; set; } = true;

        public int Type { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblItems, tblItemsDto>().ReverseMap();
        }
    }
}
