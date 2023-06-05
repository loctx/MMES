import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RightRoutingModule } from './right-routing.module';
import { RightListComponent } from './right-list/right-list.component';
import { RightEditComponent } from './right-edit/right-edit.component';
import { RightCreateComponent } from './right-create/right-create.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { LanguageRoutingModule } from '../language/language-routing.module';


@NgModule({
  declarations: [
  
    RightListComponent,
       RightEditComponent,
       RightCreateComponent
  ],
  imports: [
    CommonModule,
    RightRoutingModule,
    LanguageRoutingModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    NgSelectModule,
    TranslateModule
  ]
})
export class RightModule { }
