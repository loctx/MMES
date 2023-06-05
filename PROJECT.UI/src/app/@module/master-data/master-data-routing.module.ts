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

const routes: Routes = [
  { path: 'Unit', component: UnitComponent },
  { path: 'SaleOffice', component: SaleOfficeComponent },
  { path: 'Material', component: MaterialComponent },
  { path: 'Plant', component: PlantComponent },
  { path: 'Vehicle', component: VehicleComponent },
  { path: 'Dischard', component: DischardComponent },
  { path: 'Transmode', component: TransmodeComponent },
  { path: 'Vendor', component: VendorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
