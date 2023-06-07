using AutoMapper;
using PROJECT.Core.Models.AD;
using PROJECT.Service.Commons.Mapping;

namespace PROJECT.Service.Dtos.AD
{
    public class T_AD_ORGANIZE_Dto : IMapFrom
    {
        public string COMPANY_CODE { get; set; }
        public string PARENT_CODE { get; set; }
        public string NAME { get; set; }
        public string TYPE { get; set; }
        public int C_ORDER { get; set; }
        public string PLANT_CODE { get; set; }
        public string EMAIL { get; set; }
        public string PHONE { get; set; }
        public string PROJECT { get; set; }
        public bool IS_SEND_TO_SAP_IMMEDIATE { get; set; }
        public bool IS_DCNB_AFTER { get; set; }
        public bool IS_DCNB_BEFORE { get; set; }
        public string USER_EGAS { get; set; }
        public string PASS_EGAS { get; set; }
        public decimal LUONG_CANH_BAO { get; set; }
        public bool IS_CANH_BAO_GAN_NGAN { get; set; }
        public decimal LUONG_TON_KHO_MIN { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<T_AD_ORGANIZE, T_AD_ORGANIZE_Dto>().ReverseMap();
        }
    }
}
