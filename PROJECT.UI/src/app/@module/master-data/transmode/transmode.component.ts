import { Component, OnInit } from '@angular/core';
import { TransmodeFilter } from 'src/app/@filter/MD/transmode-filter.model';
import { T_MD_TRANSMODE } from 'src/app/models/MD/T_MD_TRANSMODE.model';
import { TransmodeService } from 'src/app/services/MD/transmode.service';

@Component({
  selector: 'app-transmode',
  templateUrl: './transmode.component.html'
})
export class TransmodeComponent implements OnInit {
  constructor(private _service: TransmodeService) { }

  listTransmode: T_MD_TRANSMODE[] = [];
  filter: TransmodeFilter = {
    CurrentPage: 1,
    TotalPage: 0,
    ItemCount: 0,
    PageSize: 15,
    IsLoading: true,
    KeySearch: '',
    Data: []
  }
  ngOnInit(): void {
    this._service.searchTransmode(this.filter, true)
      .subscribe({
        next: (response) => {
          this.listTransmode = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response) }
      });
  }
  searchTransmode(event: any) {
    this.filter.CurrentPage = 1;
    this.filter.KeySearch = event.target.value;
    this._service.searchTransmode(this.filter)
      .subscribe({
        next: (response) => {
          this.listTransmode = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }
  onChangePage(event: any) {
    this.filter.CurrentPage = event;
    this._service.searchTransmode(this.filter)
      .subscribe({
        next: (response) => {
          this.listTransmode = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }

  updateTransmode(item : T_MD_TRANSMODE){
    this._service.updateTransmode(item);
  }
}
