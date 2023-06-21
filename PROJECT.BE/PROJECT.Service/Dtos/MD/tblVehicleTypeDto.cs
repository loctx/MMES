using AutoMapper;
using PROJECT.BUSINESS.Common.Mapping;
using PROJECT.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.BUSINESS.Dtos.MD
{
    public class tblVehicleTypeDto : IMapFrom
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdVehicleType, tblVehicleTypeDto>().ReverseMap();
        }
    }
}
