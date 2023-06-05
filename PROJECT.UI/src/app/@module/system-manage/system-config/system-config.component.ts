import { Component, OnInit } from '@angular/core';
import { T_AD_SYSTEM_CONFIG } from 'src/app/models/AD/T_AD_SYSTEM_CONFIG.model';
import { SystemConfigService } from 'src/app/services/AD/system-config.service';

@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html'
})
export class SystemConfigComponent implements OnInit {
  constructor(private _service : SystemConfigService){}

  systemConfig : T_AD_SYSTEM_CONFIG = {
    PKID: '',
    SAP_HOST: '',
    SAP_CLIENT: '',
    SAP_NUMBER: '',
    SAP_USER_NAME: '',
    SAP_PASSWORD: '',
    SAP_TIME_DIFF: 0,
    TGBX_URL: '',
    TGBX_USER_NAME: '',
    TGBX_PASSWORD: '',
    TGBX_TIME_DIFF: 0,
    TGBX_API_URL: '',
    TGBX_API_USER_NAME: '',
    TGBX_API_PASSWORD: '',
    SMO_API_USER_NAME: '',
    SMO_API_PASSWORD: '',
    SMO_API_LINK_SMO: '',
    SMS_WEBSERVICE: '',
    SMS_APP: '',
    SMS_PASSWORD: '',
    SMS_BRAND_NAME: '',
    MAIL_SMTPHOST: '',
    MAIL_USER: '',
    MAIL_PASSWORD: '',
    MAIL_PORT: 0,
    JOB_STATUS_SAP: 0,
    JOB_STATUS_TGBX: 0,
    JOB_SEND_EMAIL: 0,
    JOB_SEND_SMS: 0,
    XTTD_TIME_DIFF: 0,
    LAST_SYN_VEHICLE: new Date(),
    EGAS_WEBSERVICE: '',
    EGAS_USER_NAME: '',
    EGAS_PASSWORD: '',
    SMO_KV2_API_LINK: '',
    SMO_KV2_API_USER_NAME: '',
    SMO_KV2_API_PASSWORD: '',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  ngOnInit(): void {
    this._service.getSystemConfig()
    .subscribe({
      next:(response) =>{
        this.systemConfig = response.Data[0];
      },
      error:(response) =>{
        console.log(response)
      },
    })
  }

  updateSystemConfig(){
    this._service.updateSystemConfig(this.systemConfig).subscribe({next:(e)=> console.log(e)})
  }
}
