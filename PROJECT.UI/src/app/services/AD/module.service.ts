import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import { AdAccount, AdAccountCreate } from 'src/app/models/AD/account.model';
import { AccountFilter } from 'src/app/@filter/Common/account-filter.model';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  constructor(private _commonService: CommonService) {}

  getMenuOfUser(userName: string) {
    return this._commonService.getRequest(
      `Menu/getMenuOfUser?userName=${userName}`
    );
  }
}
