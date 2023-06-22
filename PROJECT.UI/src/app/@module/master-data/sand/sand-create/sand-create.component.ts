import { Component } from '@angular/core';
import { SandService } from 'src/app/services/MD/sand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { optionsGroup } from 'src/app/@filter/MD/area-filter.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';

@Component({
  selector: 'app-sand-create',
  templateUrl: './sand-create.component.html',
  styleUrls: ['./sand-create.component.scss']
})
export class SandCreateComponent {
  sandForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: SandService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.sandForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      state: [true, [Validators.required]],
    });
  }

  get f() {
    return this.sandForm.controls;
  }

  close() {
    this.drawerService.close();
    this.sandForm?.get('code')?.setValue('');
    this.sandForm?.get('name')?.setValue('');
    this.sandForm?.get('state')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    if (this.sandForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.sandForm.value.code.trim(),
          name: this.sandForm.value.name.trim(),
          state: this.sandForm.value.state,
        },
        false
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.sandForm?.get('code')?.setValue('');
          this.sandForm?.get('name')?.setValue('');
          this.sandForm?.get('state')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
