import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { Login } from 'src/app/models/Authentication/login.model';
import { TranferObject } from 'src/app/models/Common/tranfer-object.model';
import { environment } from 'src/environments/environment';
import { ToastrcustomService } from '../../Interceptor/toastrcustom';
import {GlobalService} from '../../services/Common/global.service';

declare function Message(response: TranferObject): any;
declare function ShowLoading(): any;
declare function HideLoading(): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    public translate: TranslateService,
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private _location: Location,
    private toastr: ToastrcustomService,                                                                                                                                   
    private globalService: GlobalService
  ) {}

  invalidLogin?: boolean;

  apiUrl: string = environment.baseApiUrl;

  loginRequest: Login = {
    userName: '',
    password: '',
  };

  public login = () => {
    document.getElementById("indeterminate-progress-bar-login")!.style.display = "block";
    this.http
      .post<TranferObject>(this.apiUrl + 'Auth/Login', this.loginRequest, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe({
        next: (response: any) => {
        document.getElementById("indeterminate-progress-bar-login")!.style.display = "none";
          if (response.status) {
            localStorage.setItem('jwt', response?.data?.accessToken);
              // localStorage.setItem("user", JSON.stringify(response.Data.User, null, 2));
              // localStorage.setItem("lstRight", JSON.stringify(response.Data.ListRight, null, 2));
              this.globalService.setUserInfo(response.data)
              this.invalidLogin = false;
              this.router.navigate(['master-data/unit'])
          } else {
            this.toastr.showError(response?.messageObject?.message);
          }
        },
      });
  };

  isUserAuthenticated() {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }
}
