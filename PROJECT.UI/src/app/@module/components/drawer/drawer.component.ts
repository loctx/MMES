import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {
  openDrawer:boolean = false;
  @ViewChild('contentContainer', { read: ViewContainerRef, static: true }) contentContainer!: ViewContainerRef;

  setContent(componentRef: ComponentRef<any>) {
    this.contentContainer.clear();
    this.contentContainer.insert(componentRef.hostView);
  }

  close() {
    this.openDrawer = false;
  }
}
