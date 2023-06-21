import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { ItemTypeModel } from 'src/app/models/MD/item-type.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class ItemTypeService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`ItemType/Search`, pagination);
  }

  Insert(parameters?: ItemTypeModel, isLoading?: boolean) {
    return this._commonService.postRequest(`ItemType/Insert`, parameters);
  }

  Update(parameters?: ItemTypeModel, isLoading?: boolean) {
    return this._commonService.putRequest(`ItemType/Update`, parameters);
  }
  Delete(parameters?: ItemTypeModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`ItemType/Delete`, parameters);
  }
}
