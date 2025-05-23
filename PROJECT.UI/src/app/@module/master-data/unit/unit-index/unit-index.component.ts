import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/services/MD/unit.service';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { UnitCreateComponent } from '../unit-create/unit-create.component';
import { UnitEditComponent } from '../unit-edit/unit-edit.component';
import { PaginationResult } from 'src/app/models/Common/pagination.model';
import { UnitFilter } from 'src/app/@filter/MD/unit-filter.model';
import { UnitModel } from 'src/app/models/MD/unit.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-unit-index',
  templateUrl: './unit-index.component.html',
  styleUrls: ['./unit-index.component.scss'],
})
export class UnitIndexComponent implements OnInit {
  constructor(
    private _service: UnitService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.filter = {
        ...this.filter,
        ...params
      }
    });
  }
  dataSource!: any;
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
  displayedColumns: string[] = ['index', 'code', 'name', 'actions'];
  paginationResult!: PaginationResult;
  filter = new UnitFilter();

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(UnitCreateComponent).subscribe((result) => {
      if (result?.status) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    this.router.navigate([], { relativeTo: this.route, queryParams: {
      ...this.filter,
      code: item.code,
      name: item.name,
    } });
    this.drawerService
      .open(UnitEditComponent, {
        code: item.code,
        name: item.name,
      })
      .subscribe((result) => {
        if (result?.status) {
          this.loadInit();
        }
      });
  }

  search(
    currentPage: number = 1,
    pageSize: number | undefined = undefined,
    refresh: boolean = false
  ) {
    this.filter = {
      ...this.filter,
      keyWord: refresh ? '' : this.filter.keyWord,
      pageSize: pageSize || this.filter.pageSize,
      currentPage: currentPage,
    };
    this._service.search(this.filter, true).subscribe({
      next: ({ data }) => {
        console.log('data: ', data);
        this.paginationResult = data;
        this.router.navigate([], { relativeTo: this.route, queryParams: this.filter });
        if(this.filter.code !== '') {
          const detail = data?.data?.find((item:UnitFilter) => item.code == this.filter.code);
          if(detail) {
            this.openEdit(detail);
          }
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit() {
    this.search(this.filter.currentPage);
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }

  deleteUnit(item: UnitModel) {
    Swal.fire({
      title: 'Bạn muốn xóa dữ liệu này?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
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
