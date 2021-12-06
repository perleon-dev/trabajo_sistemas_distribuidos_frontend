import { Injectable } from '@angular/core'
import {
  CanActivate
} from '@angular/router'
import { appAdvanceNet } from 'src/environments/environment';
import { CacheredisService } from 'src/app/shared/services/cacheredis.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private cacheRedisService: CacheredisService) { }

  async canActivate() {
    var sessionId = localStorage.getItem('sessionId');

    if (sessionId === null || sessionId === undefined) {
        localStorage.clear();
        window.location.href = appAdvanceNet + 'Login/frmLogin.aspx';
        return false;
    }

    var response = await this.cacheRedisService.get(sessionId).toPromise()
        .then((response) => {
            return response;
        }).catch((error) => {
            return undefined;
        });;

    if (response === undefined) {
        localStorage.clear();
        window.location.href = appAdvanceNet + 'Login/frmLogin.aspx';
        return false;
    }
    else {
        localStorage.setItem('identity', JSON.stringify(response));
        return true;
    }
}
}
