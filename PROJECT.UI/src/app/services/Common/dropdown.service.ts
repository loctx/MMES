import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { ProductModel } from 'src/app/models/MD/product.model';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private _commonService: CommonService) {}


  GetAll(parameters?: ProductModel, isLoading?: boolean) {
    return this._commonService.getRequest(`ItemType/GetAll`, parameters);
  }
}
