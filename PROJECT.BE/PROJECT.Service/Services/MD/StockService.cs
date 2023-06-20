using AutoMapper;
using PROJECT.BUSINESS.Common;
using PROJECT.BUSINESS.Dtos.Common;
using PROJECT.BUSINESS.Dtos.MD;
using PROJECT.BUSINESS.Filter.Common;
using PROJECT.BUSINESS.Filter.SO;
using PROJECT.BUSINESS.Services.AD;
using PROJECT.CORE;
using PROJECT.CORE.Dtos.SO;
using PROJECT.CORE.Entities.MD;
using PROJECT.CORE.Entities.SO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.BUSINESS.Services.MD
{
    public interface IStockService : IGenericService<tblMdStock, tblStockDto>
    {
    }
    public class StockService : GenericService<tblMdStock, tblStockDto>, IStockService
    {
        public StockService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<PagedResponseDto> Search(BaseFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdStock.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Code.Contains(filter.KeyWord) ||
                        x.Name.Contains(filter.KeyWord)
                    );
                }
                query = query.OrderBy(x => x.Code);
                return await this.Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public override async Task<tblStockDto> Add(tblStockDto dto)
        {
            try
            {
                var find = await this.GetById(dto.Code);
                if (find != null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "2001"; // Mã key đã tồn tại
                    return null;
                }
                return await base.Add(dto);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }
    }
}
