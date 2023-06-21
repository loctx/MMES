using AutoMapper;
using PROJECT.BUSINESS.Common;
using PROJECT.BUSINESS.Dtos.MD;
using PROJECT.CORE;
using PROJECT.CORE.Entities.MD;

namespace PROJECT.BUSINESS.Services.MD
{
    public interface IModuleService : IGenericService<tblMdModule, tblMdModuleDto>
    {
        Task<tblMdModuleDto> BuildDataForTree();
        Task UpdateOrderTree(tblMdModuleDto moduleDto);
    }
    public class ModuleService : GenericService<tblMdModule, tblMdModuleDto>, IModuleService
    {
        public ModuleService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<tblMdModuleDto> BuildDataForTree()
        {
            var lstNode = new List<tblMdModuleDto>();
            var rootNode = new tblMdModuleDto() { Id = "M", PId = "-M", Name = "Danh sách module trong hệ thống" };
            lstNode.Add(rootNode);

            var lstAllModule = (await this.GetAll()).OrderBy(x => x.NumberOrder).ToList();
            foreach (var module in lstAllModule)
            {
                var node = new tblMdModuleDto() { Id = module.Id, Name = module.Name, PId = module.PId, NumberOrder = module.NumberOrder, Notes = module.Notes, LicenseKey = module.LicenseKey };
                lstNode.Add(node);
            }
            var nodeDict = lstNode.ToDictionary(n => n.Id);
            foreach (var item in lstNode)
            {
                tblMdModuleDto parentNode = null;
                if (item.PId == "-M" || !nodeDict.TryGetValue(item.PId, out parentNode))
                {
                    continue;
                }

                if (parentNode.Children == null)
                {
                    parentNode.Children = new List<tblMdModuleDto>();
                }
                parentNode.Children.Add(item);
            }
            return rootNode;
        }

        public async Task UpdateOrderTree(tblMdModuleDto moduleDto)
        {
            try
            {
                var lstModuleDto = new List<tblMdModuleDto>();
                var lstModuleUpdate = new List<tblMdModule>();

                this.ConvertNestedToList(moduleDto, ref lstModuleDto);
                if (moduleDto.Children == null || moduleDto.Children.Count == 0)
                {
                    return;
                }
                var numberOrder = 1;
                foreach (var item in lstModuleDto)
                {
                    var module = _mapper.Map<tblMdModule>(item);
                    module.NumberOrder = numberOrder++;
                    lstModuleUpdate.Add(module);
                }
                this._dbContext.UpdateRange(lstModuleUpdate);
                await this._dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }

        private void ConvertNestedToList(tblMdModuleDto node, ref List<tblMdModuleDto> lstNodeFlat)
        {
            if (node.Id != "M")
            {
                lstNodeFlat.Add(node);
            }
            if (node.Children != null && node.Children.Count > 0)
            {
                foreach (var item in node.Children)
                {
                    ConvertNestedToList(item, ref lstNodeFlat);
                }
            }
        }
    }
}
