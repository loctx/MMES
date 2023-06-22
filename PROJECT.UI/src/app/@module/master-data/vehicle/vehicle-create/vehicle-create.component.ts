import { Component } from '@angular/core';
import { VehicleService } from 'src/app/services/MD/vehicle.service';
import { VehicleTypeService } from 'src/app/services/MD/vehicle-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.scss']
})
export class VehicleCreateComponent {
  vehicleForm: FormGroup;
  submitted: boolean = false;
  selectedItem: string = '';
  vehicleTypes : any = [
   
  ]

  constructor(
    private _service: VehicleService,
    private vehicleTypeService : VehicleTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.vehicleForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      tonnage: ['', [Validators.required, this.utils.trimSpace]],
      driver: ['', [Validators.required, this.utils.trimSpace]],
      typeCode: ['', [Validators.required, this.utils.trimSpace]],
      state: 'true',
    });
  }

  ngOnInit() {
     this.vehicleTypeService.getAll().subscribe((result: any) => {
      this.vehicleTypes = result.data;
    });
  }

  get f() {
    return this.vehicleForm.controls;
  }

  close() {
    this.drawerService.close();
    this.vehicleForm?.get('code')?.setValue('');
    this.vehicleForm?.get('tonnage')?.setValue('');
    this.vehicleForm?.get('driver')?.setValue('');
    this.vehicleForm?.get('state')?.setValue('true');
    this.vehicleForm?.get('typeCode')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    if (this.vehicleForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.vehicleForm.value.code.trim(),
          tonnage: this.vehicleForm.value.tonnage,
          driver: this.vehicleForm.value.driver.trim(),
          state: this.vehicleForm.value.state === 'true',
          typeCode: this.vehicleForm.value.typeCode ,
        },
        false
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.vehicleForm?.get('code')?.setValue('');
          this.vehicleForm?.get('tonnage')?.setValue('');
          this.vehicleForm?.get('driver')?.setValue('');
          this.vehicleForm?.get('state')?.setValue('true');
          this.vehicleForm?.get('typeCode')?.setValue('');
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
