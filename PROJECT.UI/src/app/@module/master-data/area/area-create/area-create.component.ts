import { Component } from '@angular/core';
import { AreaService } from 'src/app/services/MD/area.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';

@Component({
  selector: 'app-area-create',
  templateUrl: './area-create.component.html',
  styleUrls: ['./area-create.component.scss']
})
export class AreaCreateComponent {
  areaForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private _service: AreaService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.areaForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  get f() {
    return this.areaForm.controls;
  }

  close() {
    this.drawerService.close();
    this.areaForm?.get('code')?.setValue('');
    this.areaForm?.get('name')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    if (this.areaForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.areaForm.value.code.trim(),
          name: this.areaForm.value.name.trim(),
        },
        false
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.areaForm?.get('code')?.setValue('');
          this.areaForm?.get('name')?.setValue('');
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
