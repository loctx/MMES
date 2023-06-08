import { Component, OnInit } from '@angular/core';
import { UserFilter } from 'src/app/@filter/AD/user-filter.model';
import { T_AD_USER } from 'src/app/models/AD/T_AD_USER.model';
import { UserService } from 'src/app/services/AD/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare function Message(response: any): any;
import { HttpClient } from '@angular/common/http';
import { Pagination, lstAccount } from '../../../../models/pagination';
import { Item } from '../../../../models/multidropdown';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  openForm: Boolean = false;
  isCreate: Boolean = true;
  customerId: number = 0;
  stateChecked: boolean = true;
  CreateEditForm!: FormGroup;
  lstNameFunc: any;

  Pagination: Pagination = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0,
    totalPage: 0,
  };
  PageInfo = {
    page: 1,
    Keyword: '',
    pageSize: 10,
  };

  lstdata: lstAccount = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0,
    totalPage: 0,
    data: [],
  };

  listUser: T_AD_USER[] | any = [];
  filter: UserFilter = {
    CurrentPage: 1,
    TotalPage: 0,
    ItemCount: 0,
    PageSize: 15,
    IsLoading: true,
    KeySearch: 'Empty',
    Data: [],
  };

  constructor(private _service: UserService, private http: HttpClient) {
    this.CreateEditForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      fullName: new FormControl(),
      password: new FormControl(),
      groupId: new FormControl(),
      state: new FormControl(),
      deviceId: new FormControl(),
      deviceIdDayUpdate: new FormControl(),
    });
  }
  get userName() {
    return this.CreateEditForm.get('userName');
  }
  submited: boolean = false;

  ngOnInit(): void {
    this.Pagingdata(this.PageInfo);
  }

  async Pagingdata(PageInfo: any) {
    await this._service.PagingGroup(1, '', 50).subscribe((res) => {
      this.lstNameFunc = res.data;
    });
    await this._service
      .Paging(this.PageInfo.page, this.PageInfo.Keyword, this.PageInfo.pageSize)
      .subscribe((data: any) => {
        this.lstdata = data;
        (this.Pagination.currentPage = data.currentPage),
          (this.Pagination.pageSize = data.pageSize),
          (this.Pagination.totalPage = data.totalPage),
          (this.Pagination.totalRecord = data.totalRecord);
      });
  }

  onChangePage(pageOfItems: any) {
    pageOfItems.Keyword = this.PageInfo.Keyword;
    this.PageInfo = pageOfItems;
    this.Pagingdata(pageOfItems);
  }

  searchUser(event: any) {
    this.filter.CurrentPage = 1;
    if (event.target.value) {
      this.filter.KeySearch = event.target.value;
    } else {
      this.filter.KeySearch = 'Empty';
    }
    this._service.getListUser(this.filter).subscribe({
      next: (response) => {
        this.listUser = response.Data.Data;
        this.filter = response.Data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  radioChange(event: any) {
    this.CreateEditForm.get('state')?.setValue(event.value);
    this.stateChecked = event.value;
  }

  get groupId() {
    return this.CreateEditForm.get('groupId');
  }

  groupSelected: string = '';
  groupList: Item[] = [];

  onDropDownChange(item: Item): void {
    if (!item.checked) {
      this.groupSelected = '';
      this.CreateEditForm.get('groupId')?.setValue(0);
    } else {
      this.groupSelected = item.name;
      this.CreateEditForm.get('groupId')?.setValue(+item.name);
    }
  }

  openEdit(id: number) {
    this.isCreate = false;
    this.customerId = id;
    this.openForm = true;
  }
  handleAdd() {
    this.openForm = true;
    this.isCreate = true;
  }
  oncloseForm(isOpen: Boolean) {
    this.openForm = isOpen;
  }
 async onSave(isSave: Boolean) {
    if (isSave) {
     await  this.Pagingdata(this.PageInfo);
    }
  }
  showNameFunc(groupId: number) {
    if (this.lstNameFunc?.length == 0) {
      return '';
    }
    const index = this.lstNameFunc?.findIndex((f: any) => f.id == groupId);
    return this.lstNameFunc[index].name;
  }
  onSearch(e: any) {
    this.PageInfo.Keyword = e;
    this.PageInfo.page = 1;
    this.Pagingdata(this.PageInfo);
  }
}
