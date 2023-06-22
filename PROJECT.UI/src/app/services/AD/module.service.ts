import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { map } from 'rxjs';
import { TreeNode } from 'src/app/models/MD/treeNode.model';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  constructor(private _commonService: CommonService) {}

  getDataForTree() {
    return this._commonService.getRequest(`Module/getDataTree`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  UpdateOrderTree(dataTree: TreeNode[]) {
    console.log(dataTree[0]);
    return this._commonService.putRequest(
      'Module/updateOrderTree',
      dataTree[0]
    );
  }
}
