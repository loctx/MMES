import { Component } from '@angular/core';
import { StoneService } from 'src/app/services/MD/stone.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { optionsGroup } from 'src/app/@filter/MD/area-filter.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';

@Component({
  selector: 'app-stone-create',
  templateUrl: './stone-create.component.html',
  styleUrls: ['./stone-create.component.scss']
})
export class StoneCreateComponent {
  stoneForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: StoneService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.stoneForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      state: [true, [Validators.required]],

    });
  }

  get f() {
    return this.stoneForm.controls;
  }

  close() {
    this.drawerService.close();
    this.stoneForm?.get('code')?.setValue('');
    this.stoneForm?.get('name')?.setValue('');
    this.stoneForm?.get('state')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    if (this.stoneForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.stoneForm.value.code.trim(),
          name: this.stoneForm.value.name.trim(),
          state: this.stoneForm.value.state,
        },
        false
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.stoneForm?.get('code')?.setValue('');
          this.stoneForm?.get('name')?.setValue('');
          this.stoneForm?.get('state')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
