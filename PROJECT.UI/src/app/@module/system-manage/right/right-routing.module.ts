import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RightListComponent } from './right-list/right-list.component';
import { RightEditComponent } from './right-edit/right-edit.component';
import { RightCreateComponent } from './right-create/right-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'List', pathMatch: 'full' },
  { path: 'List', component: RightListComponent },
  { path: 'Edit/:code', component: RightEditComponent },
  { path: 'Create', component: RightCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RightRoutingModule { }
