import { Component, OnInit } from '@angular/core';
import { UserFilter } from 'src/app/@filter/AD/user-filter.model';
import { T_AD_USER_RESPONSE } from 'src/app/models/AD/T_AD_USER.model';
import { UserService } from 'src/app/services/AD/user.service';
declare function Message(response :any) :any

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  constructor(private _service: UserService) { }

  listUser: T_AD_USER_RESPONSE = {
    CurrentPage: 1,
    PageSize: 10,
    TotalPage: 1,
    TotalRecord: 1,
    KeyWord: '',
    Data:[],
  }
  filter: UserFilter = {
    CurrentPage: 1,
    PageSize: 15,
    IsLoading: true,
    KeyWord: 'Empty',
  }

  ngOnInit(): void {
    this._service.getListUser(this.filter)
      .subscribe({
        next: (response) => {
          this.listUser = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response) }
      });
  }

  searchUser(event: any) {
    this.filter.CurrentPage = 1;
    if (event.target.value) {
      this.filter.KeyWord = event.target.value;
    } else {
      this.filter.KeyWord = "Empty"
    }
    this._service.getListUser(this.filter)
      .subscribe({
        next: (response) => {
          this.listUser = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }
  onChangePage(event: any) {
    this.filter.CurrentPage = event;
    this._service.getListUser(this.filter)
      .subscribe({
        next: (response) => {
          console.log('response: ', response);
          //this.listUser = response;
        },
        error: (response) => { console.log(response); }
      });
  }
}