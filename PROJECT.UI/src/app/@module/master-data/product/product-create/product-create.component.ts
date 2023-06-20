import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/MD/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  unitForm: FormGroup;
  submitted: boolean = false;

items: string[] = ['2', '3' , '4'];
selectedItem: string = '';
  constructor(
    private _service: ProductService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.unitForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      unitCode: ['', [Validators.required]],
      // typeCode: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  get f() {
    return this.unitForm.controls;
  }

  close() {
    this.drawerService.close();
    this.unitForm?.get('code')?.setValue('');
    this.unitForm?.get('name')?.setValue('');
    this.unitForm?.get('unitCode')?.setValue('');
    // this.unitForm?.get('typeCode')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    if (this.unitForm.invalid) {
      return;
    }
    this._service
      .Insert(
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
          this.unitForm?.get('code')?.setValue('');
          this.unitForm?.get('name')?.setValue('');
          this.unitForm?.get('unitCode')?.setValue('');
          this.unitForm?.get('typeCode')?.setValue('');
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
