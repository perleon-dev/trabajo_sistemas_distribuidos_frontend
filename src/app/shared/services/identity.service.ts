import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { identityType, identityClientId, identityClientSecret, identityUrl } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private httpClient: HttpClient;

  constructor( handler: HttpBackend) { 
     this.httpClient = new HttpClient(handler);
  }

  public refreshToken(): Observable<any> {
    const refeshToken = JSON.parse(localStorage.getItem('identity')).refresh_token

    const body = new HttpParams()
        .set('grant_type', identityType)
        .set('refresh_token', refeshToken)
        .set('client_id', identityClientId)
        .set('client_secret', identityClientSecret);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.httpClient.post(identityUrl, body, { headers, observe: 'response' })
        .pipe(
            map((res: any) => { return res; }),
            catchError(this.handleError)
        );
};

private handleError(httpError: HttpErrorResponse) {
    return throwError(httpError)
};
}
