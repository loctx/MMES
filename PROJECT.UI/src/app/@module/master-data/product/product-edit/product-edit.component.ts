import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/MD/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { DropdownService } from 'src/app/services/Common/dropdown.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductFilter } from 'src/app/@filter/MD/product-filter.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent {
  productForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  unitCode: string = '';
  typeCode: string = '';
  unitCodes: any[] = [];
  itemTypes: any[] = [];
  selectedItem: string = '';
  filter = new ProductFilter();


  constructor(
    private _service: ProductService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private _service1: DropdownService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this._fb.group({
      code: [{ value: "", disabled: true }],
      name: ['', [Validators.required, this.utils.trimSpace]],
      unitCode: ['', [Validators.required, this.utils.trimSpace]],
      typeCode: ['', [Validators.required, this.utils.trimSpace]],
    });
    this.route.queryParams.subscribe(params => {
      this.filter = {
        ...this.filter,
        ...params
      }
    });

  }

  get f() {
    return this.productForm.controls;
  }

  ngOnInit() {
    this._service1.GetAllUnit().subscribe((result: any) => {
      this.unitCodes = result.data;
    });
    this._service1.GetAllItemType().subscribe((result: any) => {
      this.itemTypes = result.data;
    });

    this.productForm?.get('code')?.setValue(this.code);
    this.productForm?.get('name')?.setValue(this.name);
    this.productForm?.get('unitCode')?.setValue(this.unitCode);
    this.productForm?.get('typeCode')?.setValue(this.typeCode);
  }

  close() {
    this.router.navigate([], { relativeTo: this.route, queryParams: this.filter });
    this.drawerService.close();
    this.productForm?.get('code')?.setValue('');
    this.productForm?.get('name')?.setValue('');
    this.productForm?.get('unitCode')?.setValue('');
    this.productForm?.get('typeCode')?.setValue('');
  }

  onEdit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.productForm.value.name.trim(),
          unitCode: this.productForm.value.unitCode,
          typeCode: this.productForm.value.typeCode,
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
