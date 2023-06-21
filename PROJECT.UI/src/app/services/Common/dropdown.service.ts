import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private _commonService: CommonService) {}


}
