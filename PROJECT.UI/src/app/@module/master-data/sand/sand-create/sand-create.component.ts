import { Component } from '@angular/core';
import { SandService } from 'src/app/services/MD/sand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
@Component({
  selector: 'app-sand-create',
  templateUrl: './sand-create.component.html',
  styleUrls: ['./sand-create.component.scss']
})
export class SandCreateComponent {
  sandForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private _service: SandService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.sandForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  get f() {
    return this.sandForm.controls;
  }

  close() {
    this.drawerService.close();
    this.sandForm?.get('code')?.setValue('');
    this.sandForm?.get('name')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    if (this.sandForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.sandForm.value.code.trim(),
          name: this.sandForm.value.name.trim(),
        },
        false
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.sandForm?.get('code')?.setValue('');
          this.sandForm?.get('name')?.setValue('');
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
