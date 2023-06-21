using AutoMapper;
using PROJECT.CORE.Entities.AD;
using PROJECT.BUSINESS.Common.Mapping;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.BUSINESS.Dtos.AD
{
    public class tblMenuDto : IMapFrom
    {
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }

        public string PId { get; set; }

        public int OrderNumber { get; set; }

        public string RightId { get; set; }
        public string Url { get; set; }
        public string Icon { get; set; }
        public List<tblMenuDto> Children { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdMenu, tblMenuDto>().ReverseMap();
        }
    }
}
