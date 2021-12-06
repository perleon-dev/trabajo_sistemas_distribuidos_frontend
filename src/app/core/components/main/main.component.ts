import { Component, ViewChild, TemplateRef } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { CacheredisService } from 'src/app/shared/services/cacheredis.service';
import { appAdvanceNet, keyAdvanceAngularContracts, keyAdvanceAngularBilling, appAdvanceAngularBilling } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-layout-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class LayoutMainComponent {
  isCollapsed = false
  menu = [];
  user_name = '';
  @ViewChild('other_opcion') other_opcion: TemplateRef<any>;
  @ViewChild('other_module') other_module: TemplateRef<any>;
  @ViewChild('other_page') other_page: TemplateRef<any>;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private cacheRedisService: CacheredisService
  ) { }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed
  }

  public onSetMenu(menu) {
    this.menu = menu;
  }

  async ngAfterContentInit() {
    var data = localStorage.getItem('menu');
    var user = localStorage.getItem('user');

    if (data !== null && data !== undefined) {
      this.menu = JSON.parse(data);
      this.user_name = JSON.parse(user).user_name;
    }
  }

  onClickPage(page) {
    var sessionId = localStorage.getItem('sessionId');
    if (page.icon.match(keyAdvanceAngularContracts))
      this.router.navigate([`${page.route}`]);
    else if (page.icon.match(keyAdvanceAngularBilling))
      window.location.href = appAdvanceAngularBilling + "receive/" + sessionId + "/" + page.menuId;
    else if (page.route !== '#' && page.route !== '')
      window.location.href = page.route;
  }

  logout(): void {
    var sessionId = localStorage.getItem('sessionId');
    this.cacheRedisService.delete(sessionId).subscribe(async (identity) => {
      localStorage.clear();
      window.location.href = appAdvanceNet + 'Login/frmLogin.aspx';
    },
      (error: HttpErrorResponse) => {
        console.error(error);
        window.location.href = appAdvanceNet + 'Login/frmLogin.aspx';
      }
    );
  }
}
