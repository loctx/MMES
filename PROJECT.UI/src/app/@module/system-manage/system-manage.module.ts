import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemManageRoutingModule } from './system-manage-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../share.modules';
import { AccountGroupIndexComponent } from './account-group/account-group-index/account-group-index.component';
import { AccountGroupEditComponent } from './account-group/account-group-edit/account-group-edit.component';
import { AccountGroupCreateComponent } from './account-group/account-group-create/account-group-create.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AccountGroupIndexComponent,
    AccountGroupEditComponent,
    AccountGroupCreateComponent
  ],
  imports: [
    MatTableModule,
    SharedModule,
    ToastrModule,
    CommonModule,
    SystemManageRoutingModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    NgSelectModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class SystemManageModule { }
