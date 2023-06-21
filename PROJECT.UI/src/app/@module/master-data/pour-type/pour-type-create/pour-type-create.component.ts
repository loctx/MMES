import { Component } from '@angular/core';
import { PourTypeService } from 'src/app/services/MD/pour-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';

@Component({
  selector: 'app-pour-type-create',
  templateUrl: './pour-type-create.component.html',
  styleUrls: ['./pour-type-create.component.scss']
})
export class PourTypeCreateComponent {
  pourTypeForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private _service: PourTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.pourTypeForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  get f() {
    return this.pourTypeForm.controls;
  }

  close() {
    this.drawerService.close();
    this.pourTypeForm?.get('code')?.setValue('');
    this.pourTypeForm?.get('name')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    if (this.pourTypeForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.pourTypeForm.value.code.trim(),
          name: this.pourTypeForm.value.name.trim(),
        },
        false
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.pourTypeForm?.get('code')?.setValue('');
          this.pourTypeForm?.get('name')?.setValue('');
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
