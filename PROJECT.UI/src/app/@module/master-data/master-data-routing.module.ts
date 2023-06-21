import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitIndexComponent } from './unit/unit-index/unit-index.component';
import { CustomerIndexComponent } from './customer/customer-index/customer-index.component';
import {ProviderIndexComponent} from './provider/provider-index/provider-index.component'
import {WarehouseIndexComponent} from './warehouse/warehouse-index/warehouse-index.component'
import {ItemTypeIndexComponent} from './item-type/item-type-index/item-type-index.component'
import {SandIndexComponent} from './sand/sand-index/sand-index.component'
import {StoneIndexComponent} from './stone/stone-index/stone-index.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import {AreaIndexComponent} from './area/area-index/area-index.component'

const routes: Routes = [
  { path: 'unit', component: UnitIndexComponent },
  { path: 'khach-hang', component: CustomerIndexComponent },
  { path: 'nha-cung-cap', component: ProviderIndexComponent },
  { path: 'kho-hang', component: WarehouseIndexComponent },
  { path: 'loai-hang', component: ItemTypeIndexComponent },
  { path: 'loai-cat', component: SandIndexComponent },
  { path: 'loai-da', component: StoneIndexComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'khu-vuc', component: AreaIndexComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDataRoutingModule {}
