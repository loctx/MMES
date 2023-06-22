import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/MD/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { Dropdown } from 'bootstrap';
import { DropdownService } from 'src/app/services/Common/dropdown.service';
import { PaginationResult } from 'src/app/models/Common/pagination.model';
import { optionsGroup } from 'src/app/@filter/MD/product-filter.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent {
  productForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  unitCodes: any[] = [];
  itemTypes: any[] = [];
  selectedItem: string = '';
  constructor(
    private _service: ProductService,
    private _service1: DropdownService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.productForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      state: [true, [Validators.required]],
      unitCode: ['', [Validators.required]],
      typeCode: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  get f() {
    return this.productForm.controls;
  }

  ngOnInit(): void {
    this._service1.GetAllUnit().subscribe((result: any) => {
      this.unitCodes = result.data;
    });
    this._service1.GetAllItemType().subscribe((result: any) => {
      this.itemTypes = result.data;
    });
  }
  close() {
    this.drawerService.close();
    this.productForm?.get('code')?.setValue('');
    this.productForm?.get('name')?.setValue('');
    this.productForm?.get('state')?.setValue(true);
    this.productForm?.get('unitCode')?.setValue('');
    this.productForm?.get('typeCode')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    console.log('form:', this.productForm);
    // return;
    if (this.productForm.invalid) {
      console.log('vao');

      return;
    }

    this._service
      .Insert(
        {
          code: this.productForm.value.code.trim(),
          name: this.productForm.value.name.trim(),
          state: this.productForm.value.state,
          unitCode: this.productForm.value.unitCode,
          typeCode: this.productForm.value.typeCode,
        },
        false
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.productForm?.get('code')?.setValue('');
          this.productForm?.get('name')?.setValue('');
          this.productForm?.get('state')?.setValue(true);
          this.productForm?.get('unitCode')?.setValue('');
          this.productForm?.get('typeCode')?.setValue('');
        },
        (error) => {
          console.log('error: ', error);
          console.log('test');
        }
      );
  }
}
