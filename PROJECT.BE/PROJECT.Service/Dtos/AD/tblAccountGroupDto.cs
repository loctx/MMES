using AutoMapper;
using PROJECT.CORE.Entities.AD;
using PROJECT.BUSINESS.Common.Mapping;
using System.ComponentModel.DataAnnotations;
using PROJECT.BUSINESS.Common.Enum;

namespace PROJECT.BUSINESS.Dtos.AD
{
    public class tblAccountGroupDto : IMapFrom
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public bool State { get; set; } = true;
        public string Code { get; set; }
        public Roles Role
        {
            get
            {
                if (Enum.TryParse(Code, out Roles r))
                {
                    return r;
                }
                return Roles.KHONG_XAC_DINH;
            }
        }
        public List<tblAccountDto> ListAccount { get; set; }
        public List<tblAccountGroupRightDto> ListAccountGroupRight { get; set; }
        public tblRightDto TreeRight { get; set; }

        public tblAccountGroupDto()
        {
            ListAccount = new List<tblAccountDto>();
            ListAccountGroupRight = new List<tblAccountGroupRightDto>();
        }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccountGroup, tblAccountGroupDto>().ReverseMap();
        }
    }
}
