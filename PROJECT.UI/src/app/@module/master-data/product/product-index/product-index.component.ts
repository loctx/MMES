import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/MD/product.service';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { PaginationResult } from 'src/app/models/Common/pagination.model';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import { ProductModel } from 'src/app/models/MD/product.model';
import Swal from 'sweetalert2';
import { DropdownService } from 'src/app/services/Common/dropdown.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductFilter } from 'src/app/@filter/MD/product-filter.model';
@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.scss'],
})
export class ProductIndexComponent {
  constructor(
    private _service: ProductService,
    private drawerService: DrawerService,
    private _test: DropdownService,
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
      name: 'Sản Phẩm',
      path: '/master-data/san-pham',
    },
  ];
  displayedColumns: string[] = [
    'index',
    'code',
    'name',
    'unitCode',
    'typeCode',
    'actions',
  ];
  paginationResult!: PaginationResult;
  filter = new ProductFilter();

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(ProductCreateComponent).subscribe((result) => {
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
      unitCode: item.unitCode,
      typeCode: item.typeCode,
    } });
    this.drawerService
      .open(ProductEditComponent, {
        code: item.code,
        name: item.name,
        unitCode: item.unitCode,
        typeCode: item.typeCode,
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
        this.paginationResult = data;
        this.router.navigate([], { relativeTo: this.route, queryParams: this.filter });
        if(this.filter.code !== '') {
          const detail = data?.data?.find((item:ProductFilter) => item.code == this.filter.code);
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
    this.search();
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }

  deleteProduct(item: ProductModel) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa dữ liệu?',
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
