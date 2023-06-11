import {
  Component,
  Output, 
  EventEmitter,
  Input,
} from "@angular/core";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() pageSize: number = 10;
  @Input() totalPage: number = 1;
  @Input() page:number = 1;
  @Output() pageChange = new EventEmitter<number>();

  decreasePage(): void {
    if (this.page > 1) {
      this.page--;
      this.pageChange.emit(this.page);
    }
  }

  increasePage(): void {
    if (this.page < this.totalPage) {
      this.page++;
      this.pageChange.emit(this.page);
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPage }, (_, index) => index + 1);
  }

  goToPage(pageNumber: number): void {
    this.page = pageNumber;
    this.pageChange.emit(this.page);
  }
}
