import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { cacheRedisUrl } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheredisService {
  private httpClient: HttpClient;

  constructor( handler: HttpBackend) { 
    this.httpClient = new HttpClient(handler);
 }

 httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
}

public get(sessionId: any): Observable<any> {
  return this.httpClient.get(`${cacheRedisUrl}persistance/${sessionId}`)
      .pipe(
          map((res: any) => { return res; }),
          catchError(this.handleError)
      );
};

public delete(sessionId: any): Observable<any> {
  return this.httpClient.delete(`${cacheRedisUrl}persistance/${sessionId}`, this.httpOptions)
      .pipe(
          map((res: any) => { return res; }),
          catchError(this.handleError)
      );
};

public put(sessionId: any, data: any): Observable<any> {
  return this.httpClient.put(`${cacheRedisUrl}persistance/${sessionId}`, JSON.stringify(data), this.httpOptions)
      .pipe(
          map((res: any) => { return res; }),
          catchError(this.handleError)
      );
};

private handleError(httpError: HttpErrorResponse) {
  return throwError(httpError)
};

}
