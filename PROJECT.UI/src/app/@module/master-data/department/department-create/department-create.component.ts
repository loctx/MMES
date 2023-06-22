import { Component } from '@angular/core';
import { DepartmentService } from 'src/app/services/MD/department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.scss']
})
export class DepartmentCreateComponent {
  dpmForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private _service: DepartmentService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.dpmForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  get f() {
    return this.dpmForm.controls;
  }

  close() {
    this.drawerService.close();
    this.dpmForm?.get('code')?.setValue('');
    this.dpmForm?.get('name')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    if (this.dpmForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.dpmForm.value.code.trim(),
          name: this.dpmForm.value.name.trim(),
        },
        false
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.dpmForm?.get('code')?.setValue('');
          this.dpmForm?.get('name')?.setValue('');
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
