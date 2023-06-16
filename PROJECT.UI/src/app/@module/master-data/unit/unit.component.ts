import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/services/MD/unit.service';
import { UnitFilter } from 'src/app/@filter/MD/unit-filter.model';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { UnitFormCreateComponent } from './unit-form-create/unit-form-create.component';
import { UnitFormEditComponent } from './unit-form-edit/unit-form-edit.component';
import { PaginationResult } from 'src/app/models/Common/pagination.model';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
})
export class UnitComponent implements OnInit {
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
    private drawerService: DrawerService,
  ) {}

  paginationResult!: PaginationResult;
  
  filterList = new UnitFilter();

  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(UnitFormCreateComponent).subscribe((result) => {
      if(result?.Status) {
        this.loadInit();
      }
    });
  }
  
  openEdit(item:any) {
    this.drawerService.open(UnitFormEditComponent, {
      code: item.code,
      name: item.name
    }).subscribe((result) => {
      if(result?.status) {
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
    this.searchUnit()
  }

  onChangePage(event: any) {
    this.searchUnit(event);
  }
}
