import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { IdentityService } from '../services/identity.service';
import { CacheredisService } from '../services/cacheredis.service';

@Injectable()
export class IdenitityInterceptor implements HttpInterceptor {

    constructor(
        private identityService: IdentityService,
        private cacheRedisService: CacheredisService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.expiredToken())
            return from(this.handleRefreshToken(request, next));

        var identity = JSON.parse(localStorage.getItem('identity'));
        request = this.addToken(request, identity.access_token);
        return next.handle(request);
    }

    private async handleRefreshToken(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        const sessionId = localStorage.getItem('sessionId');
        const identityLocalStorage = JSON.parse(localStorage.getItem('identity'));
        const redis = await this.cacheRedisService.get(sessionId).toPromise();

        if (identityLocalStorage.access_token === redis.access_token) {
            const identity = await this.identityService.refreshToken().toPromise();
            const setIdentity = this.setIdentity(identity.body);
            await this.cacheRedisService.put(sessionId, setIdentity).toPromise();
            request = this.addToken(request, setIdentity.access_token);
        }
        else {
            if (this.expiredToken(parseFloat(redis.date_expires_number))) {
                const identity = await this.identityService.refreshToken().toPromise();
                const setIdentity = this.setIdentity(identity.body);
                await this.cacheRedisService.put(sessionId, setIdentity).toPromise();
                request = this.addToken(request, setIdentity.access_token);
            }
            else
            {
                this.setIdentity(redis);
                request = this.addToken(request, redis.access_token);
            }
        }

        return next.handle(request).toPromise();
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    private expiredToken(date_expires_number?: any) {
        try {
            var currentDateNumber = this.fetchCurrentDateNumber();
            if (date_expires_number === undefined) {
                var identity = localStorage.getItem('identity');
                if (identity === null)
                    return true;

                if (currentDateNumber >= parseFloat(JSON.parse(identity).date_expires_number))
                    return true;
            }
            else {
                if (currentDateNumber >= parseFloat(date_expires_number))
                    return true;
                else
                    return false
            }
            return false;
        } catch (error) {
            return true;
        }
    };

    private fetchCurrentDateNumber() {
        var date = new Date();
        var yyyy = date.getFullYear();
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var dd = String(date.getDate()).padStart(2, '0');
        var hours = String(date.getHours()).padStart(2, '0');
        var minutes = String(date.getMinutes()).padStart(2, '0');
        return parseInt(yyyy + mm + dd + hours + minutes);
    };

    private setIdentity(response: any) {
        var identity = JSON.parse(localStorage.getItem('identity'));
        identity.access_token = response.access_token;
        identity.expires_in = parseInt(response.expires_in);
        identity.token_type = response.token_type;
        identity.refresh_token = response.refresh_token;
        identity.date_expires_number = this.fecthDateExpiresNumber(identity.expires_in - 60);
        localStorage.setItem('identity', JSON.stringify(identity));
        return identity;
    }

    private fecthDateExpiresNumber(expiresIn: number) {
        var currentDate = new Date();
        currentDate.setSeconds(currentDate.getSeconds() + expiresIn);
        var yyyy = currentDate.getFullYear();
        var mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var dd = String(currentDate.getDate()).padStart(2, '0');
        var hours = String(currentDate.getHours()).padStart(2, '0');
        var minutes = String(currentDate.getMinutes()).padStart(2, '0');
        return parseInt(yyyy + mm + dd + hours + minutes);
    }
}
