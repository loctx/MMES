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
          if (method != METHOD.GET) {
            Swal.fire({
              // icon: 'success',
              color: '#198754',
              title: response?.messageObject?.message,
              position: 'top-end',
              width: 600,
              showConfirmButton: false,
              timer: 5000,
              toast: true,
            });
          }
          break;
        case 'W':
          Swal.fire({
            // icon: 'warning',
            color: '#ffc720',
            title: `MSG${res.code} ${res.message}`,
            text: res.messageDetail,
            width: 600,
            footer: `LogID ${res.logId}`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
          break;
        case 'E':
          Swal.fire({
            // icon: 'error',
            color: '#dc3545',
            title: `MSG${res.code} ${res.message}`,
            width: 600,
            text: res.messageDetail,
            footer: `LogID ${res.logId}`,
            position: 'top-end',
            showConfirmButton: false,
            allowOutsideClick: true,
          });
          break;
        default:
          break;
      }
    }
  }
}
