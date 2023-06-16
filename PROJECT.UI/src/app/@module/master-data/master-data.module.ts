import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataRoutingModule } from './master-data-routing.module';
import { UnitComponent } from './unit/unit.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UnitFormCreateComponent } from './unit/unit-form-create/unit-form-create.component';
import { UnitFormEditComponent } from './unit/unit-form-edit/unit-form-edit.component';
import {SharedModule} from '../share.modules';

@NgModule({
  declarations: [
    UnitComponent,
    UnitFormCreateComponent,
    UnitFormEditComponent
  ],
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
    ReactiveFormsModule
  ],
})
export class MasterDataModule { }
