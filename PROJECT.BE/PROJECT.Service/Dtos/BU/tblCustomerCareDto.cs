using AutoMapper;
using PROJECT.BUSINESS.Common.Mapping;
using PROJECT.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.BUSINESS.Dtos.BU
{
    public class tblCustomerCareDto : IMapFrom
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderCode { get; set; }

        public DateTime CareDate { get; set; }

        public string Content { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuCustomerCare, tblCustomerCareDto>().ReverseMap();
        }
    }
}
