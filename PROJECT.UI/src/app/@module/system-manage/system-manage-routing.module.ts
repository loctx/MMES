import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountGroupIndexComponent } from '../system-manage/account-group/account-group-index/account-group-index.component';
import { AccountIndexComponent } from './account/account-index/account-index.component';
import { ModuleIndexComponent } from './module/module-index/module-index.component';

const routes: Routes = [
  { path: 'phan-quyen', component: AccountGroupIndexComponent },
  { path: 'account', component: AccountIndexComponent },
  { path: 'account-group', component: AccountGroupIndexComponent },
  { path: 'module', component: ModuleIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemManageRoutingModule {}
