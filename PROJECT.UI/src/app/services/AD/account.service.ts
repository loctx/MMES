import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Account/Search`, pagination);
  }

  Insert(parameters?: AccountModel, isLoading?: boolean) {
    return this._commonService.postRequest(`Account/Insert`, parameters);
  }

  Update(parameters?: AccountModel, isLoading?: boolean) {
    return this._commonService.putRequest(`Account/Update`, parameters);
  }

  Delete(parameters?: AccountModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`Account/Delete`, parameters);
  }
}
