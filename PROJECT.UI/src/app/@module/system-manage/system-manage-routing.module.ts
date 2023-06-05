import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryLoginComponent } from './history-login/history-login.component';
import { UserOnlineComponent } from './user-online/user-online.component';
import { SystemConfigComponent } from './system-config/system-config.component';

const routes: Routes = [
  { path: 'Users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }, 
  { path: 'Organize', loadChildren: () => import('./organize/organize.module').then(m => m.OrganizeModule) },
  { path: 'Language', loadChildren: () => import('./language/language.module').then(m => m.LanguageModule) },
  { path: 'Message', loadChildren: () => import('./message/message.module').then(m => m.MessageModule) },
  { path: 'HistoryLogin', component: HistoryLoginComponent},
  { path: 'UserOnline', component: UserOnlineComponent},
  { path: 'Right', loadChildren: () => import('./right/right.module').then(m => m.RightModule) },
  { path: 'SystemConfig', component: SystemConfigComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemManageRoutingModule { }
