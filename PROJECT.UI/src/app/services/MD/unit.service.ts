import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { UnitFilter } from 'src/app/@filter/MD/unit-filter.model';
import { UnitModel } from 'src/app/models/MD/unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  constructor(private _commonService : CommonService) { }
  
  searchUnit(pagination? : UnitFilter, isLoading?: boolean){
    return this._commonService.getRequest(`Unit/Search`, pagination, isLoading)
  }

  InsertUnit(parameters? : UnitModel, isLoading?: boolean){
    return this._commonService.postRequest(`Unit/Insert`, parameters, isLoading)
  }

  UpdateUnit(parameters? : UnitModel, isLoading?: boolean){
    return this._commonService.putRequest(`Unit/Update`, parameters, isLoading)
  }
}