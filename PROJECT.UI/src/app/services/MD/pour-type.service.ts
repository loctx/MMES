import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { PourTypeModel } from 'src/app/models/MD/pour-type.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class PourTypeService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`PourType/Search`, pagination);
  }

  Insert(parameters?: PourTypeModel, isLoading?: boolean) {
    return this._commonService.postRequest(`PourType/Insert`, parameters);
  }

  Update(parameters?: PourTypeModel, isLoading?: boolean) {
    return this._commonService.putRequest(`PourType/Update`, parameters);
  }
  Delete(parameters?: PourTypeModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`PourType/Delete`, parameters);
  }
}