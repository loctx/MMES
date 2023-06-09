using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PROJECT.BUSINESS.Common;
using PROJECT.BUSINESS.Dtos.AD;
using PROJECT.BUSINESS.Dtos.Common;
using PROJECT.BUSINESS.Filter.SO;
using PROJECT.CORE;
using PROJECT.CORE.Dtos.SO;
using PROJECT.CORE.Entities.AD;
using PROJECT.CORE.Entities.SO;

namespace PROJECT.BUSINESS.Services.AD
{
    public interface ISaleOrderService : IGenericService<tblStoreOrderOperating, tblStoreOrderOperatingDto>
    {
        Task<PagedResponseDto> Search(SaleOrderFilter filter);
    }

    public class SaleOrderService : GenericService<tblStoreOrderOperating, tblStoreOrderOperatingDto>, ISaleOrderService
    {
        public SaleOrderService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        /// <summary>
        /// Tìm kiếm đơn hàng
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        public virtual async Task<PagedResponseDto> Search(SaleOrderFilter filter)
        {
            try
            {
                var query = this._dbContext.tblStoreOrderOperating.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x => 
                        x.ItemCode.Contains(filter.KeyWord) ||
                        x.NameProduct.Contains(filter.KeyWord) ||
                        x.DeliveryCode.Contains(filter.KeyWord)
                    );
                }
                return await this.Paging(query, filter);
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
