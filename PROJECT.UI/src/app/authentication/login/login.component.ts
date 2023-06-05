import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { Login } from 'src/app/models/Authentication/login.model';
import { TranferObject } from 'src/app/models/Common/tranfer-object.model';
import { environment } from 'src/environments/environment';

declare function Message(response: TranferObject): any
declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(public translate: TranslateService, private router: Router, private http: HttpClient, private jwtHelper: JwtHelperService, private _location: Location) { }

  invalidLogin?: boolean;

  apiUrl: string = environment.baseApiUrl;

  loginRequest: Login = {
    username: '',
    password: ''
  }

  public login = () => {
    ShowLoading();
    this.http.post<TranferObject>(this.apiUrl + '/api/Authentication/Login', this.loginRequest, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe({
      next: (response) => {
        if (response.Message.MessageType == "E") {
          HideLoading();
          Message(response)
        } else {
          localStorage.setItem("jwt", response.Data.Token);
          localStorage.setItem("user", JSON.stringify(response.Data.User, null, 2));
          localStorage.setItem("lstRight", JSON.stringify(response.Data.ListRight, null, 2));

          this.invalidLogin = false;
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
          HideLoading();
        }

      },
    });
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
}
