import { Component } from '@angular/core';
import { OrderTypeService } from 'src/app/services/MD/ordertype.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { optionsGroup } from 'src/app/@filter/MD/area-filter.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';

@Component({
  selector: 'app-ordertype-create',
  templateUrl: './ordertype-create.component.html',
  styleUrls: ['./ordertype-create.component.scss']
})
export class OrdertypeCreateComponent {
  orderTypeForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: OrderTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.orderTypeForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      state: [true, [Validators.required]],
    });
  }

  get f() {
    return this.orderTypeForm.controls;
  }

  close() {
    this.drawerService.close();
    this.orderTypeForm?.get('code')?.setValue('');
    this.orderTypeForm?.get('name')?.setValue('');
    this.orderTypeForm?.get('state')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    if (this.orderTypeForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.orderTypeForm.value.code.trim(),
          name: this.orderTypeForm.value.name.trim(),
          state: this.orderTypeForm.value.state,
        },
        false
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.orderTypeForm?.get('code')?.setValue('');
          this.orderTypeForm?.get('name')?.setValue('');
          this.orderTypeForm?.get('state')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }

}
