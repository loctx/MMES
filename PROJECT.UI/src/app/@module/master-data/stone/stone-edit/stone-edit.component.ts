import { Component } from '@angular/core';
import { StoneService } from 'src/app/services/MD/stone.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
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

  constructor(
    private _service: StoneService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.stoneForm = this._fb.group({
      code: [{ value: "", disabled: true }],
      name: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  get f() {
    return this.stoneForm.controls;
  }

  ngOnInit() {
    this.stoneForm?.get('code')?.setValue(this.code);
    this.stoneForm?.get('name')?.setValue(this.name);
  }

  close() {
    this.drawerService.close();
    this.stoneForm?.get('code')?.setValue('');
    this.stoneForm?.get('name')?.setValue('');
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
