using AutoMapper;
using PROJECT.BUSINESS.Common.Mapping;
using PROJECT.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.BUSINESS.Dtos.SO
{
    public class tblOrderDetailDto : IMapFrom
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderCode { get; set; }

        public string ItemCode { get; set; }

        public bool? IsMainItem { get; set; }

        public double OrderNumber { get; set; }

        public string SandCode { get; set; }

        public string StoneCode { get; set; }

        public virtual tblSoOrder Order { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderDetail, tblOrderDetailDto>().ReverseMap();
        }
    }
}
