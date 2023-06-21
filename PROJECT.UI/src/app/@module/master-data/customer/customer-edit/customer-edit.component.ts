import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/MD/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent {
  customerForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  address: string = '';
  phoneNumber:string = '';
  email:string = '';
  isProvider!: boolean ;

  constructor(
    private _service: CustomerService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.customerForm = this._fb.group({
      code: [{ value: "", disabled: true }],
      name: ["", [Validators.required, this.utils.trimSpace]],
      address: ["", [Validators.required, this.utils.trimSpace]],
      phoneNumber: ["", [Validators.required, this.utils.trimSpace]],
      email: ["", [Validators.required, Validators.email ,this.utils.trimSpace]],
      isProvider: [false, [Validators.required]],
    });
  }

  get f() {
    return this.customerForm.controls;
  }

  ngOnInit() {
    this.customerForm?.get('code')?.setValue(this.code);
    this.customerForm?.get('name')?.setValue(this.name);
    this.customerForm?.get('address')?.setValue(this.address);
    this.customerForm?.get('phoneNumber')?.setValue(this.phoneNumber);
    this.customerForm?.get('email')?.setValue(this.email);
    this.customerForm?.get('isProvider')?.setValue(this.isProvider);
  }

  close() {
    this.drawerService.close();
    this.customerForm?.get('code')?.setValue('');
    this.customerForm?.get('name')?.setValue('');
    this.customerForm?.get('address')?.setValue('');
    this.customerForm?.get('phoneNumber')?.setValue('');
    this.customerForm?.get('email')?.setValue('');
    this.customerForm?.get('isProvider')?.setValue(false);
  }

  onEdit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.customerForm.value.name.trim(),
          address: this.customerForm.value.address.trim(),
          phoneNumber: this.customerForm.value.phoneNumber.trim(),
          email: this.customerForm.value.email.trim(),
          isProvider: this.customerForm.value.isProvider,
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
