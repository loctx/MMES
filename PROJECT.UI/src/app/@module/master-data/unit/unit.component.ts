import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { T_MD_UNIT } from 'src/app/models/MD/T_MD_UNIT.model';
import { UnitService } from 'src/app/services/MD/unit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
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
  titleDrawer: string = 'Thêm mới';
  openDrawer: boolean = false;

  constructor(
    private _service: UnitService,
    private drawerService: DrawerService,
  ) {}

  listUnit: T_MD_UNIT[] = [];
  filter: UnitFilter = {
    CurrentPage: 1,
    TotalPage: 1,
    PageSize: 10,
    KeyWord: '',
  };

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
    this.drawerService.setData({
      code: item.Code,
      name: item.Name
    });
    this.drawerService.open(UnitFormEditComponent).subscribe((result) => {
      if(result?.Status) {
        this.loadInit();
      }
    });
  }

  loadInit(CurrentPage: number = 1, refresh: boolean = false) {
    this.filter = {
      ...this.filter,
      KeyWord: refresh ? '' : this.filter.KeyWord,
      CurrentPage: CurrentPage,
    };
    this._service.searchUnit(this.filter, true).subscribe({
      next: ({ Data }) => {
        this.listUnit = Data.Data;
        this.filter = {
          ...Data,
          KeyWord: this.filter.KeyWord,
        };
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  onChangePage(event: any) {
    this.loadInit(event);
  }
}
