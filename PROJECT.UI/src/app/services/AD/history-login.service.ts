import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OnChangDate } from 'src/app/models/Common/chang-date.model';
import { CommonService } from '../Common/common.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryLoginService {
  constructor(private http: HttpClient, private _commonService : CommonService) { }

  searchHistoryLogin(date : OnChangDate){
    return this._commonService.getRequest(`/api/HistoryLogin/Search?startDate=${date.startDate}&finishDate=${date.finishDate}`)
  }

  getUserOnline(){
    return this._commonService.getRequest(`/api/HistoryLogin/UserOnline`);
  }
}