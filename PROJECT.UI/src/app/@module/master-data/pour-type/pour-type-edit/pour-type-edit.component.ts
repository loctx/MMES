import { Component } from '@angular/core';
import { PourTypeService } from 'src/app/services/MD/pour-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PourTypeFilter } from 'src/app/@filter/MD/pour-type-filter.model';
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
  filter = new PourTypeFilter();

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
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: ''
    }
    this.router.navigate([], { relativeTo: this.route, queryParams: this.filter });
    this.drawerService.close();
    this.pourTypeForm?.get('code')?.setValue('');
    this.pourTypeForm?.get('name')?.setValue('');
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
