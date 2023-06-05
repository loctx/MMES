import { Component, OnInit } from '@angular/core';
import { PlantFilter } from 'src/app/@filter/MD/plant-filter.model';
import { T_MD_PLANT } from 'src/app/models/MD/T_MD_PLANT.model';
import { PlantService } from 'src/app/services/MD/plant.service';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html'
})
export class PlantComponent implements OnInit {
  constructor(private _service: PlantService) { }

  listPlant: T_MD_PLANT[] = [];
  filter: PlantFilter = {
    CurrentPage: 1,
    TotalPage: 0,
    ItemCount: 0,
    PageSize: 15,
    IsLoading: true,
    KeySearch: '',
    Data: []
  }
  ngOnInit(): void {
    this._service.searchPlant(this.filter, true)
      .subscribe({
        next: (response) => {
          this.listPlant = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response) }
      });
  }
  searchPlant(event: any) {
    this.filter.CurrentPage = 1;
    this.filter.KeySearch = event.target.value;
    this._service.searchPlant(this.filter)
      .subscribe({
        next: (response) => {
          this.listPlant = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }
  onChangePage(event: any) {
    this.filter.CurrentPage = event;
    this._service.searchPlant(this.filter)
      .subscribe({
        next: (response) => {
          this.listPlant = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }
}
