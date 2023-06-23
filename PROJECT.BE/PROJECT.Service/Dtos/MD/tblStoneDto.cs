using AutoMapper;
using PROJECT.BUSINESS.Common.Mapping;
using PROJECT.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.BUSINESS.Dtos.MD
{
    public class tblStoneDto : IMapFrom
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public bool? State { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdStone, tblStoneDto>().ReverseMap();
        }
    }
}
