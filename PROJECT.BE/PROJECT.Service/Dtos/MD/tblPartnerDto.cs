using AutoMapper;
using PROJECT.BUSINESS.Common.Mapping;
using PROJECT.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.BUSINESS.Dtos.MD
{
    public class tblPartnerDto : IMapFrom
    {
        public Guid Id { get; set; }

        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public bool? State { get; set; }

        public bool IsCustomer { get; set; }

        public bool IsProvider { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdPartner, tblPartnerDto>().ReverseMap();
        }
    }
}
