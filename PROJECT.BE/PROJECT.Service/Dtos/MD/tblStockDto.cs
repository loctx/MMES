using AutoMapper;
using PROJECT.BUSINESS.Common.Mapping;
using PROJECT.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.BUSINESS.Dtos.MD
{
    public class tblStockDto : IMapFrom
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public bool? State { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdStock, tblStockDto>().ReverseMap();
        }
    }
}
