import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/MD/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  unitForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  unitCode: string = '';
  typeCode: string ='';

  constructor(
    private _service: ProductService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.unitForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      unitCode: ['', [Validators.required, this.utils.trimSpace]],
      typeCode: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  get f() {
    return this.unitForm.controls;
  }

  ngOnInit() {
    this.unitForm?.get('code')?.setValue(this.code);
    this.unitForm?.get('name')?.setValue(this.name);
    this.unitForm?.get('unitCode')?.setValue(this.unitCode);
    this.unitForm?.get('typeCode')?.setValue(this.typeCode);
  }

  close() {
    this.drawerService.close();
    this.unitForm?.get('code')?.setValue('');
    this.unitForm?.get('name')?.setValue('');
    this.unitForm?.get('unitCode')?.setValue('');
    this.unitForm?.get('typeCode')?.setValue('');
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
          unitCode: this.unitForm.value.unitCode.trim(),
          typeCode: this.unitForm.value.typeCode.trim(),

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
