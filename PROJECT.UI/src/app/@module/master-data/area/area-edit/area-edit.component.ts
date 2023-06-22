import { Component } from '@angular/core';
import { AreaService } from 'src/app/services/MD/area.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AreaFilter } from 'src/app/@filter/MD/area-filter.model';
import { optionsGroup } from 'src/app/@filter/MD/area-filter.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';

@Component({
  selector: 'app-area-edit',
  templateUrl: './area-edit.component.html',
  styleUrls: ['./area-edit.component.scss']
})
export class AreaEditComponent {
  areaForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  state: boolean | null = null;
  filter = new AreaFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: AreaService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.areaForm = this._fb.group({
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
    return this.areaForm.controls;
  }

  ngOnInit() {
    this.areaForm?.get('code')?.setValue(this.code);
    this.areaForm?.get('name')?.setValue(this.name);
    this.areaForm?.get('state')?.setValue(this.state || false);
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
    this.areaForm?.get('code')?.setValue('');
    this.areaForm?.get('name')?.setValue('');
    this.areaForm?.get('state')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.areaForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.areaForm.value.name.trim(),
          state: this.areaForm.value.state,
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
