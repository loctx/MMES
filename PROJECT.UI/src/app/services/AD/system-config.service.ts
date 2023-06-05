import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { T_AD_SYSTEM_CONFIG } from 'src/app/models/AD/T_AD_SYSTEM_CONFIG.model';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigService {
  constructor(private _commonService : CommonService) { }
  
  getSystemConfig(){
    var url = `/api/SystemConfig/GetList`
    return this._commonService.getRequest(url)
  }

  updateSystemConfig(request : T_AD_SYSTEM_CONFIG){
    return this._commonService.putRequest(`/api/SystemConfig/Update`, request)
  }
}