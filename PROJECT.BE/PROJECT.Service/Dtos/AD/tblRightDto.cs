using AutoMapper;
using PROJECT.CORE.Entities.AD;
using PROJECT.BUSINESS.Common.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.BUSINESS.Dtos.AD
{
    public class tblRightDto : IMapFrom
    {
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }

        public string PId { get; set; }

        public int? OrderNumber { get; set; }
        public bool IsChecked { get; set; }
        public List<tblRightDto> Children { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdRight, tblRightDto>().ReverseMap();
        }
    }
}
