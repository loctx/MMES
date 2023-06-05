import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { T_AD_RIGHT } from 'src/app/models/AD/T_AD_RIGHT.model';
import { RightService } from 'src/app/services/AD/right.service';

@Component({
  selector: 'app-right-create',
  templateUrl: './right-create.component.html'
})
export class RightCreateComponent {
  constructor(private router: Router, private _service: RightService){}
  itemCreate: T_AD_RIGHT = {
    CODE: '',
    PARENT: '',
    NAME: '',
    C_ORDER: 0,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  createRight() {
    this._service.createRight(this.itemCreate)
      .subscribe({
        next: (response) => {
          this.router.navigate(['SystemManage/Right/List'])
        }
      })
  }
}
