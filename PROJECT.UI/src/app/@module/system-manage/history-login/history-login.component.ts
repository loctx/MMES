import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { T_AD_HISTORY_LOGIN } from 'src/app/models/AD/T_AD_HISTORY_LOGIN.model';
import { OnChangDate } from 'src/app/models/Common/chang-date.model';
import { HistoryLoginService } from 'src/app/services/AD/history-login.service';

@Component({
  selector: 'app-history-login',
  templateUrl: './history-login.component.html'
})
export class HistoryLoginComponent implements OnInit{
  
  constructor(private _service: HistoryLoginService){}
  lstHistoryLogin: T_AD_HISTORY_LOGIN[] = [];
  pipe = new DatePipe('en-US');
  date : OnChangDate = {
    startDate : this.pipe.transform(new Date(), 'yyyy-MM-dd') ?? '',
    finishDate : this.pipe.transform(new Date(), 'yyyy-MM-dd') ?? '',
  }
  ngOnInit(): void {
    this._service.searchHistoryLogin(this.date)
    .subscribe({
      next:(response) =>{ this.lstHistoryLogin = response.Data },
      error:(response) => { console.log(response) }
    })
  }

  onChangeStartDate(event :any){
    this.date.startDate = event.target.value;
    this._service.searchHistoryLogin(this.date)
    .subscribe({
      next:(response) =>{ this.lstHistoryLogin = response.Data },
      error:(response) => { console.log(response) }
    })
  }
  onChangeFinishDate(event :any){
    this.date.finishDate = event.target.value;
    this._service.searchHistoryLogin(this.date)
    .subscribe({
      next:(response) =>{ this.lstHistoryLogin = response.Data },
      error:(response) => { console.log(response) }
    })
  }
}
