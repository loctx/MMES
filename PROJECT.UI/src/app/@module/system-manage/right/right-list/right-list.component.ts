import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeRight } from 'src/app/models/AD/T_AD_RIGHT.model';
import { Select } from 'src/app/models/Common/select.model';
import { RightService } from 'src/app/services/AD/right.service';
import { environment } from 'src/environments/environment';
declare function Message(response: any): any
declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-right-list',
  templateUrl: './right-list.component.html'
})
export class RightListComponent implements OnInit {
  constructor(private _service: RightService, private router: Router, private route: ActivatedRoute) { }

  nodes: NodeRight[] = [];
  selectSearch : Select[] =[];

  ngOnInit(): void {
    this._service.buildTreeRight()
      .subscribe({
        next: (response) => {
          this.nodes = response.Data;
          this.nodes.forEach(item => {
            this.selectSearch.push({
              id: item.id,
              name: item.name
            })
          });
          buildTree(response.Data);
        },
        error: (response) => { console.log(response); }
      });
  }

  search(event: any) {
    var zTree = ($.fn as any).zTree.getZTreeObj("treeRight");
    var node = zTree.getNodesByParamFuzzy("id", event, null);
    if (node != null) {
      zTree.selectNode(node[0]);
    }
  }
  
  updateOrderTree() {
    updateOrderTree();
  }
}

var dataTree: any;
var setting = {
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
    onClick: clickNode,
    beforeDrop: BeforeDrop
  }
};

function buildTree(data: any) {
  dataTree = data;
  ($.fn as any).zTree.init($("#treeRight"), setting, data);
};

function BeforeDrop(treeId: any, treeNodes: any, targetNode: any, moveType: any, isCopy: any) {
  if (!targetNode) {
    return false;
  } else if (targetNode.id == dataTree[0].id) {
    return false;
  }
  return true
}

function clickNode(event: string, treeId: string, treeNode: NodeRight) {
  window.location.href = `SystemManage/Right/Edit/${treeNode.id}`;
}

function updateOrderTree() {
  ShowLoading();
  var zTree = ($.fn as any).zTree.getZTreeObj("treeRight");
  var nodes = zTree.transformToArray(zTree.getNodes());
  var data = nodes.map(function (a: any) { return { id: a.id, pId: a.pId }; });
  $.ajax({
    type: 'PUT',
    dataType: "json",
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      Language: localStorage.getItem('lang')
    },
    url: `${environment.baseApiUrl}/api/Right/UpdateOrder/${JSON.stringify(data)}`,
    success: function (response : any) {
      Message(response);
      HideLoading();
    },
    error: function (response : any) {
      Message(response);
      HideLoading();
    }
  });

}
