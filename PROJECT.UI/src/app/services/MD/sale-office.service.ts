import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { SaleOfficeFilter } from 'src/app/@filter/MD/sale-office-filter.model';
import { T_MD_SALEOFFICE } from 'src/app/models/MD/T_MD_SALEOFFICE.model';

@Injectable({
  providedIn: 'root'
})
export class SaleOfficeService {
  constructor(private _commonService : CommonService) { }

  searchSaleOffice(pagination? : SaleOfficeFilter, isLoading?: boolean){
    return this._commonService.getRequest(`/api/SaleOffice/GetList`, pagination, isLoading)
  }

  updateSaleOffice(request : T_MD_SALEOFFICE){
    return this._commonService.putRequest(`/api/SaleOffice/Update`, request)
  }
}