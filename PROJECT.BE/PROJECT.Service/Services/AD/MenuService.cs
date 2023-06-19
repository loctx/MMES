using AutoMapper;
using PROJECT.BUSINESS.Common;
using PROJECT.BUSINESS.Dtos.AD;
using PROJECT.CORE;
using PROJECT.CORE.Entities.AD;

namespace PROJECT.BUSINESS.Services.AD
{
    public interface IMenuService : IGenericService<tblAdMenu, tblMenuDto>
    {
        Task<tblMenuDto> BuildDataForTree();
    }

    public class MenuService : GenericService<tblAdMenu, tblMenuDto>, IMenuService
    {
        public MenuService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        /// <summary>
        /// Dựng cấu trúc nested tree
        /// </summary>
        /// <returns></returns>
        public async Task<tblMenuDto> BuildDataForTree()
        {
            var lstNode = new List<tblMenuDto>();
            var rootNode = new tblMenuDto() { Id = "MNU", PId = "-MNU", Name = "Danh sách menu" };
            lstNode.Add(rootNode);

            var lstAllMenu = (await this.GetAll()).OrderBy(x => x.OrderNumber).ToList();
            foreach (var menu in lstAllMenu)
            {
                var node = new tblMenuDto() { Id = menu.Id, Name = menu.Name, PId = menu.PId, OrderNumber = menu.OrderNumber, Icon = menu.Icon, Url = menu.Url, RightId = menu.RightId };
                lstNode.Add(node);
            }
            var nodeDict = lstNode.ToDictionary(n => n.Id);
            foreach (var item in lstNode)
            {
                tblMenuDto parentNode = null;
                if (item.PId == "-MNU" || !nodeDict.TryGetValue(item.PId, out parentNode))
                {
                    continue;
                }

                if (parentNode.Children == null)
                {
                    parentNode.Children = new List<tblMenuDto>();
                }
                parentNode.Children.Add(item);
            }
            return rootNode;
        }
    }
}
