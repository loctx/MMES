import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { UnitFilter } from 'src/app/@filter/MD/unit-filter.model';
import { T_MD_UNIT } from 'src/app/models/MD/T_MD_UNIT.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  constructor(private _commonService : CommonService) { }
  
  searchUnit(pagination? : UnitFilter, isLoading?: boolean){
    return this._commonService.getRequest(`/api/Unit/GetList`, pagination, isLoading)
  }

  updateUnit(request : T_MD_UNIT){
    return this._commonService.putRequest(`/api/Unit/Update`, request)
  }
}