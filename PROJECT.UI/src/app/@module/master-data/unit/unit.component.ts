import { Component, OnInit } from '@angular/core';
import { UnitFilter } from 'src/app/@filter/MD/unit-filter.model';
import { T_MD_UNIT } from 'src/app/models/MD/T_MD_UNIT.model';
import { UnitService } from 'src/app/services/MD/unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html'
})
export class UnitComponent implements OnInit {
  constructor(private _service: UnitService) { }

  listUnit: T_MD_UNIT[] = [];
  filter: UnitFilter = {
    CurrentPage: 1,
    TotalPage: 0,
    ItemCount: 0,
    PageSize: 15,
    IsLoading: true,
    KeySearch: '',
    Data: []
  }
  ngOnInit(): void {
    this._service.searchUnit(this.filter, true)
      .subscribe({
        next: (response) => {
          this.listUnit = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response) }
      });
  }
  searchUnit(event: any) {
    this.filter.CurrentPage = 1;
    this.filter.KeySearch = event.target.value;
    this._service.searchUnit(this.filter)
      .subscribe({
        next: (response) => {
          this.listUnit = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }
  onChangePage(event: any) {
    this.filter.CurrentPage = event;
    this._service.searchUnit(this.filter)
      .subscribe({
        next: (response) => {
          this.listUnit = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }

  updateUnit(item : T_MD_UNIT){
    this._service.updateUnit(item);
  }
}
