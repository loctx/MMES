import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/services/MD/unit.service';
import { UnitFilter } from 'src/app/@filter/MD/unit-filter.model';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { UnitCreateComponent } from '../unit-create/unit-create.component';
import { UnitEditComponent } from '../unit-edit/unit-edit.component';
import { PaginationResult } from 'src/app/models/Common/pagination.model';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css'],
})
export class UnitListComponent implements OnInit {
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

  constructor(
    private _service: UnitService,
    private drawerService: DrawerService
  ) {}

  paginationResult!: PaginationResult;

  filterList = new UnitFilter();

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

  searchUnit(currentPage: number = 1, refresh: boolean = false) {
    this.filterList = {
      ...this.filterList,
      keyWord: refresh ? '' : this.filterList.keyWord,
      currentPage: currentPage,
    };
    this._service.searchUnit(this.filterList, true).subscribe({
      next: ({ data }) => {
        this.paginationResult = data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit() {
    this.searchUnit();
  }

  onChangePage(event: any) {
    this.searchUnit(event);
  }
}
