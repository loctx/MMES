import { NgModule } from '@angular/core';
import { PaginationComponent } from './components/pagination/pagination.component';
import { EmptyComponent } from './components/empty/empty.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    PaginationComponent,
    EmptyComponent
  ],
  exports: [
    PaginationComponent,
    EmptyComponent
  ]
})
export class SharedModule { }
