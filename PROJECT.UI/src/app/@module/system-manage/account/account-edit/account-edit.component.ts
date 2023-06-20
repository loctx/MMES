import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { optionsGroup } from 'src/app/@filter/Common/account-filter.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import { AccountGroupService } from 'src/app/services/AD/account-group.service';
import { AccountService } from 'src/app/services/AD/account.service';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { UnitService } from 'src/app/services/MD/unit.service';
import { utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
})
export class AccountEditComponent {
  accountForm: FormGroup;
  submitted: boolean = false;
  userName: string = '';
  fullName: string = '';
  state: boolean | null = null;
  groupId: string = '';
  filterGroup = new BaseFilter();
  optionsGroup: optionsGroup[] = [];

  constructor(
    private _as: AccountService,
    private _fb: FormBuilder,
    private _ags: AccountGroupService,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.accountForm = this._fb.group({
      userName: ['', Validators.required],
      fullName: ['', [Validators.required, this.utils.trimSpace]],
      state: ['', Validators.required],
      groupId: ['', Validators.required],
    });
  }

  get f() {
    return this.accountForm.controls;
  }

  ngOnInit() {
    this.accountForm?.get('userName')?.setValue(this.userName);
    this.accountForm?.get('fullName')?.setValue(this.fullName);
    this.accountForm?.get('state')?.setValue(this.state);
    this.accountForm?.get('groupId')?.setValue(this.groupId);
    this.getAllGroup();
  }

  getAllGroup() {
    this.filterGroup.pageSize = 100;
    this._ags.search(this.filterGroup).subscribe({
      next: ({ data }) => {
        this.optionsGroup = data.data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  close() {
    this.drawerService.close();
    this.accountForm?.get('userName')?.setValue('');
    this.accountForm?.get('fullName')?.setValue('');
    this.accountForm?.get('state')?.setValue(true);
    this.accountForm?.get('groupId')?.setValue('');
  }

  onEdit() {
    this.submitted = true;
    if (this.accountForm.invalid) {
      return;
    }
    this._as
      .Update(
        {
          userName: this.accountForm.value.userName,
          fullName: this.accountForm.value.fullName,
          groupId: this.accountForm.value.groupId,
          state: this.accountForm.value.state,
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
