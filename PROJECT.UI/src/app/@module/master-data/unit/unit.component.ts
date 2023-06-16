import { Component, OnInit } from '@angular/core';
import { T_MD_UNIT_RESPONSE } from 'src/app/models/MD/T_MD_UNIT.model';
import { UnitService } from 'src/app/services/MD/unit.service';
import { UnitFilter } from 'src/app/@filter/MD/unit-filter.model';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { UnitFormCreateComponent } from './unit-form-create/unit-form-create.component';
import { UnitFormEditComponent } from './unit-form-edit/unit-form-edit.component';

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

  dataUnit: T_MD_UNIT_RESPONSE = {
    CurrentPage: 1,
    PageSize: 10,
    TotalPage: 1,
    TotalRecord: 1,
    KeyWord: '',
    Data:[],
  } 

  filterList:UnitFilter = {
    CurrentPage: 1,
    PageSize: 10,
    KeyWord: ''
  }

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
      code: item.Code,
      name: item.Name
    }).subscribe((result) => {
      if(result?.Status) {
        this.loadInit();
      }
    });
  }

  searchUnit(CurrentPage: number = 1, refresh: boolean = false) {
    this.filterList = {
      ...this.filterList,
      KeyWord: refresh ? '' : this.filterList.KeyWord,
      CurrentPage: CurrentPage,
    };
    this._service.searchUnit(this.filterList, true).subscribe({
      next: ({ Data }) => {
        this.dataUnit = Data;
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
