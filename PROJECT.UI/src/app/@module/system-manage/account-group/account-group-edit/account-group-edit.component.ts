import { Component } from '@angular/core';
import { UnitService } from 'src/app/services/MD/unit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
@Component({
  selector: 'app-account-group-edit',
  templateUrl: './account-group-edit.component.html',
  styleUrls: ['./account-group-edit.component.scss'],
})
export class AccountGroupEditComponent {
  unitForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';

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

  ngOnInit() {
    this.unitForm?.get('code')?.setValue(this.code);
    this.unitForm?.get('name')?.setValue(this.name);
  }

  close() {
    this.drawerService.close();
    this.unitForm?.get('code')?.setValue('');
    this.unitForm?.get('name')?.setValue('');
  }

  onEdit() {
    this.submitted = true;
    if (this.unitForm.invalid) {
      return;
    }
    this._service
      .Update(
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
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
