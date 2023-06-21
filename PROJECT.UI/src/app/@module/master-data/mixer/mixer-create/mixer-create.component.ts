import { Component } from '@angular/core';
import { MixerService } from 'src/app/services/MD/mixer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';

@Component({
  selector: 'app-mixer-create',
  templateUrl: './mixer-create.component.html',
  styleUrls: ['./mixer-create.component.scss']
})
export class MixerCreateComponent {
  mixerForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private _service: MixerService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.mixerForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  get f() {
    return this.mixerForm.controls;
  }

  close() {
    this.drawerService.close();
    this.mixerForm?.get('code')?.setValue('');
    this.mixerForm?.get('name')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    if (this.mixerForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.mixerForm.value.code.trim(),
          name: this.mixerForm.value.name.trim(),
        },
        false
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.mixerForm?.get('code')?.setValue('');
          this.mixerForm?.get('name')?.setValue('');
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
