using AutoMapper;
using PROJECT.CORE.Entities.AD;
using PROJECT.BUSINESS.Common.Mapping;

namespace PROJECT.BUSINESS.Dtos.AD
{
    public class tblAccountGroupRightDto : IMapFrom
    {
        public Guid Id { get; set; }
        public Guid GroupId { get; set; }
        public string RightId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccountGroupRight, tblAccountGroupRightDto>().ReverseMap();
        }
    }
}
