import { Component } from '@angular/core';
import { ItemTypeService } from 'src/app/services/MD/item-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
@Component({
  selector: 'app-item-type-edit',
  templateUrl: './item-type-edit.component.html',
  styleUrls: ['./item-type-edit.component.scss']
})
export class ItemTypeEditComponent {
  itemTypeForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';

  constructor(
    private _service: ItemTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.itemTypeForm = this._fb.group({
      code: [{ value: "", disabled: true }],
      name: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  get f() {
    return this.itemTypeForm.controls;
  }

  ngOnInit() {
    this.itemTypeForm?.get('code')?.setValue(this.code);
    this.itemTypeForm?.get('name')?.setValue(this.name);
  }

  close() {
    this.drawerService.close();
    this.itemTypeForm?.get('code')?.setValue('');
    this.itemTypeForm?.get('name')?.setValue('');
  }

  onEdit() {
    this.submitted = true;
    if (this.itemTypeForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.itemTypeForm.value.name.trim(),
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
