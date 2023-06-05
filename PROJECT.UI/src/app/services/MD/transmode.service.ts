import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { TransmodeFilter } from 'src/app/@filter/MD/transmode-filter.model';
import { T_MD_TRANSMODE } from 'src/app/models/MD/T_MD_TRANSMODE.model';

@Injectable({
  providedIn: 'root'
})
export class TransmodeService {
  constructor(private _commonService : CommonService) { }

  searchTransmode(pagination? : TransmodeFilter, isLoading?: boolean){
    return this._commonService.getRequest(`/api/Transmode/GetList`, pagination, isLoading)
  }

  updateTransmode(request : T_MD_TRANSMODE){
    return this._commonService.putRequest(`/api/Transmode/Update`, request)
  }
}