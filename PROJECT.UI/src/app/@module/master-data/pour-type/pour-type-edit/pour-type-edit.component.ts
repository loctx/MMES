import { Component } from '@angular/core';
import { PourTypeService } from 'src/app/services/MD/pour-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PourTypeFilter } from 'src/app/@filter/MD/pour-type-filter.model';
import { optionsGroup } from 'src/app/@filter/MD/area-filter.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
@Component({
  selector: 'app-pour-type-edit',
  templateUrl: './pour-type-edit.component.html',
  styleUrls: ['./pour-type-edit.component.scss']
})
export class PourTypeEditComponent {
  pourTypeForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  state: boolean | null = null;
  filter = new PourTypeFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: PourTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pourTypeForm = this._fb.group({
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
    return this.pourTypeForm.controls;
  }

  ngOnInit() {
    this.pourTypeForm?.get('code')?.setValue(this.code);
    this.pourTypeForm?.get('name')?.setValue(this.name);
    this.pourTypeForm?.get('state')?.setValue(this.state || false);
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
    this.pourTypeForm?.get('code')?.setValue('');
    this.pourTypeForm?.get('name')?.setValue('');
    this.pourTypeForm?.get('state')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.pourTypeForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.pourTypeForm.value.name.trim(),
          state: this.pourTypeForm.value.state,
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
