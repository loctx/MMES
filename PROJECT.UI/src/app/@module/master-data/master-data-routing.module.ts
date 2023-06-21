import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitIndexComponent } from './unit/unit-index/unit-index.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'unit', component: UnitIndexComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDataRoutingModule {}
