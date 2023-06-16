import { NgModule } from '@angular/core';
import { PaginationComponent } from '../utils/helper/pagination/pagination.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PaginationComponent
  ],
  exports: [
    PaginationComponent
  ]
})
export class SharedModule { }
