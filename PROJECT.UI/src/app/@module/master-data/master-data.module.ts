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
import { UnitListComponent } from './unit/unit-list/unit-list.component';
import { UnitEditComponent } from './unit/unit-edit/unit-edit.component';
import { UnitCreateComponent } from './unit/unit-create/unit-create.component';

@NgModule({
  declarations: [UnitListComponent, UnitEditComponent, UnitCreateComponent],
  imports: [
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
