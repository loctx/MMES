import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataRoutingModule } from './master-data-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../share.modules';
import { UnitEditComponent } from './unit/unit-edit/unit-edit.component';
import { UnitCreateComponent } from './unit/unit-create/unit-create.component';
import { UnitIndexComponent } from './unit/unit-index/unit-index.component';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [UnitEditComponent, UnitCreateComponent, UnitIndexComponent, DashboardComponent, ResultComponent],
  imports: [
    MatTableModule,
    SharedModule,
    ToastrModule,
    CommonModule,
    MasterDataRoutingModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    NgSelectModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class MasterDataModule {}
