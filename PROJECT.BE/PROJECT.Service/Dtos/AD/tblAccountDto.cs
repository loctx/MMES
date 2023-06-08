using AutoMapper;
using PROJECT.CORE.Entities.AD;
using PROJECT.BUSINESS.Common.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.BUSINESS.Dtos.AD
{
    public class tblAccountDto : IMapFrom
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public int GroupId { get; set; }
        public bool State { get; set; } = true;
        public string DeviceId { get; set; }
        public DateTime? DeviceIdDayUpdate { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAccount, tblAccountDto>().ReverseMap();
        }
    }
}
