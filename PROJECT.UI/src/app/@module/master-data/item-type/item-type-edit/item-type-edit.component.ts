import { Component } from '@angular/core';
import { ItemTypeService } from 'src/app/services/MD/item-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemTypeFilter } from 'src/app/@filter/MD/itemtype-filter.model';
import { optionsGroup } from 'src/app/@filter/MD/area-filter.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
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
  state: boolean | null = null;
  filter = new ItemTypeFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: ItemTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.itemTypeForm = this._fb.group({
      code: [{ value: "", disabled: true }],
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
    return this.itemTypeForm.controls;
  }

  ngOnInit() {
    this.itemTypeForm?.get('code')?.setValue(this.code);
    this.itemTypeForm?.get('name')?.setValue(this.name);
    this.itemTypeForm?.get('state')?.setValue(this.state || false);
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
    this.itemTypeForm?.get('code')?.setValue('');
    this.itemTypeForm?.get('name')?.setValue('');
    this.itemTypeForm?.get('state')?.setValue(true);
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
          state: this.itemTypeForm.value.state,
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
