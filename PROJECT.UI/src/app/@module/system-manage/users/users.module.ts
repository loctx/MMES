import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { MultidropdownComponent } from './multidropdown/multidropdown.component';
import { RightContentComponent } from './right-content/right-content.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [UserCreateComponent, UserEditComponent, UserListComponent, PaginationComponent, MultidropdownComponent, RightContentComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class UsersModule {}
