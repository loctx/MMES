import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";
@Injectable({
  providedIn: "root",
})
export class utils {
  trimSpace(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.toString().trim() == "") {
      return { cannotContainSpace: true };
    }
    return null;
  }
}
