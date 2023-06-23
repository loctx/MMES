using AutoMapper;
using PROJECT.BUSINESS.Common.Mapping;
using PROJECT.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.BUSINESS.Dtos.MD
{
    public class tblVehicleDto : IMapFrom
    {
        [Key]
        public string Code { get; set; }

        public double Tonnage { get; set; }

        public string Driver { get; set; }

        public string TypeCode { get; set; }

        public string TypeName { get; set; }

        public bool? State { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdVehicle, tblVehicleDto>()
                .ForMember(dst => dst.TypeName, opt => opt.MapFrom(src => src.VehicleType.Name))
                .ReverseMap();
        }
    }
}
