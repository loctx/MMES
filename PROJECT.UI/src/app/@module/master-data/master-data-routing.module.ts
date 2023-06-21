import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitIndexComponent } from './unit/unit-index/unit-index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import  {DanhSachDonHangComponent} from "./mockup/danh-sach-don-hang/danh-sach-don-hang.component"
import  {QuanLiTramTronComponent} from "./mockup/quan-li-tram-tron/quan-li-tram-tron.component"
import { ChamSocKhachHangComponent } from './mockup/cham-soc-khach-hang/cham-soc-khach-hang.component';
const routes: Routes = [
  { path: 'unit', component: UnitIndexComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'danh-sach-don-hang', component: DanhSachDonHangComponent },
  { path: 'quan-li-tram-tron', component: QuanLiTramTronComponent },
  { path: 'cham-soc-khach-hang', component: ChamSocKhachHangComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDataRoutingModule {}
