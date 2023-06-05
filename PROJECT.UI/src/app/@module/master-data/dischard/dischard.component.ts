import { Component, OnInit } from '@angular/core';
import { DischardFilter } from 'src/app/@filter/MD/dischard-filter.model';
import { T_MD_DISCHARD } from 'src/app/models/MD/T_MD_DISCHARD.model';
import { DischardService } from 'src/app/services/MD/dischard.service';

@Component({
  selector: 'app-dischard',
  templateUrl: './dischard.component.html'
})
export class DischardComponent implements OnInit {
  constructor(private _service: DischardService) { }

  listDischard: T_MD_DISCHARD[] = [];
  filter: DischardFilter = {
    CurrentPage: 1,
    TotalPage: 0,
    ItemCount: 0,
    PageSize: 15,
    IsLoading: true,
    KeySearch: '',
    Data: []
  }
  ngOnInit(): void {
    this._service.searchDischard(this.filter, true)
      .subscribe({
        next: (response) => {
          this.listDischard = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response) }
      });
  }
  searchDischard(event: any) {
    this.filter.CurrentPage = 1;
    this.filter.KeySearch = event.target.value;
    this._service.searchDischard(this.filter)
      .subscribe({
        next: (response) => {
          this.listDischard = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }
  onChangePage(event: any) {
    this.filter.CurrentPage = event;
    this._service.searchDischard(this.filter)
      .subscribe({
        next: (response) => {
          this.listDischard = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }

  updateDischard(item : T_MD_DISCHARD){
    this._service.updateDischard(item);
  }
}
