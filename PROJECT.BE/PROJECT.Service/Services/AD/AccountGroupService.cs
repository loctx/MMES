using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PROJECT.BUSINESS.Common;
using PROJECT.BUSINESS.Dtos.AD;
using PROJECT.BUSINESS.Dtos.Common;
using PROJECT.BUSINESS.Filter.Common;
using PROJECT.CORE;
using PROJECT.CORE.Entities.AD;

namespace PROJECT.BUSINESS.Services.AD
{
    public interface IAccountGroupService : IGenericService<tblAdAccountGroup, tblAccountGroupDto>
    {
    }

    public class AccountGroupService : GenericService<tblAdAccountGroup, tblAccountGroupDto>, IAccountGroupService
    {
        public AccountGroupService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override async Task<PagedResponseDto> Search(BaseFilter filter)
        {
            try
            {
                var query = this._dbContext.tblAdAccountGroup.AsQueryable();
                //query = query.AsNoTracking();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Name.Contains(filter.KeyWord)
                    );
                }
                query = query.OrderBy(x => x.Name);
                return await this.Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public override async Task<tblAccountGroupDto> Add(tblAccountGroupDto dto)
        {
            try
            {
                var find = await this.GetById(dto.Id);
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

        public override async Task Update(tblAccountGroupDto dto)
        {
            try
            {
                var entityInDB = await this._dbContext.tblAdAccountGroup.Where(x => x.Id == dto.Id).Include(x => x.ListAccountGroupRight).FirstOrDefaultAsync();
                if (entityInDB == null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "2003";
                    return;
                }
                entityInDB.ListAccountGroupRight.Clear();
                this._mapper.Map(dto, entityInDB);
                await this._dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }

        public override async Task<tblAccountGroupDto> GetById(object id)
        {
            try
            {
                var entity = await this._dbContext.tblAdAccountGroup
                    .Where(x => x.Id == (Guid)id)
                    .Include(x => x.ListAccount)
                    .Include(x => x.ListAccountGroupRight)
                    .FirstOrDefaultAsync();

                var result = _mapper.Map<tblAccountGroupDto>(entity);

                // Lấy danh sách tất cả các quyền
                var lstNode = new List<tblRightDto>();
                var rootNode = new tblRightDto() { Id = "R", PId = "-R", Name = "Danh sách quyền trong hệ thống" };
                lstNode.Add(rootNode);

                var lstAllRight = await this._dbContext.tblAdRight.OrderBy(x => x.OrderNumber).ToListAsync();
                if (result.ListAccountGroupRight.Count > 0)
                {
                    rootNode.IsChecked = true;
                }
                foreach (var right in lstAllRight)
                {
                    var node = new tblRightDto() { Id = right.Id, Name = right.Name, PId = right.PId };
                    if (result.ListAccountGroupRight.Count(x => x.RightId == right.Id) > 0)
                    {
                        node.IsChecked = true;
                    }
                    lstNode.Add(node);
                }

                var nodeDict = lstNode.ToDictionary(n => n.Id);
                foreach (var item in lstNode)
                {
                    tblRightDto parentNode = null;
                    if (item.PId == "-R" || !nodeDict.TryGetValue(item.PId, out parentNode))
                    {
                        continue;
                    }

                    if (parentNode.Children == null)
                    {
                        parentNode.Children = new List<tblRightDto>();
                    }
                    parentNode.Children.Add(item);
                }

                result.TreeRight = rootNode;

                return result;
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
