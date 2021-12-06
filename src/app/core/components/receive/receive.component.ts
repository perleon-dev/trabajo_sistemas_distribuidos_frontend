import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheredisService } from 'src/app/shared/services/cacheredis.service';
import { appAdvanceNet } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { LayoutMainComponent } from '../main/main.component';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { constants } from 'src/app/shared/utility/constants';

@Component({
    selector: 'app-receive',
    templateUrl: './receive.component.html',
    styleUrls: ['./receive.component.scss']
})
export class ReceiveComponent {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cacheRedisService: CacheredisService
    ) { 

    }

    sessionId = '';
    pageId = '';
    contractId = '';
    templateId = '';
    templateTypeId = '';
    screen = '';
    documentNumber= '';
    process = 0;

    completeMenu(menu: any) {
        var sessionId = localStorage.getItem('sessionId');
        var route = appAdvanceNet + 'Receive.aspx?sessionId=' + sessionId + '&pageId=';
        for (let item of menu.filter(item => { return item.route.match('.aspx'); })) {
            item.route = route + item.menuId;
        }

        for (let item of menu) {
            for (let page of item.child.filter(item => { return item.route.match('.aspx'); })) {
                page.route = route + page.menuId;
            }
        }

        for (let item of menu) {
            for (let module of item.child) {
                for (let page of module.child.filter(item => { return item.route.match('.aspx'); })) {
                    page.route = route + page.menuId;
                }
            }
        }

        for (let item1 of menu) {
            for (let item2 of item1.child) {
                for (let item3 of item2.child) {
                    for (let item4 of item3.child.filter(item => { return item.route.match('.aspx'); })) {
                        item4.route = route + item4.menuId;
                    }
                }
            }
        }

        return menu;
    }

    fetchPageById(menu: any, pageId: string) {
        for (let item of menu.filter(item => { return item.menuId === pageId; })) {
            return item;
        }

        for (let item of menu) {
            for (let page of item.child.filter(item => { return item.menuId === pageId; })) {
                return page;
            }
        }

        for (let item of menu) {
            for (let module of item.child) {
                for (let page of module.child.filter(item => { return item.menuId === pageId; })) {
                    return page;
                }
            }
        }

        for (let item1 of menu) {
            for (let item2 of item1.child) {
                for (let item3 of item2.child) {
                    for (let page of item3.child.filter(item => { return item.menuId === pageId; })) {
                        return page;
                    }
                }
            }
        }
    }

    async ngAfterContentInit() {
        
        this.route.paramMap.subscribe(params => {
            this.sessionId = params.get('sessionId');
            this.pageId = params.get('pageId');
            if(Number(this.pageId) === constants.MENU_WITH_PARAMETER.TEMPLATE_ADDENDUM){
                this.contractId = params.get('contractId');
                this.templateId = params.get('templateId');
                this.templateTypeId = params.get('templateTypeId');
                this.documentNumber = params.get('documentNumber');
                this.process = Number(params.get('process'));
            }

            if(Number(this.pageId) === constants.MENU_WITH_PARAMETER.CONTRACT_TEMPLATE_DETAIL){
                this.templateId = params.get('templateId');
                this.templateTypeId = params.get('templateTypeId');
                this.screen = params.get('screen');
            }
            
            if(Number(this.pageId) === constants.MENU_WITH_PARAMETER.VISA_GUARANTEE_DETAIL){
                this.templateId = params.get('templateId');
                this.templateTypeId = params.get('templateTypeId');
            }
        });
 
        var sessionIdLocalStorage = localStorage.getItem('sessionId');
        if (this.sessionId !== sessionIdLocalStorage) {
            localStorage.clear();
            this.cacheRedisService.get(this.sessionId).subscribe(async (identity) => {
                var menu = await this.cacheRedisService.get(identity.menu_key).toPromise();
                var user = await this.cacheRedisService.get(identity.user_key).toPromise();
                menu = this.completeMenu(menu);
                localStorage.setItem('sessionId', this.sessionId);
                localStorage.setItem('identity', JSON.stringify(identity));
                localStorage.setItem('menu', JSON.stringify(menu));
                localStorage.setItem('user', JSON.stringify(user));
                
                var page = this.fetchPageById(menu, this.pageId);
                if(page === null || page === undefined)
                    this.setMenuWithParameter(this.pageId);
                else
                    this.router.navigate([`${page.route}`]);
            },
                (error: HttpErrorResponse) => {
                    window.location.href = appAdvanceNet + 'Login/frmLogin.aspx';
                }
            );
        }
        else {
            var menu = JSON.parse(localStorage.getItem('menu'));
            var page = this.fetchPageById(menu, this.pageId);
            if(page === null || page === undefined)
                this.setMenuWithParameter(this.pageId);
            else
                this.router.navigate([`${page.route}`]);
        };
    }

    setMenuWithParameter(pageId: any){
        
        if(Number(pageId) === constants.MENU_WITH_PARAMETER.TEMPLATE_ADDENDUM){
            let route = constants.ROUTES.ADDENDUM_TEMPLATE + "/" + this.contractId + "/" + this.templateId + "/" + this.templateTypeId + "/" + this.documentNumber + "/" + this.process;
            this.router.navigate([`${route}`]);
        }

        if(Number(pageId) === constants.MENU_WITH_PARAMETER.CONTRACT_TEMPLATE_DETAIL){
            let route = constants.ROUTES.CONTRACT_TEMPLATE_DETAIL + "/" + this.templateId + "/" + this.templateTypeId + "/" + this.screen + "/0";
            this.router.navigate([`${route}`]);
        }

        if(Number(pageId) === constants.MENU_WITH_PARAMETER.VISA_GUARANTEE_DETAIL){
            let route = constants.ROUTES.VISA_GUARANTEE_DETAIL + "/" + this.templateId + "/" + this.templateTypeId;
            this.router.navigate([`${route}`]);
        }
        
    }

}
