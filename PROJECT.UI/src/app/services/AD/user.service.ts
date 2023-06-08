import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_AD_USER } from 'src/app/models/AD/T_AD_USER.model';
import { NodeRight } from 'src/app/models/AD/T_AD_RIGHT.model';
import { T_AD_USER_RIGHT } from 'src/app/models/AD/T_AD_USER_RIGHT.model';
import { T_AD_USER_USER_GROUP } from 'src/app/models/AD/T_AD_USER_USER_GROUP.model';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../Common/common.service';
import { Pagination, lstAccount } from 'src/app/models/Common/pagination.model';
import { map } from 'rxjs/operators';
import {Item} from '../../models/multidropdown'
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private _common: CommonService
  ) {}

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
    Language: this.cookie.get('lang'),
  });
  requestOptions = { headers: this.headers };
  apiUrl: string = environment.baseApiUrl;

  getListUser(PageInfo?: any) {
    var url = `account?page=${PageInfo.page}&pageSize=${PageInfo.pageSize}`;
    return this._common.getRequest(url);
  }
  Paging(page: number, searchText: string, numberDis: number) {
    return this._common
      .getRequest(
        `account?page=${page}&Keyword=${searchText}&pageSize=${numberDis}`
      )
      .pipe(
        map((data: lstAccount | any) => {
          return data;
        })
      );
  }

  PagingGroup(page: number, searchText: string, numberDis: number) {
    return this._common.getRequest(`accountGroup?page=${page}&Keyword=${searchText}&pageSize=${numberDis}`)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  GetFull() {
    // for dropdowns only
    return this._common.getRequest(`accountGroup/GetFull`).pipe(
      map((data: any) => {
        return data.map(
          (i: any) =>
            ({
              id: i.id,
              name: i.id.toString(),
              title: i.name,
            } as Item)
        ) as Item[];
      })
    );
  }

  GetDetail(id: number) {
    return this._common.getRequest(`account/${id}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  Update(data: any) {
    return this._common.putRequest('account', data).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  searchUser(key: string): Observable<T_AD_USER[]> {
    return this.http.get<T_AD_USER[]>(
      this.apiUrl + `/api/User/Search/${key}`,
      this.requestOptions
    );
  }

  createUser(addItemRequest: T_AD_USER | any): Observable<T_AD_USER> {
    return this.http.post<T_AD_USER>(
      this.apiUrl + 'account/register',
      addItemRequest,
      this.requestOptions
    );
  }

  getDetailUser(username: string): Observable<T_AD_USER> {
    return this.http.get<T_AD_USER>(
      this.apiUrl + '/api/User/GetDetail/' + username,
      this.requestOptions
    );
  }

  updateUser(
    username: string,
    updateItemRequest: T_AD_USER
  ): Observable<T_AD_USER> {
    return this.http.put<T_AD_USER>(
      this.apiUrl + '/api/User/Update/' + username,
      updateItemRequest,
      this.requestOptions
    );
  }

  restoreDefaultRight(username: string): Observable<T_AD_USER_RIGHT[]> {
    return this.http.delete<T_AD_USER_RIGHT[]>(
      this.apiUrl + '/api/User/RestoreDefaultRight/' + username,
      this.requestOptions
    );
  }

  resetPassword(username: string): Observable<T_AD_USER> {
    return this.http.put<T_AD_USER>(
      this.apiUrl + '/api/User/ResetPassword/' + username,
      this.requestOptions
    );
  }

  activeAccount(username: string): Observable<T_AD_USER> {
    return this.http.put<T_AD_USER>(
      this.apiUrl + '/api/User/ActiveAccount/' + username,
      this.requestOptions
    );
  }

  lockAccount(username: string): Observable<T_AD_USER> {
    return this.http.put<T_AD_USER>(
      this.apiUrl + '/api/User/LockAccount/' + username,
      this.requestOptions
    );
  }

  getTreeRightUser(username: string): Observable<NodeRight[]> {
    return this.http.get<NodeRight[]>(
      this.apiUrl + '/api/User/GetRightUser/' + username,
      this.requestOptions
    );
  }

  addUserGroupToUser(
    username: string,
    userGroupCode: string
  ): Observable<T_AD_USER_USER_GROUP> {
    return this.http.post<T_AD_USER_USER_GROUP>(
      this.apiUrl + `/api/User/AddUserGroupToUser/${username}/${userGroupCode}`,
      this.requestOptions
    );
  }

  deleteUserGroupToUser(
    username: string,
    userGroupCode: string
  ): Observable<T_AD_USER_USER_GROUP> {
    return this.http.delete<T_AD_USER_USER_GROUP>(
      this.apiUrl +
        `/api/User/DeleteUserGroupToUser/${username}/${userGroupCode}`,
      this.requestOptions
    );
  }
}