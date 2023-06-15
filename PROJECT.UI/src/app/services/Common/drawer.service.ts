import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  ComponentRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { DrawerComponent } from 'src/app/@module/components/drawer/drawer.component';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private drawerRef!: ComponentRef<DrawerComponent> | undefined;
  private resultSubject: Subject<any> = new Subject<any>();
  private data: any = {};

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open(component: any) {
    if (!this.drawerRef) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(DrawerComponent);
      this.drawerRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.drawerRef.hostView);
      document.body.appendChild(this.drawerRef.location.nativeElement);
    }

    const drawerComponent = this.drawerRef.instance;
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.injector);
    const instance = componentRef.instance as any;
    if (instance) {
      Object.keys(this.data).forEach((key) => {
        instance[key] = this.data[key];
      });
    }
    drawerComponent.setContent(componentRef);
    setTimeout(() => {
      drawerComponent.openDrawer = true;
    }, 0);

    return this.resultSubject.asObservable();
  }

  close() {
    if (this.drawerRef) {
      const drawerComponent = this.drawerRef.instance;
      drawerComponent.openDrawer = false;
      setTimeout(() => {
        this.drawerRef?.destroy();
        this.drawerRef = undefined;
      }, 600);
    }
  }

  setData(data: any) {
    this.data = data;
  }

  returnData(data?: any) {
    this.resultSubject.next(data); // Truyền dữ liệu từ DrawerService về ComponentA
  }
}
