using AutoMapper;
using PROJECT.BUSINESS.Common.Mapping;
using PROJECT.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.BUSINESS.Dtos.MD
{
    public class tblItemDto : IMapFrom
    {
        public Guid Id { get; set; }

        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public bool? State { get; set; }

        public string UnitCode { get; set; }

        public string TypeCode { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdItem, tblItemDto>().ReverseMap();
        }
    }
}
