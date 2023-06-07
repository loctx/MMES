using AutoMapper;
using PROJECT.Core.Models.AD;
using PROJECT.Service.Commons.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.Service.Dtos.AD
{
    public class T_AD_RIGHT_Dto :IMapFrom
    {
        public string CODE { get; set; }
        public string NAME { get; set; }
        public string PARENT { get; set; }
        public int C_ORDER { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<T_AD_RIGHT, T_AD_RIGHT_Dto>().ReverseMap();
        }
    }
}
