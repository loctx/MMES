import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/services/MD/unit.service';
import { UnitFilter } from 'src/app/@filter/MD/unit-filter.model';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { UnitCreateComponent } from '../unit-create/unit-create.component';
import { UnitEditComponent } from '../unit-edit/unit-edit.component';
import { PaginationResult } from 'src/app/models/Common/pagination.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';

@Component({
  selector: 'app-unit-index',
  templateUrl: './unit-index.component.html',
  styleUrls: ['./unit-index.component.css'],
})
export class UnitIndexComponent implements OnInit {
  constructor(
    private _service: UnitService,
    private drawerService: DrawerService
  ) {}

  //Khai báo biến
  breadcrumbList: any[] = [
    {
      name: 'Trang chủ',
      path: '',
    },
    {
      name: 'Đơn vị tính',
      path: '/master-data/unit',
    },
  ];
  paginationResult!: PaginationResult;
  filter = new BaseFilter();

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(UnitCreateComponent).subscribe((result) => {
      if (result?.Status) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    this.drawerService
      .open(UnitEditComponent, {
        code: item.code,
        name: item.name,
      })
      .subscribe((result) => {
        if (result?.status) {
          this.loadInit();
        }
      });
  }

  search(currentPage: number = 1, refresh: boolean = false) {
    this.filter = {
      ...this.filter,
      keyWord: refresh ? '' : this.filter.keyWord,
      currentPage: currentPage,
    };
    this._service.search(this.filter, true).subscribe({
      next: ({ data }) => {
        this.paginationResult = data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit() {
    this.search();
  }

  onChangePage(event: any) {
    this.search(event);
  }
}
