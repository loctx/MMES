import { Component } from '@angular/core';
import { T_MD_UNIT } from 'src/app/models/MD/T_MD_UNIT.model';
import { UnitService } from 'src/app/services/MD/unit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { UnitFilter } from 'src/app/@filter/MD/unit-filter.model';

@Component({
  selector: 'app-unit-form-create',
  templateUrl: './unit-form-create.component.html',
  styleUrls: ['./unit-form-create.component.css']
})
export class UnitFormCreateComponent {
  unitForm: FormGroup;
  submitted: boolean = false;
  edit: boolean = true;

  constructor(
    private _service: UnitService,
    private _fb: FormBuilder,
    private utils: utils
  ) {
    this.unitForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  get f() {
    return this.unitForm.controls;
  }
}
