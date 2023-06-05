import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { DischardFilter } from 'src/app/@filter/MD/dischard-filter.model';
import { T_MD_DISCHARD } from 'src/app/models/MD/T_MD_DISCHARD.model';

@Injectable({
  providedIn: 'root'
})
export class DischardService {
  constructor(private _commonService : CommonService) { }
  
  searchDischard(pagination? : DischardFilter, isLoading?:boolean){
    return this._commonService.getRequest(`/api/Dischard/GetList`,pagination, isLoading)
  }

  updateDischard(request : T_MD_DISCHARD){
    return this._commonService.putRequest(`/api/Dischard/Update`, request)
  }
}