import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { T_AD_RIGHT } from 'src/app/models/AD/T_AD_RIGHT.model';
import { RightService } from 'src/app/services/AD/right.service';

@Component({
  selector: 'app-right-edit',
  templateUrl: './right-edit.component.html'
})
export class RightEditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private _service: RightService) { }
  itemDetail: T_AD_RIGHT = {
    CODE: '',
    PARENT: '',
    NAME: '',
    C_ORDER: 0,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        console.log(params)
        const id = params.get('code');
        if (id) {
          this._service.getDetailRight(id)
            .subscribe({
              next: (response) => { this.itemDetail = response.Data; },
              error: (response) => { console.log(response); }
            });
        }
      }
    })
  }
  updateRight() {
    this._service.updateRight(this.itemDetail)
      .subscribe({
        next: (response) => {
          this.router.navigate(['SystemManage/Right/List'])
        }
      })
  }
}
