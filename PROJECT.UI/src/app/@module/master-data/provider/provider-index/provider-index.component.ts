import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/MD/provider.service';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { ProviderCreateComponent } from '../provider-create/provider-create.component';
import { ProviderEditComponent } from '../provider-edit/provider-edit.component';
import { PaginationResult } from 'src/app/models/Common/pagination.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import Swal from 'sweetalert2';
import {ProviderModel} from 'src/app/models/MD/provider.model'

@Component({
  selector: 'app-provider-index',
  templateUrl: './provider-index.component.html',
  styleUrls: ['./provider-index.component.scss'],
})
export class ProviderIndexComponent implements OnInit {
  constructor(
    private _service: ProviderService,
    private drawerService: DrawerService
  ) {}

  //Khai báo biến
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
  displayedColumns: string[] = ['index', 'code', 'name','address','phoneNumber','email','actions'];
  paginationResult!: PaginationResult;
  filter = new BaseFilter();

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(ProviderCreateComponent).subscribe((result) => {
      if (result?.status) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    this.drawerService
      .open(ProviderEditComponent, item)
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
  deleteProvider(item:ProviderModel) {
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
