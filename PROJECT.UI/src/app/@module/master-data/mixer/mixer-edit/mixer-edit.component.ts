import { Component } from '@angular/core';
import { MixerService } from 'src/app/services/MD/mixer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MixerFilter } from 'src/app/@filter/MD/mixer-filter.model';
@Component({
  selector: 'app-mixer-edit',
  templateUrl: './mixer-edit.component.html',
  styleUrls: ['./mixer-edit.component.scss']
})
export class MixerEditComponent {
  mixerForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  filter = new MixerFilter();

  constructor(
    private _service: MixerService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.mixerForm = this._fb.group({
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
    return this.mixerForm.controls;
  }

  ngOnInit() {
    this.mixerForm?.get('code')?.setValue(this.code);
    this.mixerForm?.get('name')?.setValue(this.name);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: ''
    }
    this.router.navigate([], { relativeTo: this.route, queryParams: this.filter });
    this.drawerService.close();
    this.mixerForm?.get('code')?.setValue('');
    this.mixerForm?.get('name')?.setValue('');
  }

  onEdit() {
    this.submitted = true;
    if (this.mixerForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.mixerForm.value.name.trim(),
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
