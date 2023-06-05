import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { VendorFilter } from 'src/app/@filter/MD/vendor-filter.model';
import { T_MD_VENDOR } from 'src/app/models/MD/T_MD_VENDOR.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  constructor(private _commonService : CommonService) { }

  searchVendor(pagination? : VendorFilter, isLoading?: boolean){
    return this._commonService.getRequest(`/api/Vendor/GetList`, pagination, isLoading)
  }

  updateVendor(request : T_MD_VENDOR){
    return this._commonService.putRequest(`/api/Vendor/Update`, request)
  }
}