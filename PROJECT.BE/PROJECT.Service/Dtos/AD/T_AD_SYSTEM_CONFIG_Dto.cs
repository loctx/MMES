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
    public class T_AD_SYSTEM_CONFIG_Dto : IMapFrom
    {
        public string PKID { get; set; }
        public string SAP_HOST { get; set; }
        public string SAP_CLIENT { get; set; }
        public string SAP_NUMBER { get; set; }
        public string SAP_USER_NAME { get; set; }
        public string SAP_PASSWORD { get; set; }
        public int SAP_TIME_DIFF { get; set; }
        public string TGBX_URL { get; set; }
        public string TGBX_USER_NAME { get; set; }
        public string TGBX_PASSWORD { get; set; }
        public int TGBX_TIME_DIFF { get; set; }
        public string TGBX_API_URL { get; set; }
        public string TGBX_API_USER_NAME { get; set; }
        public string TGBX_API_PASSWORD { get; set; }
        public string SMO_API_USER_NAME { get; set; }
        public string SMO_API_PASSWORD { get; set; }
        public string SMO_API_LINK_SMO { get; set; }
        public string SMS_WEBSERVICE { get; set; }
        public string SMS_APP { get; set; }
        public string SMS_PASSWORD { get; set; }
        public string SMS_BRAND_NAME { get; set; }
        public string MAIL_SMTPHOST { get; set; }
        public string MAIL_USER { get; set; }
        public string MAIL_PASSWORD { get; set; }
        public int MAIL_PORT { get; set; }
        public int JOB_STATUS_SAP { get; set; }
        public int JOB_STATUS_TGBX { get; set; }
        public int JOB_SEND_EMAIL { get; set; }
        public int JOB_SEND_SMS { get; set; }
        public int XTTD_TIME_DIFF { get; set; }
        public DateTime LAST_SYN_VEHICLE { get; set; }
        public string EGAS_WEBSERVICE { get; set; }
        public string EGAS_USER_NAME { get; set; }
        public string EGAS_PASSWORD { get; set; }
        public string SMO_KV2_API_LINK { get; set; }
        public string SMO_KV2_API_USER_NAME { get; set; }
        public string SMO_KV2_API_PASSWORD { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<T_AD_SYSTEM_CONFIG, T_AD_SYSTEM_CONFIG_Dto>().ReverseMap();
        }
    }
}
