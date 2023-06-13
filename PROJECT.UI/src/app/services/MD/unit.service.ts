import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { UnitFilter, BaseFormUnit } from 'src/app/@filter/MD/unit-filter.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  constructor(private _commonService : CommonService) { }
  
  searchUnit(pagination? : UnitFilter, isLoading?: boolean){
    return this._commonService.getRequest(`Unit/Search`, pagination, isLoading)
  }

  InsertUnit(parameters? : BaseFormUnit, isLoading?: boolean){
    return this._commonService.postRequest(`Unit/Insert`, parameters, isLoading)
  }

  UpdateUnit(parameters? : BaseFormUnit, isLoading?: boolean){
    return this._commonService.putRequest(`Unit/Update`, parameters, isLoading)
  }
}