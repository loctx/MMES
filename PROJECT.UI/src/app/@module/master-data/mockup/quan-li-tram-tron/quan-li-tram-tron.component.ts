import { Component } from '@angular/core';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { CreateLanTronComponent } from '../create-lan-tron/create-lan-tron.component';
@Component({
  selector: 'app-quan-li-tram-tron',
  templateUrl: './quan-li-tram-tron.component.html',
  styleUrls: ['./quan-li-tram-tron.component.scss']
})
export class QuanLiTramTronComponent {
  constructor(
    private drawerService: DrawerService
  ) {}
  openCreate() {
    this.drawerService.open(CreateLanTronComponent).subscribe((result) => {
      
    });
  }
}
