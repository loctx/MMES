import { Component, OnInit } from '@angular/core';
import { T_MD_UNIT } from 'src/app/models/MD/T_MD_UNIT.model';
import { UnitService } from 'src/app/services/MD/unit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utils } from 'src/app/utils/utils';
import { UnitFilter } from 'src/app/@filter/MD/unit-filter.model';

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
  unitForm: FormGroup;
  submitted: boolean = false;
  openDrawer: boolean = false;
  edit: boolean = true;
  titleDrawer: string = 'Thêm mới';
  constructor(
    private _service: UnitService,
    private _fb: FormBuilder,
    private utils: utils
  ) {
    this.unitForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  listUnit: T_MD_UNIT[] = [];
  filter: UnitFilter = {
    CurrentPage: 1,
    TotalPage: 1,
    PageSize: 10,
    KeyWord: '',
  };

  get f() {
    return this.unitForm.controls;
  }

  ngOnInit(): void {
    this.loadInit();
  }

  handleDrawer(open: boolean, item: T_MD_UNIT | null = null) {
    this.edit = item ? true : false;
    this.openDrawer = open;
    if (item) {
      this.unitForm?.get('code')?.setValue(item?.Code);
      this.unitForm?.get('name')?.setValue(item?.Name);
    } else {
      this.unitForm?.get('code')?.setValue('');
      this.unitForm?.get('name')?.setValue('');
    }
    if (!open) {
      this.submitted = false;
    }
  }

  saveDetail() {
    this.submitted = true;
    if (this.unitForm.invalid) {
      return;
    }

    if (this.edit) {
      this._service
        .UpdateUnit(
          {
            code: this.unitForm.value.code.trim(),
            name: this.unitForm.value.name.trim(),
          },
          false
        )
        .subscribe(
          (data) => {
            this.loadInit();
          },
          (error) => {
            console.log('error: ', error);
          }
        );
    } else {
      this._service
        .InsertUnit(
          {
            code: this.unitForm.value.code.trim(),
            name: this.unitForm.value.name.trim(),
          },
          false
        )
        .subscribe(
          (data) => {
            this.unitForm?.get('code')?.setValue('');
            this.unitForm?.get('name')?.setValue('');
            this.loadInit();
          },
          (error) => {
            console.log('error: ', error);
          }
        );
    }
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
        console.log('this.filter: ', this.filter);
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
