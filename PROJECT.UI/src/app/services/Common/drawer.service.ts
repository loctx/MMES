import { Injectable, ComponentRef, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { DrawerComponent } from 'src/app/@module/components/drawer/drawer.component';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private drawerRef!: ComponentRef<DrawerComponent> | undefined;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  open(component: any) {
    if (!this.drawerRef) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DrawerComponent);
      this.drawerRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.drawerRef.hostView);
      document.body.appendChild(this.drawerRef.location.nativeElement);
    }

    const drawerComponent = this.drawerRef.instance;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.injector);
    drawerComponent.setContent(componentRef);
    setTimeout(() => {
      drawerComponent.openDrawer = true;
    }, 0);
  }

  close() {
    if (this.drawerRef) {
      const drawerComponent = this.drawerRef.instance;
      drawerComponent.openDrawer = false; // Set openDrawer to false
      this.drawerRef.destroy();
      this.drawerRef = undefined;
    }
  }
}
