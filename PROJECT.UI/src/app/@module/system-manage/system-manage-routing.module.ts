import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountGroupIndexComponent } from '../system-manage/account-group/account-group-index/account-group-index.component';

const routes: Routes = [
  { path: 'phan-quyen', component: AccountGroupIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemManageRoutingModule {}
