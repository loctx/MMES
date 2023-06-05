import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { T_AD_ORGANIZE } from 'src/app/models/AD/T_AD_ORGANIZE.model';
import { OrganizeService } from 'src/app/services/AD/organize.service';

@Component({
  selector: 'app-organize-edit',
  templateUrl: './organize-edit.component.html'
})
export class OrganizeEditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private _service: OrganizeService) { }
  itemDetail: T_AD_ORGANIZE = {
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
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('code');
        if (id) {
          this._service.getDetailOrganize(id)
            .subscribe({
              next: (response) => { this.itemDetail = response.Data; },
              error: (response) => { console.log(response); }
            });
        }
      }
    })
  }
  updateOrganize() {
    this._service.updateOrganize(this.itemDetail)
      .subscribe({
        next: (response) => {
          this.router.navigate(['SystemManage/Organize/List'])
        }
      })
  }
}
