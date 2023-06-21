import { Component } from '@angular/core';
import { SandService } from 'src/app/services/MD/sand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
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

  constructor(
    private _service: SandService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.sandForm = this._fb.group({
      code: [{ value: "", disabled: true }],
      name: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  get f() {
    return this.sandForm.controls;
  }

  ngOnInit() {
    this.sandForm?.get('code')?.setValue(this.code);
    this.sandForm?.get('name')?.setValue(this.name);
  }

  close() {
    this.drawerService.close();
    this.sandForm?.get('code')?.setValue('');
    this.sandForm?.get('name')?.setValue('');
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
