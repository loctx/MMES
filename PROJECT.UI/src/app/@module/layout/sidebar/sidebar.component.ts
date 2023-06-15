import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/AD/user.service';
import {NavigationEnd} from '@angular/router';
import {GlobalService} from 'src/app/services/Common/global.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  ROUTE_DATA: any = [];
  opened: boolean;
  show: boolean;
  urlAvartar: string = '';
  currentRoute: string = '';
  elem: any;
  loading: boolean = false;
  dataSource:any = []
  username: string = '';
  dataRouter: string[] = [];
  constructor(
    private router: Router,
    private userService: UserService,
    public translate: TranslateService, private globalService: GlobalService
  ) {
    this.opened = true;
    this.show = true;
    const UserInfo = this.globalService.getUserInfo();
    this.username = UserInfo?.accountInfo?.UserName;
    this.globalService.rightSubject.subscribe((item) => {
      this.loadInit();
    });
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
    this.globalService.toggleSidebarSubject.subscribe((value) => {
      this.show = value
    });
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.url;
        if (UserInfo == null) {
          if (this.currentRoute.includes('xhxb-full-screen') || this.currentRoute.includes('dh-full-screen')) {
            return;
          } else {
            //this.router.navigate(['/Login']);
          }
        }
      }
    });
  }

  loadInit() {
    try {
      if (this.username) {
        this.userService.getMenuOfUser(this.username).subscribe(({Data}:any) => {
          this.ROUTE_DATA = Data?.Children;
          const flatten = (Children:any, getChildren:any, level?:any, parent?:any) => Array.prototype.concat.apply(
            Children.map((x:any) => ({ ...x, level: level || 1, parent: parent || null })), 
            Children.map((x:any) => flatten(getChildren(x) || [], getChildren, (level || 1) + 1, x.id))
          );
          const extractChildren = (x:any) => x.Children;

          this.dataRouter = Data?.Children.reduce((result:any, item:any) => {
            return [
              ...result,
              ...flatten(extractChildren(item) || [], extractChildren).map(x => delete x.Children && x)
            ]
          }, []).map((element:any) => `/Home/${element.url}`);
          this.categoryParent();
        });
      }
    } catch (e) {
      console.log('e: ', e);
    }
  }

  ngAfterViewInit() {
    this.loadInit();
  }

  ngOnInit(): void {
    this.globalService.getLoading().subscribe((value) => {
      this.loading = value;
    });
  }

  reload() {
    location.reload();
  }

  openUrl(url: string) {
    this.router.navigate(['/Home/' + url]);
  }

  categoryParent() {
    var userInfo = this.globalService.getUserInfo();
    var listRole = userInfo.listRole || [];
    var menu: any = [];

    for (let j = 0; j < this.ROUTE_DATA.length; j++) {
      if (!this.ROUTE_DATA[j]['roles'] || this.intersectArray(this.ROUTE_DATA[j]['roles'], listRole) > -1) {
        var item: any = {};
        item['name'] = this.ROUTE_DATA[j]['Name'];
        item['icon'] = this.ROUTE_DATA[j]['Icon'];
        item['url'] = this.ROUTE_DATA[j]['Url'];

        if (this.ROUTE_DATA[j]['Children'] && this.ROUTE_DATA[j]['Children']?.length > 0) {
          item['children'] = this.categoryChild(listRole, this.ROUTE_DATA[j]['Children']);
        } else {
          item['url'] = this.ROUTE_DATA[j]['Url'];
        }
        menu.push(item);
      }
    }
    this.dataSource = menu;
  }

  // kiem tra xem list role cua user va list role cua menu/submenu co chung role khong
  intersectArray(arr1: any, arr2: any) {
    //arr1.sort();
    //arr2.sort();
    for (var i = 0; i < arr1.length; i += 1) {
      if (arr2.indexOf(arr1[i]) > -1) {
        return 1;
      }
    }
    return -1;
  }

  categoryChild(listRole: any, subRoute: any) {
    var subMenu: any = [];
    for (let i = 0; i < subRoute.length; i++) {
      if (!subRoute[i]['roles'] || this.intersectArray(subRoute[i]['roles'], listRole) > -1) {
        var subItem: any = {};
        subItem['name'] = subRoute[i]['Name'];
        if (subRoute[i]['Children'] && subRoute[i]['Children']?.length > 0) {
          subItem['children'] = this.categoryChild(listRole, subRoute[i]['Children']);
        } else {
          subItem['url'] = subRoute[i]['Url'];
        }
        subMenu.push(subItem);
      }
    }
    return subMenu;
  }
}
