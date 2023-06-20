import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitIndexComponent } from './unit/unit-index/unit-index.component';
import { ProductIndexComponent } from './product/product-index/product-index.component';

const routes: Routes = [{ path: 'unit', component: UnitIndexComponent },
{path: 'san-pham' , component: ProductIndexComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDataRoutingModule {}
