import { Component } from '@angular/core';
import { VehicleService } from 'src/app/services/MD/vehicle.service';
import { VehicleTypeService } from 'src/app/services/MD/vehicle-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleFilter } from 'src/app/@filter/MD/vehicle-filter.model';
@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent {
  vehicleForm: FormGroup;
  submitted: boolean = false;
  
  code: string = ''
  tonnage: number = 0
  driver: string = ''
  typeCode: string = ''
  state: boolean | null = null
  selectedItem: string = '';
  vehicleTypes : any = [
   
  ]

  filter = new VehicleFilter();

  constructor(
    private _service: VehicleService,
    private vehicleTypeService : VehicleTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.vehicleForm = this._fb.group({
      code: [{ value: '', disabled: true }],
      driver: ['', [Validators.required, this.utils.trimSpace]],
      typeCode: ['', [Validators.required, this.utils.trimSpace]],
      tonnage: [0, [Validators.required]],
      state: ['true',[Validators.required]]
    });
    this.route.queryParams.subscribe(params => {
      this.filter = {
        ...this.filter,
        ...params
      }
    });
  }

  get f() {
    return this.vehicleForm.controls;
  }

  ngOnInit() {
    this.vehicleForm?.get('code')?.setValue(this.code);
    this.vehicleForm?.get('driver')?.setValue(this.driver);
    this.vehicleForm?.get('typeCode')?.setValue(this.typeCode);
    this.vehicleForm?.get('tonnage')?.setValue(this.tonnage);
    this.vehicleForm?.get('state')?.setValue(this.state);  
    console.log(this.state) 
  }

  ngAfterViewInit() {
    this.vehicleTypeService.getAll().subscribe((result: any) => {
       this.vehicleTypes = result.data;
    });
  }

  close() {
    this.filter = {
      ...this.filter,
    }
    this.router.navigate([], { relativeTo: this.route, queryParams: this.filter });
    this.drawerService.close();
    this.vehicleForm?.get('code')?.setValue('');
    this.vehicleForm?.get('driver')?.setValue('');
    this.vehicleForm?.get('typeCode')?.setValue('');
    this.vehicleForm?.get('tonnage')?.setValue(0);
    this.vehicleForm?.get('state')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.vehicleForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          driver: this.vehicleForm.value.driver.trim(),
          typeCode: this.vehicleForm.value.typeCode.trim(),
          tonnage: this.vehicleForm.value.tonnage,
          state: this.vehicleForm.value.state,
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
