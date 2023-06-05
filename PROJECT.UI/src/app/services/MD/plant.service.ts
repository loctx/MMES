import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { PlantFilter } from 'src/app/@filter/MD/plant-filter.model';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  constructor(private _commonService : CommonService) { }
  
  searchPlant(pagination? : PlantFilter, isLoading?: boolean){
    return this._commonService.getRequest(`/api/Plant/GetList`, pagination, isLoading)
  }
}