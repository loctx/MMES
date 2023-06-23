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
    return this._commonService.getRequest(`Menu/GetMenuOfUser`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  UpdateOrderTree(dataTree: TreeNode[]) {
    return this._commonService.putRequest('Menu/Update', dataTree[0]);
  }
}
