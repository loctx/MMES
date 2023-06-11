import { Component, OnInit } from '@angular/core';
import { UnitFilter } from 'src/app/@filter/MD/unit-filter.model';
import { T_MD_UNIT } from 'src/app/models/MD/T_MD_UNIT.model';
import { UnitService } from 'src/app/services/MD/unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  breadcrumbList: any[] = [
    {
      name: "Trang chủ",
      path: ""
    },
    {
      name: "Đơn vị tính",
      path: "/master-data/unit"
    }
  ];
  openDrawer:boolean = false;
  constructor(private _service: UnitService) { }

  listUnit: T_MD_UNIT[] = [];
  filter: UnitFilter = {
    CurrentPage: 1,
    TotalPage: 1,
    PageSize: 10,
    KeyWord: '',
  }
  ngOnInit(): void {
    this.loadInit();
  }
  
  handleDrawer(open:boolean) {
    this.openDrawer = open;
  }

  saveDetail() {
    this.openDrawer = false;
  }

  loadInit() {
    this._service.searchUnit(this.filter, true)
      .subscribe({
        next: ({Data}) => {
          console.log('Data: ', Data);
          this.listUnit = Data.Data;
          this.filter = Data
          console.log(this.filter);
        },
        error: (response) => { console.log(response) }
      });
  }

  onChangePage(event: any) {
    this.filter.CurrentPage = event;
    this.loadInit()
  }
  
}
