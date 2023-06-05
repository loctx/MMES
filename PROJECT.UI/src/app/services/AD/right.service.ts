import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';

@Injectable({
  providedIn: 'root'
})
export class RightService {
  constructor(private _commonService : CommonService) { }
 
  buildTreeRight() {
    return this._commonService.getRequest('/api/Right/BuildTree')
  }
  getDetailRight(pkid: string) {
    return this._commonService.getRequest(`/api/Right/GetDetail?pkid=${pkid}`)
  }
  updateRight(request : any){
    return this._commonService.putRequest('/api/Right/Update', request)
  }
  createRight(request : any){
    debugger;
    return this._commonService.postRequest('/api/Right/Create', request)
  }
}