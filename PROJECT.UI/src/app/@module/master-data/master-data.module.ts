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

import { CustomerIndexComponent } from './customer/customer-index/customer-index.component';
import { CustomerCreateComponent } from './customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { ProviderIndexComponent } from './provider/provider-index/provider-index.component';
import { ProviderCreateComponent } from './provider/provider-create/provider-create.component';
import { ProviderEditComponent } from './provider/provider-edit/provider-edit.component';
import { WarehouseIndexComponent } from './warehouse/warehouse-index/warehouse-index.component';
import { WarehouseCreateComponent } from './warehouse/warehouse-create/warehouse-create.component';
import { WarehouseEditComponent } from './warehouse/warehouse-edit/warehouse-edit.component';
import { ItemTypeIndexComponent } from './item-type/item-type-index/item-type-index.component';
import { ItemTypeCreateComponent } from './item-type/item-type-create/item-type-create.component';
import { ItemTypeEditComponent } from './item-type/item-type-edit/item-type-edit.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SandIndexComponent } from './sand/sand-index/sand-index.component';
import { SandCreateComponent } from './sand/sand-create/sand-create.component';
import { SandEditComponent } from './sand/sand-edit/sand-edit.component';
import { StoneIndexComponent } from './stone/stone-index/stone-index.component';
import { StoneCreateComponent } from './stone/stone-create/stone-create.component';
import { StoneEditComponent } from './stone/stone-edit/stone-edit.component';
import { AreaIndexComponent } from './area/area-index/area-index.component';
import { AreaCreateComponent } from './area/area-create/area-create.component';
import { AreaEditComponent } from './area/area-edit/area-edit.component';
import {ProductIndexComponent} from './product/product-index/product-index.component'
import {ProductCreateComponent} from './product/product-create/product-create.component'
import {ProductEditComponent} from './product/product-edit/product-edit.component'
import {
  MixerIndexComponent,
  MixerCreateComponent,
  MixerEditComponent
} from './mixer';
import {
  PourTypeIndexComponent,
  PourTypeCreateComponent,
  PourTypeEditComponent
} from './pour-type';
import { OrdertypeIndexComponent } from './ordertype/ordertype-index/ordertype-index.component';
import { OrdertypeCreateComponent } from './ordertype/ordertype-create/ordertype-create.component';
import { OrdertypeEditComponent } from './ordertype/ordertype-edit/ordertype-edit.component'
import {
  DepartmentCreateComponent,
  DepartmentEditComponent,
  DepartmentIndexComponent
} from './department';
import {
  VehicleTypeCreateComponent,
  VehicleTypeIndexComponent,
  VehicleTypeEditComponent
} from './vehicle-type';
import {
    VehicleIndexComponent,
    VehicleEditComponent,
    VehicleCreateComponent
}from './vehicle'


@NgModule({
  declarations: [
    UnitEditComponent,
    UnitCreateComponent,
    UnitIndexComponent,
    CustomerIndexComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    ProviderIndexComponent,
    ProviderCreateComponent,
    ProviderEditComponent,
    WarehouseIndexComponent,
    WarehouseCreateComponent,
    WarehouseEditComponent,
    ItemTypeIndexComponent,
    ItemTypeCreateComponent,
    ItemTypeEditComponent,
    SandIndexComponent,
    SandCreateComponent,
    SandEditComponent,
    StoneIndexComponent,
    StoneCreateComponent,
    StoneEditComponent,
    AreaIndexComponent,
    AreaCreateComponent,
    AreaEditComponent,
    MixerIndexComponent,
    MixerCreateComponent,
    MixerEditComponent,
    PourTypeIndexComponent,
    PourTypeCreateComponent,
    PourTypeEditComponent,
    ProductIndexComponent,
    ProductCreateComponent,
    ProductEditComponent,
    OrdertypeIndexComponent,
    OrdertypeCreateComponent,
    OrdertypeEditComponent,
    DepartmentIndexComponent,
    DepartmentCreateComponent,
    DepartmentEditComponent,
    VehicleTypeIndexComponent,
    VehicleTypeCreateComponent,
    VehicleTypeEditComponent,
    VehicleIndexComponent,
    VehicleCreateComponent,
    VehicleEditComponent,
  ],
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
    MatCheckboxModule,
  ],
})
export class MasterDataModule {}
