using AutoMapper;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.EntityFrameworkCore;
using PROJECT.CORE;
using PROJECT.BUSINESS.Common.Class;

namespace PROJECT.BUSINESS.Common
{
    public class BaseService : IBaseService
    {
        public AppDbContext _dbContext { get; set; }
        public MessageObject MessageObject { get; set; }
        public Exception? Exception { get; set; }
        public bool Status { get; set; }
        public IMapper _mapper;

        public BaseService(AppDbContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext;
            this._mapper = mapper;
            this.Status = true;
            this.MessageObject = new MessageObject();
        }
    }
}
