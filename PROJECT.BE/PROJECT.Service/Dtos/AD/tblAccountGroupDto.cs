using AutoMapper;
using PROJECT.CORE.Entities.AD;
using PROJECT.BUSINESS.Common.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PROJECT.BUSINESS.Dtos.Common;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.BUSINESS.Dtos.AD
{
    public class tblAccountGroupDto : BaseDto, IMapFrom
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public bool State { get; set; } = true;
        public ICollection<tblAccountDto> ListAccount { get; set; }
        public ICollection<tblRightDto> ListRight{ get; set; }
        public tblRightDto TreeRight{ get; set; }

        public tblAccountGroupDto()
        {
            ListAccount = new HashSet<tblAccountDto>();
            ListRight = new HashSet<tblRightDto>();
        }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccountGroup, tblAccountGroupDto>().ReverseMap();
        }
    }
}
