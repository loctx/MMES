import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { optionsGroup } from 'src/app/@filter/Common/account-filter.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import { AccountGroupService } from 'src/app/services/AD/account-group.service';
import { AccountService } from 'src/app/services/AD/account.service';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { UnitService } from 'src/app/services/MD/unit.service';
import { utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss'],
})
export class AccountCreateComponent implements OnInit {
  accountForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _as: AccountService,
    private _fb: FormBuilder,
    private _ags: AccountGroupService,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.accountForm = this._fb.group({
      userName: ['', [Validators.required, this.utils.trimSpace]],
      fullName: ['', [Validators.required, this.utils.trimSpace]],
      state: [true, [Validators.required]],
      groupId: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getAllGroup();
  }

  get f() {
    return this.accountForm.controls;
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

  onChange(e: any) {
    this.filterGroup.keyWord = e;
    this.getAllGroup();
  }

  onSelectItem(item: any) {
    this.accountForm?.get('groupId')?.setValue(item.id);
  }

  onCreate() {
    this.submitted = true;
    if (this.accountForm.invalid) {
      return;
    }
    this._as
      .Insert(
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
          this.accountForm?.get('userName')?.setValue('');
          this.accountForm?.get('fullName')?.setValue('');
          this.accountForm?.get('state')?.setValue(true);
          this.accountForm?.get('groupId')?.setValue('');
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
