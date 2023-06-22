using AutoMapper;
using PROJECT.BUSINESS.Common.Mapping;
using PROJECT.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.BUSINESS.Dtos.SO
{
    public class tblOrderDto : IMapFrom
    {
        [Key]
        public string Code { get; set; }

        public string State { get; set; }

        public string PartnerCode { get; set; }

        public string PartnerNote { get; set; }

        public string AreaCode { get; set; }

        public DateTime? PourDate { get; set; }

        public string PourLocation { get; set; }

        public string PourCategory { get; set; }

        public string PourType { get; set; }

        public string OrderType { get; set; }

        public virtual ICollection<tblSoOrderDetail> OrderDetails { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrder, tblOrderDto>().ReverseMap();
        }
    }
}
