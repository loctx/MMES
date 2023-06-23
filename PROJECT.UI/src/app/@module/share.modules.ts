import {NgModule} from '@angular/core';
import {PaginationComponent} from './components/pagination/pagination.component';
import {EmptyComponent} from './components/empty/empty.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputCustomComponent} from './components/input-custom/input-custom.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [PaginationComponent, EmptyComponent, InputCustomComponent],
  exports: [PaginationComponent, EmptyComponent, InputCustomComponent],
})
export class SharedModule {}
