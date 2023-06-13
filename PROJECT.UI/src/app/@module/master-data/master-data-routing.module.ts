import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitComponent } from './unit/unit.component';
import { SaleOfficeComponent } from './sale-office/sale-office.component';
import { MaterialComponent } from './material/material.component';
import { PlantComponent } from './plant/plant.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { DischardComponent } from './dischard/dischard.component';
import { TransmodeComponent } from './transmode/transmode.component';
import { VendorComponent } from './vendor/vendor.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  { path: 'customer', component: CustomerComponent },
  { path: 'unit', component: UnitComponent },
  { path: 'sale-office', component: SaleOfficeComponent },
  { path: 'material', component: MaterialComponent },
  { path: 'plant', component: PlantComponent },
  { path: 'vehicle', component: VehicleComponent },
  { path: 'dischard', component: DischardComponent },
  { path: 'transmode', component: TransmodeComponent },
  { path: 'vendor', component: VendorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
