import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { UnitFilter } from 'src/app/@filter/MD/unit-filter.model';
import { UnitModel } from 'src/app/models/MD/unit.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Unit/Search`, pagination);
  }

  Insert(parameters?: UnitModel, isLoading?: boolean) {
    return this._commonService.postRequest(`Unit/Insert`, parameters);
  }

  Update(parameters?: UnitModel, isLoading?: boolean) {
    return this._commonService.putRequest(`Unit/Update`, parameters);
  }
}
