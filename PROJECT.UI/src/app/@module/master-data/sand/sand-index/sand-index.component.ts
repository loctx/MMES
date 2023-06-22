import { Component, OnInit } from '@angular/core';
import { SandService } from 'src/app/services/MD/sand.service';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { SandCreateComponent } from '../sand-create/sand-create.component';
import { SandEditComponent } from '../sand-edit/sand-edit.component';
import { PaginationResult } from 'src/app/models/Common/pagination.model';
import { SandFilter,optionsGroup } from 'src/app/@filter/MD/sand-filter.model';
import { SandModel } from 'src/app/models/MD/sand.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sand-index',
  templateUrl: './sand-index.component.html',
  styleUrls: ['./sand-index.component.scss']
})
export class SandIndexComponent {
  constructor(
    private _service: SandService,
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

  //Khai báo biến
  displayedColumns: string[] = ['index', 'code', 'name','state' ,  'actions'];
  paginationResult!: PaginationResult;
  filter = new SandFilter();
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
    this.drawerService.open(SandCreateComponent).subscribe((result) => {
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
      .open(SandEditComponent, {
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
          const detail = data?.data?.find((item:SandFilter) => item.code == this.filter.code);
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

  deleteSand(item: SandModel) {
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
