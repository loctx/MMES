import { Component } from '@angular/core';
import { DrawerService } from 'src/app/services/Common/drawer.service';

@Component({
  selector: 'app-create-lan-tron',
  templateUrl: './create-lan-tron.component.html',
  styleUrls: ['./create-lan-tron.component.scss']
})
export class CreateLanTronComponent {
  constructor(
    private drawerService: DrawerService
  ) {
  }
  close() {
    this.drawerService.close();
  }
}
