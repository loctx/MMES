import { Component } from '@angular/core';
import { DepartmentService } from 'src/app/services/MD/department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { optionsGroup } from 'src/app/@filter/MD/product-filter.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import { DepartmentFilter } from 'src/app/@filter/MD/department-filter.model';
@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss']
})
export class DepartmentEditComponent {
  dpmForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  state: boolean | null = null;
  filter = new DepartmentFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: DepartmentService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dpmForm = this._fb.group({
      code: [{ value: '', disabled: true }],
      name: ['', [Validators.required, this.utils.trimSpace]],
      state: ['', Validators.required],
    });
    this.route.queryParams.subscribe(params => {
      this.filter = {
        ...this.filter,
        ...params
      }
    });
  }

  get f() {
    return this.dpmForm.controls;
  }

  ngOnInit() {
    this.dpmForm?.get('code')?.setValue(this.code);
    this.dpmForm?.get('name')?.setValue(this.name);
    this.dpmForm?.get('state')?.setValue(this.state || false);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      state:'',
    }
    this.router.navigate([], { relativeTo: this.route, queryParams: this.filter });
    this.drawerService.close();
    this.dpmForm?.get('code')?.setValue('');
    this.dpmForm?.get('name')?.setValue('');
    this.dpmForm?.get('state')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.dpmForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.dpmForm.value.name.trim(),
          state: this.dpmForm.value.state,
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
