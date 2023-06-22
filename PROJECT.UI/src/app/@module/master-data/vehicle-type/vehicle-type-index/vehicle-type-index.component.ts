import { Component, OnInit } from '@angular/core';
import { VehicleTypeService } from 'src/app/services/MD/vehicle-type.service';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { VehicleTypeCreateComponent } from '../vehicle-type-create/vehicle-type-create.component';
import { VehicleTypeEditComponent } from '../vehicle-type-edit/vehicle-type-edit.component';
import { PaginationResult } from 'src/app/models/Common/pagination.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import {VehicleTypeModel} from 'src/app/models/MD/vehicle-type.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-vehicle-type-index',
  templateUrl: './vehicle-type-index.component.html',
  styleUrls: ['./vehicle-type-index.component.scss']
})
export class VehicleTypeIndexComponent {
  constructor(
    private _service: VehicleTypeService,
    private drawerService: DrawerService
  ) {}

  //Khai báo biến
  displayedColumns: string[] = ['index', 'code', 'name', 'actions'];
  paginationResult!: PaginationResult;
  filter = new BaseFilter();

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(VehicleTypeCreateComponent).subscribe((result) => {
      if (result?.status) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    this.drawerService
      .open(VehicleTypeEditComponent, {
        code: item.code,
        name: item.name,
      })
      .subscribe((result) => {
        if (result?.status) {
          this.loadInit();
        }
      });
  }

  search(currentPage: number = 1, pageSize:number | undefined = undefined, refresh: boolean = false) {
    this.filter = {
      ...this.filter,
      keyWord: refresh ? '' : this.filter.keyWord,
      pageSize: pageSize || this.filter.pageSize,
      currentPage: currentPage,
    };
    this._service.search(this.filter, true).subscribe({
      next: ({ data }) => {
        this.paginationResult = data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit() {
    this.search();
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }

  deleteVehicleType(item:VehicleTypeModel) {
    Swal.fire({
      title: 'Bạn muốn xóa dữ liệu này?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.Delete(item, true).subscribe({
          next: ({ data }) => {
            this.loadInit();
          },
          error: (response) => {
            console.log(response);
          },
        });
      }
    });
  }
}
