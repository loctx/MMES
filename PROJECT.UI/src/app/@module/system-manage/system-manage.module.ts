import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemManageRoutingModule } from './system-manage-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import {SharedModule} from '../share.modules';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SystemManageRoutingModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    SharedModule
  ]
})
export class SystemManageModule { }
