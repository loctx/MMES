import { Component, OnInit } from '@angular/core';
import { SaleOfficeFilter } from 'src/app/@filter/MD/sale-office-filter.model';
import { NodeOrganize } from 'src/app/models/AD/T_AD_ORGANIZE.model';
import { Select } from 'src/app/models/Common/select.model';
import { T_MD_SALEOFFICE } from 'src/app/models/MD/T_MD_SALEOFFICE.model';
import { OrganizeService } from 'src/app/services/AD/organize.service';
import { SaleOfficeService } from 'src/app/services/MD/sale-office.service';

@Component({
  selector: 'app-sale-office',
  templateUrl: './sale-office.component.html'
})
export class SaleOfficeComponent implements OnInit {
  constructor(private _serviceOrg: OrganizeService, private _service : SaleOfficeService) { }
  nodes: NodeOrganize[] = [];
  selectSearch: Select[] = [];

  listSaleOffice: T_MD_SALEOFFICE[] = [];
  filter: SaleOfficeFilter = {
    CurrentPage: 1,
    TotalPage: 0,
    ItemCount: 0,
    PageSize: 15,
    IsLoading: true,
    KeySearch: "",
    Organize: "",
    Data: []
  }

  ngOnInit(): void {
    this._serviceOrg.buildTreeOrganize()
      .subscribe({
        next: (response) => {
          this.nodes = response.Data;
          this.nodes.forEach(item => {
            this.selectSearch.push({
              id: item.id,
              name: item.name
            })
          });
          this.buildTree(response.Data);
        },
        error: (response) => { console.log(response); }
      });
      this._service.searchSaleOffice(this.filter, true)
      .subscribe({
        next: (response) => {
          this.listSaleOffice = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response) }
      });
  }

  searchSaleOfficeCommon(query : SaleOfficeFilter){
    this._service.searchSaleOffice(this.filter)
      .subscribe({
        next: (response) => {
          this.listSaleOffice = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }

  updateSaleOffice(item : T_MD_SALEOFFICE){
    this._service.updateSaleOffice(item);
  }

  getNameCompany(code :any){
    return this.nodes.find(x => x.id == code)?.name
  }

  search(event: any) {
    var zTree = ($.fn as any).zTree.getZTreeObj("treeOrganize-SaleOffice");
    var node = zTree.getNodesByParamFuzzy("id", event, null);
    if (node != null) {
      zTree.selectNode(node[0]);
      this.searchSaleOfficeCommon(this.filter)
    }
  }

  searchSaleOffice(event: any) {
    this.filter.CurrentPage = 1;
    this.filter.KeySearch = event.target.value;
    this.searchSaleOfficeCommon(this.filter)
  }
  onChangePage(event: any) {
    this.filter.CurrentPage = event;
    this.searchSaleOfficeCommon(this.filter)
  }

  updateOrderTree() {
    var zTree = ($.fn as any).zTree.getZTreeObj("treeOrganize-SaleOffice");
    var nodes = zTree.transformToArray(zTree.getNodes());
    var data = nodes.map(function (a: any) { return { id: a.id, pId: a.pId }; });
    this._serviceOrg.updateOrder(data)
  }

  clickNode(event: any) {
    var zTree = ($.fn as any).zTree.getZTreeObj("treeOrganize-SaleOffice");
    var node = zTree.getNodesByParamFuzzy("name", event.target.innerText, null);
    if(node != null){
      this.filter.Organize = node[0].id
      this.searchSaleOfficeCommon(this.filter)
    } 
  }
  buildTree(data: any) {
    ($.fn as any).zTree.init($("#treeOrganize-SaleOffice"), this.setting, data);
  };
  setting = {
    view: {
      selectedMulti: false,
      nameIsHTML: true,
      showTitle: false
    },
    edit: {
      enable: true,
      showRemoveBtn: false,
      showRenameBtn: false
    },
    data: {
      simpleData: {
        enable: true
      }
    },
  };
}

