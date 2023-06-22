import { Component, OnInit } from '@angular/core';
import { OrderTypeService } from 'src/app/services/MD/ordertype.service';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { OrdertypeCreateComponent } from '../ordertype-create/ordertype-create.component';
import { OrdertypeEditComponent } from '../ordertype-edit/ordertype-edit.component';
import { PaginationResult } from 'src/app/models/Common/pagination.model';
import { OrderTypeFilter,optionsGroup } from 'src/app/@filter/MD/ordertype-filter.model';
import Swal from 'sweetalert2';
import {OrderTypeModel} from 'src/app/models/MD/ordertype.model'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordertype-index',
  templateUrl: './ordertype-index.component.html',
  styleUrls: ['./ordertype-index.component.scss']
})
export class OrdertypeIndexComponent {
  constructor(
    private _service: OrderTypeService,
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
  displayedColumns: string[] = ['index', 'code', 'name' ,'state', 'actions'];
  paginationResult!: PaginationResult;
  filter = new OrderTypeFilter();
  optionsGroup: optionsGroup[] = [];
  optionsSate = [
    { name: 'Đã kích hoạt', value: true },
    { name: 'Chưa kích hoạt', value: false },
  ];

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
    this.router.navigate([], { relativeTo: this.route, queryParams: {
      ...this.filter,
      code: item.code,
      name: item.name,
      state: item.state
    } });
    this.drawerService
      .open(OrdertypeEditComponent, {
        code: item.code,
        name: item.name,
        state: item.state
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
        this.router.navigate([], { relativeTo: this.route, queryParams: this.filter });
        if(this.filter.code !== '') {
          const detail = data?.data?.find((item:OrderTypeFilter) => item.code == this.filter.code);
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
