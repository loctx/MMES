import { Component } from '@angular/core';
import { AccountGroupService } from 'src/app/services/AD/account-group.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { ListAccount } from 'src/app/models/AD/account-group.model';
@Component({
  selector: 'app-account-group-edit',
  templateUrl: './account-group-edit.component.html',
  styleUrls: ['./account-group-edit.component.scss'],
})
export class AccountGroupEditComponent {
  accountGroupForm: FormGroup;
  submitted: boolean = false;
  id: string = '';
  name: string = '';
  notes: string = '';
  state: string = '';
  listMember: ListAccount[] = []

  constructor(
    private _service: AccountGroupService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService
  ) {
    this.accountGroupForm = this._fb.group({
      name: ['', [Validators.required, this.utils.trimSpace]],
      notes: '',
      state: '',
    });
  }

  ngOnInit() {
    this.getDetail();
    this.accountGroupForm?.get('name')?.setValue(this.name);
    this.accountGroupForm?.get('notes')?.setValue(this.notes);
    this.accountGroupForm?.get('state')?.setValue(this.state.toString());
  }

  close() {
    this.drawerService.close();
    this.accountGroupForm?.get('name')?.setValue('');
    this.accountGroupForm?.get('notes')?.setValue('');
    this.accountGroupForm?.get('state')?.setValue('true');
  }

  get f() {
    return this.accountGroupForm.controls;
  }

  getDetail() {
    this._service.GetDetail(this.id, false).subscribe(
      ({data}) => {
        this.listMember = data.listAccount;
        console.log('this.listMember: ', this.listMember);
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  onEdit() {
    this.submitted = true;
    if (this.accountGroupForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          id: this.id,
          name: this.accountGroupForm.value.name.trim(),
          notes: this.accountGroupForm.value.notes.trim(),
          state: this.accountGroupForm.value.state === 'true',
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
