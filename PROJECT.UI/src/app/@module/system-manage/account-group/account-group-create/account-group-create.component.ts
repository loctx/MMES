import { Component } from '@angular/core';
import { UnitService } from 'src/app/services/MD/unit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
@Component({
  selector: 'app-account-group-create',
  templateUrl: './account-group-create.component.html',
  styleUrls: ['./account-group-create.component.scss'],
})
export class AccountGroupCreateComponent {
  unitForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private _service: UnitService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.unitForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  get f() {
    return this.unitForm.controls;
  }

  close() {
    this.drawerService.close();
    this.unitForm?.get('code')?.setValue('');
    this.unitForm?.get('name')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    if (this.unitForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.unitForm.value.code.trim(),
          name: this.unitForm.value.name.trim(),
        },
        false
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.unitForm?.get('code')?.setValue('');
          this.unitForm?.get('name')?.setValue('');
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
