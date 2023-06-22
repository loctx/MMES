import { Component } from '@angular/core';
import { OrderTypeService } from 'src/app/services/MD/ordertype.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';

@Component({
  selector: 'app-ordertype-edit',
  templateUrl: './ordertype-edit.component.html',
  styleUrls: ['./ordertype-edit.component.scss']
})
export class OrdertypeEditComponent {

  orderTypeForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';

  constructor(
    private _service: OrderTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.orderTypeForm = this._fb.group({
      code: [{ value: "", disabled: true }],
      name: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  get f() {
    return this.orderTypeForm.controls;
  }

  ngOnInit() {
    this.orderTypeForm?.get('code')?.setValue(this.code);
    this.orderTypeForm?.get('name')?.setValue(this.name);
  }

  close() {
    this.drawerService.close();
    this.orderTypeForm?.get('code')?.setValue('');
    this.orderTypeForm?.get('name')?.setValue('');
  }

  onEdit() {
    this.submitted = true;
    if (this.orderTypeForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.orderTypeForm.value.name.trim(),
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
