import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { TranferObject } from 'src/app/models/Common/tranfer-object.model';
import { share } from 'rxjs';
declare function ShowLoading(): any
declare function HideLoading(): any
declare function Message(response: TranferObject): any

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    apiUrl: string = environment.baseApiUrl;

    constructor(private http: HttpClient) { }

    getRequest(url: string, params?: any, isLoading?: boolean): Observable<TranferObject> {
        if (isLoading) ShowLoading();
        
        var tranferObject = this.http.get<TranferObject>(this.apiUrl + url, { params: params }).pipe(share())
        tranferObject.subscribe({
            next: (response) => {
                HideLoading();
                if (response.Message?.MessageType == "E") {
                    Message(response);
                }
            }
        })
        return tranferObject;
    }

    postRequest(url: string, request: any, isLoading?: boolean): Observable<TranferObject> {
        if (isLoading) ShowLoading();

        var tranferObject = this.http.post<TranferObject>(this.apiUrl + url, request).pipe(share())
        tranferObject.subscribe({
            next: (response) => { Message(response) }
        })
        HideLoading();
        return tranferObject;
    }

    putRequest(url: string, request: any, isLoading?: boolean, isMessage?: boolean): Observable<TranferObject> {
        if (isLoading) ShowLoading();
        var tranferObject = this.http.put<TranferObject>(this.apiUrl + url, request).pipe(share())
        tranferObject.subscribe({
            next: (response) => { if (isMessage) Message(response) }
        })
        HideLoading();
        return tranferObject;
    }

    deleteRequest(url: string, isLoading?: boolean): Observable<TranferObject> {
        if (isLoading) ShowLoading();
        var tranferObject = this.http.delete<TranferObject>(this.apiUrl + url).pipe(share())
        tranferObject.subscribe({
            next: (response) => { Message(response) },
        })
        HideLoading();
        return tranferObject;
    }
}