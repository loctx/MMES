import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { METHOD } from './constant/index';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class utils {
  trimSpace(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.toString().trim() == '') {
      return { cannotContainSpace: true };
    }
    return null;
  }
}

export class HandleResponse {
  showMessage(response: any, method: string) {
    if (response?.messageObject?.code !== '') {
      const res = response?.messageObject;
      switch (res.messageType) {
        case 'S':
          if(method != METHOD.GET) {
            Swal.fire({
              icon: 'success',
              title: response?.messageObject?.message,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              toast: true,
            });
          }
          break;
        case 'W':
          Swal.fire({
            icon: 'warning',
            title: res.message,
            text: res.messageDetail,
            footer: `LogID: ${res.logId}`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
          break;
        case 'E':
          Swal.fire({
            icon: 'error',
            title: res.message,
            text: res.messageDetail,
            footer: `LogID: ${res.logId}`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
          break;
        default:
          break;
      }
    }
  }
}
