import { Component } from '@angular/core';
import { StoneService } from 'src/app/services/MD/stone.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StoneFilter } from 'src/app/@filter/MD/stone-filter.model';
import { optionsGroup } from 'src/app/@filter/MD/area-filter.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';

@Component({
  selector: 'app-stone-edit',
  templateUrl: './stone-edit.component.html',
  styleUrls: ['./stone-edit.component.scss']
})
export class StoneEditComponent {
  stoneForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  state: boolean | null = null;
  filter = new StoneFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: StoneService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.stoneForm = this._fb.group({
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
    return this.stoneForm.controls;
  }

  ngOnInit() {
    this.stoneForm?.get('code')?.setValue(this.code);
    this.stoneForm?.get('name')?.setValue(this.name);
    this.stoneForm?.get('state')?.setValue(this.state || false);
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
    this.stoneForm?.get('code')?.setValue('');
    this.stoneForm?.get('name')?.setValue('');
    this.stoneForm?.get('state')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.stoneForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.stoneForm.value.name.trim(),
          state: this.stoneForm.value.state,
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
