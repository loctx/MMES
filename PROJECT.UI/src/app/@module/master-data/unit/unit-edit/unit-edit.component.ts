import { Component } from '@angular/core';
import { UnitService } from 'src/app/services/MD/unit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unit-edit',
  templateUrl: './unit-edit.component.html',
  styleUrls: ['./unit-edit.component.scss'],
})
export class UnitEditComponent {
  unitForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';

  constructor(
    private _service: UnitService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router
  ) {
    this.unitForm = this._fb.group({
      code: [{ value: '', disabled: true }],
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
    this.router.navigate([], { fragment: undefined, replaceUrl: true });
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
          code: this.code.trim(),
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
