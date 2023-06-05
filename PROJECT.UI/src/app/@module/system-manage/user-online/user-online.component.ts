import { Component, OnInit } from '@angular/core';
import { T_AD_USER } from 'src/app/models/AD/T_AD_USER.model';
import { HistoryLoginService } from 'src/app/services/AD/history-login.service';

@Component({
  selector: 'app-user-online',
  templateUrl: './user-online.component.html'
})
export class UserOnlineComponent implements OnInit {
  constructor(private _service: HistoryLoginService) { }
  lstUserOnline: T_AD_USER[] = [];
  ngOnInit(): void {
    this._service.getUserOnline()
      .subscribe({
        next: (response) => { this.lstUserOnline = response.Data; },
        error: (response) => { console.log(response); }
      })
  }
}
