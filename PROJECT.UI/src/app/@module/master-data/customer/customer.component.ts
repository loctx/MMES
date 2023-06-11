import { Component } from '@angular/core';
import { UnitFilter } from 'src/app/@filter/MD/unit-filter.model';
import { T_MD_UNIT } from 'src/app/models/MD/T_MD_UNIT.model';
import { UnitService } from 'src/app/services/MD/unit.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  breadcrumbList: any[] = [
    {
      name: "Home",
      path: ""
    },
    {
      name: "Khách Hàng",
      path: "/master-data/customr"
    }
  ];
  constructor(private _service: UnitService) { }
}
