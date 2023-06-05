import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { T_AD_ORGANIZE } from 'src/app/models/AD/T_AD_ORGANIZE.model';
import { OrganizeService } from 'src/app/services/AD/organize.service';

@Component({
  selector: 'app-organize-create',
  templateUrl: './organize-create.component.html'
})
export class OrganizeCreateComponent {
  constructor(private router: Router, private _service: OrganizeService){}
  itemCreate: T_AD_ORGANIZE = {
    COMPANY_CODE: '',
    PARENT_CODE: '',
    NAME: '',
    TYPE: '',
    C_ORDER: 0,
    PLANT_CODE: '',
    EMAIL: '',
    PHONE: '',
    PROJECT: '',
    IS_SEND_TO_SAP_IMMEDIATE: false,
    IS_DCNB_AFTER: false,
    IS_DCNB_BEFORE: false,
    USER_EGAS: '',
    PASS_EGAS: '',
    LUONG_CANH_BAO: 0,
    IS_CANH_BAO_GAN_NGAN: false,
    LUONG_TON_KHO_MIN: 0,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  createOrganize() {
    this._service.createOrganize(this.itemCreate)
      .subscribe({
        next: (response) => {
          this.router.navigate(['SystemManage/Organize/List'])
        }
      })
  }
}
