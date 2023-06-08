import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/AD/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../../../../models/multidropdown'

@Component({
  selector: 'app-right-content',
  templateUrl: './right-content.component.html',
  styleUrls: ['./right-content.component.css'],
})
export class RightContentComponent {
  @Input() isOpenForm: Boolean = true;
  @Input() customerId: number = 0;
  @Input() isCreate: Boolean = true;
  @Output() closeForm = new EventEmitter<Boolean>();
  @Output() Save = new EventEmitter<Boolean>();

  stateChecked: boolean = true;
  CreateEditForm!: FormGroup;


  constructor(private _service: UserService, private http: HttpClient) {
    this.CreateEditForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      fullName: new FormControl(),
      password: new FormControl(),
      groupId: new FormControl(),
      state: new FormControl(),
      deviceId: new FormControl(),
      deviceIdDayUpdate: new FormControl(),
    });
  }
  get userName() {
    return this.CreateEditForm.get('userName');
  }
  submited: boolean = false;

  onSubmit() {
    this.submited = true;
    if (this.CreateEditForm.valid && this.isCreate === true) {
      this.CreateEditForm.get('state')?.setValue(this.stateChecked);
      // const httpOptions = {
      //   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      // };
      // this.http
      //   .post(
      //     'http://42.1.64.23:8089/api/account/register',
      //     this.CreateEditForm.value,
      //     httpOptions
      //   )
      //   .subscribe({
      //     next: (response: any) => {
      //       this.closeForm.emit(false);
      //     },
      //   });
      this._service
        .createUser(this.CreateEditForm.value)
        .subscribe({
          next: (response: any) => {
            this.closeForm.emit(false);
          },
        });
    }

    if (this.CreateEditForm.valid && this.isCreate === false) {
      this._service
        .Update(this.CreateEditForm.value)
        .subscribe((reAccountonse) => {
          this.closeForm.emit(false);
          this.Save.emit(true)
        });
    }
  }

  ngOnInit(): void {
   
    if (this.customerId && this.isCreate === false) {
      console.log(`sua form`)
      //Edit
      this._service.GetDetail(this.customerId).subscribe((response) => {
        (this.groupSelected = response.groupId.toString()),
          (this.stateChecked = response.state);

        this.CreateEditForm = new FormGroup({
          id: new FormControl(response.id),
          userName: new FormControl(response.userName),
          fullName: new FormControl(response.fullName),
          password: new FormControl(),
          groupId: new FormControl(response.groupId),
          state: new FormControl(response.state),
          deviceId: new FormControl(response.deviceId),
          deviceIdDayUpdate: new FormControl(response.deviceIdDayUpdate),

          createDay: new FormControl(response.createDay),
          createBy: new FormControl(response.createBy),
          updateDay: new FormControl(response.updateDay),
          updateBy: new FormControl(response.updateBy),
        });

        this._service.GetFull().subscribe((data) => {
          this.groupList = data;
        });
      });
    } else {
      console.log(`them form`)
      this._service.GetFull().subscribe((data) => {
        this.groupList = data;
      });
    }
  }

  radioChange(event: any) {
    this.CreateEditForm.get('state')?.setValue(event.value);
    this.stateChecked = event.value;
  }

  get groupId() {
    return this.CreateEditForm.get('groupId');
  }

  groupSelected: string = '';
  groupList: Item[] = [];

  onDropDownChange(item: Item): void {
    if (!item.checked) {
      this.groupSelected = '';
      this.CreateEditForm.get('groupId')?.setValue(0);
    } else {
      this.groupSelected = item.name;
      this.CreateEditForm.get('groupId')?.setValue(+item.name);
    }
  }

  openEdit(id: number) {
    this.isCreate = false;
    this.customerId = id;
    this.isOpenForm = true;
  }
}
