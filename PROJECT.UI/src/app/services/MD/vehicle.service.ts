import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { VehicleFilter } from 'src/app/@filter/MD/vehicle-filter.model';
import { T_MD_VEHICLE } from 'src/app/models/MD/T_MD_VEHICLE.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private _commonService : CommonService) { }

  searchVehicle(pagination? : VehicleFilter, isLoading?: boolean){
    return this._commonService.getRequest(`/api/Vehicle/GetList`, pagination, isLoading)
  }

  updateVehicle(request : T_MD_VEHICLE){
    return this._commonService.putRequest(`/api/Vehicle/Update`, request)
  }
}