import { NgModule } from '@angular/core';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    PaginationComponent,
  ],
  exports: [
    PaginationComponent,
  ]
})
export class SharedModule { }
