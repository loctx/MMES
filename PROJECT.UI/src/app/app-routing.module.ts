import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'Upload', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent},
  { path: 'SystemManage', loadChildren: () => import('./@module/system-manage/system-manage.module').then(m => m.SystemManageModule) },
  { path: 'MasterData', loadChildren: () => import('./@module/master-data/master-data.module').then(m => m.MasterDataModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
