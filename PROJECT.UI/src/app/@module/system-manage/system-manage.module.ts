import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemManageRoutingModule } from './system-manage-routing.module';
import { HistoryLoginComponent } from './history-login/history-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { UserOnlineComponent } from './user-online/user-online.component';
import { SystemConfigComponent } from './system-config/system-config.component';


@NgModule({
  declarations: [
    HistoryLoginComponent,
    UserOnlineComponent,
    SystemConfigComponent
  ],
  imports: [
    CommonModule,
    SystemManageRoutingModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
  ]
})
export class SystemManageModule { }
