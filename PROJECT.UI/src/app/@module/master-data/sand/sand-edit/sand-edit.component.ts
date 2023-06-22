import { Component } from '@angular/core';
import { SandService } from 'src/app/services/MD/sand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SandFilter } from 'src/app/@filter/MD/sand-filter.model';
import { optionsGroup } from 'src/app/@filter/MD/area-filter.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';

@Component({
  selector: 'app-sand-edit',
  templateUrl: './sand-edit.component.html',
  styleUrls: ['./sand-edit.component.scss']
})
export class SandEditComponent {
  sandForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  state: boolean | null = null;
  filter = new SandFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: SandService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.sandForm = this._fb.group({
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
    return this.sandForm.controls;
  }

  ngOnInit() {
    this.sandForm?.get('code')?.setValue(this.code);
    this.sandForm?.get('name')?.setValue(this.name);
    this.sandForm?.get('state')?.setValue(this.state || false);
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
    this.sandForm?.get('code')?.setValue('');
    this.sandForm?.get('name')?.setValue('');
    this.sandForm?.get('state')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.sandForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.sandForm.value.name.trim(),
          state: this.sandForm.value.state,
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
