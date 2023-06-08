import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
interface PageData {
  page: number;
  pageSize: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  pagedata: PageData = {
    page: 1,
    pageSize: 10,
  };

  isDisablePlus: boolean = false;
  isDisableMinus: boolean = true;

  @Output() changePage = new EventEmitter();
  @Input() Pagination!: any;
  @Input() Page!: string;

  size: number = 10;
  formItem: any = {};

  ChoosePage(currentPage: number) {
    this.Pagination.currentPage = currentPage;
    this.sendDate();
  }

  selectSizePage(event: any) {
    this.size = event.target.value;
    this.sendDate();
  }

  sendDate() {
    // if (this.Page == 'InOut') {
    //   this.formItem.pageSize = 8;
    // } else {
    //   this.formItem.pageSize = this.size;
    // }

    this.formItem.pageSize = this.size;

    this.formItem.page = this.Pagination.currentPage;
    this.changePage.emit(this.formItem);
  }
}
