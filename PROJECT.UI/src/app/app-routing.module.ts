import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { LayoutComponent } from 'src/app/@module/layout/layout.component';
import { AuthGuard } from 'src/app/guards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'Upload', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  {
    path: ':path',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./@module/layout/layout.module').then((m) => m.LayoutModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
