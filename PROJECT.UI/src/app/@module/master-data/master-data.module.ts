import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataRoutingModule } from './master-data-routing.module';
import { UnitComponent } from './unit/unit.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SaleOfficeComponent } from './sale-office/sale-office.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialComponent } from './material/material.component';
import { PlantComponent } from './plant/plant.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { DischardComponent } from './dischard/dischard.component';
import { TransmodeComponent } from './transmode/transmode.component';
import { VendorComponent } from './vendor/vendor.component';
import { CustomerComponent } from './customer/customer.component';
import {PaginationComponent} from '../../utils/helper/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    PaginationComponent,
    SaleOfficeComponent,
    UnitComponent,
    MaterialComponent,
    PlantComponent,
    VehicleComponent,
    DischardComponent,
    TransmodeComponent,
    VendorComponent,
    CustomerComponent,
  ],
  imports: [
    ToastrModule,
    CommonModule,
    MasterDataRoutingModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    NgSelectModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class MasterDataModule { }
