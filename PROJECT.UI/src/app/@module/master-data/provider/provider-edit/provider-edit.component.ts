import { Component } from '@angular/core';
import { ProviderService } from 'src/app/services/MD/provider.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.scss']
})
export class ProviderEditComponent {
  providerForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  address: string = '';
  phoneNumber:string = '';
  email:string = '';
  isCustomer!: boolean ;

  constructor(
    private _service: ProviderService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.providerForm = this._fb.group({
      code: [{ value: "", disabled: true }],
      name: ["", [Validators.required, this.utils.trimSpace]],
      address: ["", [Validators.required, this.utils.trimSpace]],
      phoneNumber: ["", [Validators.required, this.utils.trimSpace]],
      email: ["", [Validators.required, Validators.email ,this.utils.trimSpace]],
      isCustomer: [false, [Validators.required]],
    });
  }

  get f() {
    return this.providerForm.controls;
  }

  ngOnInit() {
    this.providerForm?.get('code')?.setValue(this.code);
    this.providerForm?.get('name')?.setValue(this.name);
    this.providerForm?.get('address')?.setValue(this.address);
    this.providerForm?.get('phoneNumber')?.setValue(this.phoneNumber);
    this.providerForm?.get('email')?.setValue(this.email);
    this.providerForm?.get('isCustomer')?.setValue(this.isCustomer);
  }

  close() {
    this.drawerService.close();
    this.providerForm?.get('code')?.setValue('');
    this.providerForm?.get('name')?.setValue('');
    this.providerForm?.get('address')?.setValue('');
    this.providerForm?.get('phoneNumber')?.setValue('');
    this.providerForm?.get('email')?.setValue('');
    this.providerForm?.get('isCustomer')?.setValue(false);
  }

  onEdit() {
    this.submitted = true;
    if (this.providerForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.providerForm.value.name.trim(),
          address: this.providerForm.value.address.trim(),
          phoneNumber: this.providerForm.value.phoneNumber.trim(),
          email: this.providerForm.value.email.trim(),
          isCustomer: this.providerForm.value.isCustomer,
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
