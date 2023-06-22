import { Routes } from '@angular/router';

export const LayoutRoutes: Routes = [
  {
    path: 'system-manage',
    loadChildren: () =>
      import('../system-manage/system-manage.module').then(
        (m) => m.SystemManageModule
      ),
  },
  {
    path: 'master-data',
    loadChildren: () =>
      import('../master-data/master-data.module').then(
        (m) => m.MasterDataModule
      ),
  },
  {
    path: 'sale-orders',
    loadChildren: () =>
      import('../sale-orders/sale-orders.module').then(
        (m) => m.SaleOrdersModule
      ),
  },
];
