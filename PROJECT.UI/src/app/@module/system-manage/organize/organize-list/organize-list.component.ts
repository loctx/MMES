import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeOrganize } from 'src/app/models/AD/T_AD_ORGANIZE.model';
import { Select } from 'src/app/models/Common/select.model';
import { OrganizeService } from 'src/app/services/AD/organize.service';

@Component({
  selector: 'app-organize-list',
  templateUrl: './organize-list.component.html',
})
export class OrganizeListComponent implements OnInit {
  constructor(public _service: OrganizeService) { }

  nodes: NodeOrganize[] = [];
  selectSearch: Select[] = [];

  ngOnInit(): void {
    this._service.buildTreeOrganize()
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
  }

  search(event: any) {
    var zTree = ($.fn as any).zTree.getZTreeObj("treeOrganize");
    var node = zTree.getNodesByParamFuzzy("id", event, null);
    if (node != null) {
      zTree.selectNode(node[0]);
    }
  }

  updateOrderTree() {
    var zTree = ($.fn as any).zTree.getZTreeObj("treeOrganize");
    var nodes = zTree.transformToArray(zTree.getNodes());
    var data = nodes.map(function (a: any) { return { id: a.id, pId: a.pId }; });
    this._service.updateOrder(data)
  }

  clickNode(event: string, treeId: string, treeNode: NodeOrganize) {
    window.location.href = `SystemManage/Organize/Edit/${treeNode.id}`;
  }
  buildTree(data: any) {
    dataTree = data;
    ($.fn as any).zTree.init($("#treeOrganize"), this.setting, data);
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
    callback: {
      onClick: this.clickNode,
      beforeDrop: BeforeDrop
    }
  };
}

var dataTree: any;

function BeforeDrop(treeId: any, treeNodes: any, targetNode: any, moveType: any, isCopy: any) {
  if (!targetNode) {
    return false;
  } else if (targetNode.id == dataTree[0].id) {
    return false;
  }
  return true
}
