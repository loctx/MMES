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

  titleDrawer: string = 'Thêm mới';
  openDrawer: boolean = false;

  constructor(
    private _service: UnitService,
    private drawerService: DrawerService,
    private _fb: FormBuilder,
    private utils: utils,
    private componentFactoryResolver: ComponentFactoryResolver
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
    this.drawerService.open(UnitFormCreateComponent);
  }
  
  openEdit() {
    this.drawerService.open(UnitFormEditComponent);
  }

  // onOpenDrawer(item: T_MD_UNIT | null = null) {
  //   this.edit = item ? true : false;
  //   this.openDrawer = true;
  //   if (item) {
  //     this.unitForm?.get('code')?.setValue(item?.Code);
  //     this.unitForm?.get('name')?.setValue(item?.Name);
  //   } else {
  //     this.unitForm?.get('code')?.setValue('');
  //     this.unitForm?.get('name')?.setValue('');
  //   }
  // }

  // onCloseDrawer() {
  //   this.openDrawer = false;
  //   this.unitForm?.get('code')?.setValue('');
  //   this.unitForm?.get('name')?.setValue('');
  //   this.submitted = false;
  // }

  // onCreate() {
  //   this.submitted = true;
  //   if (this.unitForm.invalid) {
  //     return;
  //   }
  //   this._service
  //     .InsertUnit(
  //       {
  //         code: this.unitForm.value.code.trim(),
  //         name: this.unitForm.value.name.trim(),
  //       },
  //       false
  //     )
  //     .subscribe(
  //       (data) => {
  //         this.unitForm?.get('code')?.setValue('');
  //         this.unitForm?.get('name')?.setValue('');
  //         this.loadInit();
  //       },
  //       (error) => {
  //         console.log('error: ', error);
  //       }
  //     );
  // }

  // onEdit() {
  //   this.submitted = true;
  //   if (this.unitForm.invalid) {
  //     return;
  //   }
  //   this._service
  //     .UpdateUnit(
  //       {
  //         code: this.unitForm.value.code.trim(),
  //         name: this.unitForm.value.name.trim(),
  //       },
  //       false
  //     )
  //     .subscribe(
  //       (data) => {
  //         this.loadInit();
  //       },
  //       (error) => {
  //         console.log('error: ', error);
  //       }
  //     );
  // }

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
