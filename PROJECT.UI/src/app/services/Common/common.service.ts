import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { TranferObject } from 'src/app/models/Common/tranfer-object.model';
import { share } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
declare function ShowLoading(): any;
declare function HideLoading(): any;
declare function Message(response: TranferObject): any;

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  apiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private toastrService: ToastrService) {}

  getRequest(
    url: string,
    params?: any,
    isLoading?: boolean
  ): Observable<TranferObject> {
    var tranferObject = this.http
      .get<TranferObject>(this.apiUrl + url, { params: params })
      .pipe(share());
    tranferObject.subscribe({
      next: (response) => {
        if (response.MessageObject?.MessageType == 'E') {
          Message(response);
        }
      },
    });
    return tranferObject;
  }

  postRequest(
    url: string,
    request: any,
    isLoading?: boolean
  ): Observable<TranferObject> {
    var tranferObject = this.http
      .post<TranferObject>(this.apiUrl + url, request)
      .pipe(share());
    tranferObject.subscribe({
      next: (response) => {
        if (response?.Status) {
          this.toastrService.success('Thêm mới thành công !');
        }
        if (response.MessageObject?.MessageType == 'E') {
          this.toastrService.error(response.MessageObject?.Message);
        }
        Message(response)
      },
    });
    return tranferObject;
  }

  putRequest(
    url: string,
    request: any,
    isLoading?: boolean,
    isMessage?: boolean
  ): Observable<TranferObject> {
    var tranferObject = this.http
      .put<TranferObject>(this.apiUrl + url, request)
      .pipe(share());
    tranferObject.subscribe({
      next: (response) => {
        if (response?.Status) {
          this.toastrService.success('Chỉnh sửa thành công !');
        }
        if (response.MessageObject?.MessageType == 'E') {
          this.toastrService.error(response.MessageObject?.Message);
        }
        if (isMessage) Message(response);
      },
    });
    return tranferObject;
  }

  deleteRequest(url: string, isLoading?: boolean): Observable<TranferObject> {
    var tranferObject = this.http
      .delete<TranferObject>(this.apiUrl + url)
      .pipe(share());
    tranferObject.subscribe({
      next: (response) => {
        if (response?.Status) {
          this.toastrService.success('Xoá thành công !');
        }
        if (response.MessageObject?.MessageType == 'E') {
          this.toastrService.error(response.MessageObject?.Message);
        }
        Message(response);
      },
    });
    return tranferObject;
  }
}
