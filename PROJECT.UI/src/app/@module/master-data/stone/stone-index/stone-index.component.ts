import { Component, OnInit } from '@angular/core';
import { StoneService } from 'src/app/services/MD/stone.service';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { StoneCreateComponent } from '../stone-create/stone-create.component';
import { StoneEditComponent } from '../stone-edit/stone-edit.component';
import { PaginationResult } from 'src/app/models/Common/pagination.model';
import { StoneFilter } from 'src/app/@filter/MD/stone-filter.model';
import { StoneModel } from 'src/app/models/MD/stone.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-stone-index',
  templateUrl: './stone-index.component.html',
  styleUrls: ['./stone-index.component.scss']
})
export class StoneIndexComponent {
  constructor(
    private _service: StoneService,
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
  displayedColumns: string[] = ['index', 'code', 'name', 'actions'];
  paginationResult!: PaginationResult;
  filter = new StoneFilter();

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(StoneCreateComponent).subscribe((result) => {
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
      .open(StoneEditComponent, {
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
          const detail = data?.data?.find((item:StoneFilter) => item.code == this.filter.code);
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

  deleteStone(item: StoneModel) {
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
