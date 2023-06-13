import {
  Component,
  OnInit,
} from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { TranslateCacheService } from 'ngx-translate-cache';
import {GlobalService} from 'src/app/services/Common/global.service';

@Component({
  selector: "navbar-cmp",
  templateUrl: "navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  dataUser = JSON.parse(localStorage.getItem('user') || '{}');
  lstRight = JSON.parse(localStorage.getItem('lstRight') || '{}') 
  lang = localStorage.getItem('lang');
  token = localStorage.getItem("jwt");
  constructor(public translate: TranslateService, translateCache: TranslateCacheService,  private globalService: GlobalService){
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
    translateCache.init();
  }
  ngOnInit(): void {
    
  }

  sidebarToggle() {
    this.globalService.setToggleSidebar(!this.globalService.toggleSidebar);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.lang = localStorage.getItem('lang');
  }

  logOut(){
    localStorage.clear();
    window.location.reload();
  }
}
