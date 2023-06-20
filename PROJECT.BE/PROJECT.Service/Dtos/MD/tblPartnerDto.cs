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
    public class tblPartnerDto : IMapFrom
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

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
