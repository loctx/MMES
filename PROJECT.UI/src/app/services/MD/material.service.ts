import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { MaterialFilter } from 'src/app/@filter/MD/material-filter.model';
import { T_MD_MATERIAL } from 'src/app/models/MD/T_MD_MATERIAL.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  constructor(private _commonService : CommonService) { }
  
  searchMaterial(pagination? : MaterialFilter, isLoading?: boolean){
    return this._commonService.getRequest(`/api/Material/GetList`, pagination, isLoading)
  }

  updateMaterial(request : T_MD_MATERIAL){
    return this._commonService.putRequest(`/api/Material/Update`, request)
  }
}