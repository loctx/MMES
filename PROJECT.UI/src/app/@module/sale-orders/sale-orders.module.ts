import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleOrderRoutingModule } from './sale-orders-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../share.modules';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { OrderIndexComponent } from './order-index/order-index.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderEditComponent } from './order-edit/order-edit.component';

@NgModule({
  declarations: [
    OrderIndexComponent,
    OrderCreateComponent,
    OrderEditComponent
  ],
  imports: [
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    MatTreeModule,
    MatTableModule,
    SharedModule,
    CommonModule,
    SaleOrderRoutingModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    NgSelectModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class SaleOrdersModule {}
