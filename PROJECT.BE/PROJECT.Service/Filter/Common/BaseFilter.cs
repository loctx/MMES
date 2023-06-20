using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.BUSINESS.Filter.Common
{
    public class BaseFilter
    {
        public int CurrentPage { get; set; } = 1;
        public int PageSize { get; set; } = 50;
        public string KeyWord { get; set; }
    }
}
