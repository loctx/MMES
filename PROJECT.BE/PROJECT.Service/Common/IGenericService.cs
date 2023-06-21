﻿using PROJECT.BUSINESS.Dtos.Common;
using PROJECT.BUSINESS.Filter.Common;

namespace PROJECT.BUSINESS.Common
{
    public interface IGenericService<TEntity, TDto> : IBaseService
    {
        Task<PagedResponseDto> Search(BaseFilter filter);
        Task<IList<TDto>> GetAll();
        Task<TDto> GetById(object id);
        Task<TDto> Add(TDto dto);

        /// <summary>
        /// Chú ý khi sử dụng phương thức Update Generic. Nó sẽ update toàn bộ thuộc tính của TEntity. <br/>
        /// Để chỉ update các thuộc tính trong DTO cần overide lại hàm này. <br/>
        /// Ví dụ:<br/>
        /// var saleOrderInDB = await this._dbContext.tblStoreOrderOperating.FindAsync(saleOrder.Id); --> lấy entity để tracker <br/>
        /// this._mapper.Map(saleOrder, saleOrderInDB); --> Dòng code này sẽ cập nhật dữ liệu từ DTO --> entity đang được tracker <br/>
        /// await this._dbContext.SaveChangesAsync(); <br/>
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task Update(TDto dto);
        Task Delete(TDto dto);
        Task<PagedResponseDto> Paging(IQueryable<TEntity> query, BaseFilter filter);
    }
}
