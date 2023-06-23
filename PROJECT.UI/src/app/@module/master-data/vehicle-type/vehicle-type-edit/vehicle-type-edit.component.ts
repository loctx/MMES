import { Component } from '@angular/core';
import { VehicleTypeService } from 'src/app/services/MD/vehicle-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleTypeFilter } from 'src/app/@filter/MD/vehicle-type-filter';

@Component({
  selector: 'app-vehicle-type-edit',
  templateUrl: './vehicle-type-edit.component.html',
  styleUrls: ['./vehicle-type-edit.component.scss']
})
export class VehicleTypeEditComponent {
  vehicleTypeForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  filter = new VehicleTypeFilter();

  constructor(
    private _service: VehicleTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.vehicleTypeForm = this._fb.group({
      code: [{ value: '', disabled: true }],
      name: ['', [Validators.required, this.utils.trimSpace]],
    });
    this.route.queryParams.subscribe(params => {
      this.filter = {
        ...this.filter,
        ...params
      }
    });
  }

  get f() {
    return this.vehicleTypeForm.controls;
  }

  ngOnInit() {
    this.vehicleTypeForm?.get('code')?.setValue(this.code);
    this.vehicleTypeForm?.get('name')?.setValue(this.name);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: ''
    }
    this.router.navigate([], { relativeTo: this.route, queryParams: this.filter });
    this.drawerService.close();
    this.vehicleTypeForm?.get('code')?.setValue('');
    this.vehicleTypeForm?.get('name')?.setValue('');
  }

  onEdit() {
    this.submitted = true;
    if (this.vehicleTypeForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.vehicleTypeForm.value.name.trim(),
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
