import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitListComponent } from './unit/unit-list/unit-list.component';

const routes: Routes = [{ path: 'unit', component: UnitListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDataRoutingModule {}
