import { Component, OnInit } from '@angular/core';
import {
  AccountFilter,
  optionsGroup,
} from 'src/app/@filter/Common/account-filter.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import { PaginationResult } from 'src/app/models/Common/pagination.model';
import { AccountService } from 'src/app/services/AD/account.service';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { AccountCreateComponent } from '../account-create/account-create.component';

@Component({
  selector: 'app-account-index',
  templateUrl: './account-index.component.html',
  styleUrls: ['./account-index.component.scss'],
})
export class AccountIndexComponent implements OnInit {
  paginationResult!: PaginationResult;
  displayedColumns: string[] = [
    'index',
    'accountGroup',
    'userName',
    'fullName',
    'actions',
  ];
  filter = new AccountFilter();
  filterGroup = new BaseFilter();
  optionsGroup: optionsGroup[] = [];
  optionsSate = [
    { name: 'Đã kích hoạt', value: true },
    { name: 'Chưa kích hoạt', value: false },
  ];
  constructor(private _as: AccountService, private _ds: DrawerService) {}
  ngOnInit(): void {
    this.loadInit();
    this.getAllGroup();
  }

  search(
    currentPage: number = 1,
    pageSize: number | undefined = undefined,
    refresh: boolean = false
  ) {
    this.filter = {
      ...this.filter,
    };
    this._as.search(this.filter, true).subscribe({
      next: ({ data }) => {
        this.paginationResult = data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  getAllGroup() {
    this.filterGroup.pageSize = 100;
    this._as.searchAccountGroup(this.filterGroup).subscribe({
      next: ({ data }) => {
        this.optionsGroup = data.data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  onChangeGroup(e: any) {
    this.search();
  }

  onChangeState(e: any) {
    this.search();
  }

  refresh() {
    this.filter.currentPage = 1;
    this.filter.keyWord = '';
    this.search();
  }

  loadInit() {
    this.search();
  }

  openCreate() {
    this._ds.open(AccountCreateComponent).subscribe((result) => {
      if (result?.status) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    console.log(item, 'item');
  }

  deleteUnit(item: any) {
    console.log(item, 'item');
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }
}
