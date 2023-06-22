import { Component, OnInit } from '@angular/core';
import { OrderTypeService } from 'src/app/services/MD/ordertype.service';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { OrdertypeCreateComponent } from '../ordertype-create/ordertype-create.component';
import { OrdertypeEditComponent } from '../ordertype-edit/ordertype-edit.component';
import { PaginationResult } from 'src/app/models/Common/pagination.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import Swal from 'sweetalert2';
import {OrderTypeModel} from 'src/app/models/MD/ordertype.model'

@Component({
  selector: 'app-ordertype-index',
  templateUrl: './ordertype-index.component.html',
  styleUrls: ['./ordertype-index.component.scss']
})
export class OrdertypeIndexComponent {
  constructor(
    private _service: OrderTypeService,
    private drawerService: DrawerService
  ) {}

  //Khai báo biến
  displayedColumns: string[] = ['index', 'code', 'name' , 'actions'];
  paginationResult!: PaginationResult;
  filter = new BaseFilter();

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(OrdertypeCreateComponent).subscribe((result) => {
      if (result?.status) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    this.drawerService
      .open(OrdertypeEditComponent, {
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

  deleteMixer(item:OrderTypeModel) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa dữ liệu?',
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
