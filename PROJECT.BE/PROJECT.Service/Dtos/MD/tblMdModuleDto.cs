using AutoMapper;
using PROJECT.BUSINESS.Common.Mapping;
using PROJECT.CORE.Entities.MD;

namespace PROJECT.BUSINESS.Dtos.MD
{
    public class tblMdModuleDto : IMapFrom
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string PId { get; set; }
        public string Notes { get; set; }
        public string LicenseKey { get; set; }
        public int? NumberOrder { get; set; }
        public List<tblMdModuleDto> Children { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdModule, tblMdModuleDto>().ReverseMap();
        }
    }
}
