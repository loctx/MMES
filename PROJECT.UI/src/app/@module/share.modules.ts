import { NgModule } from '@angular/core';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputCustomComponent } from './components/input-custom/input-custom.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [PaginationComponent, InputCustomComponent],
  exports: [PaginationComponent, InputCustomComponent],
})
export class SharedModule {}
