import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { stringFormat } from 'src/app/shared/utility/functions';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpService: HttpServiceService) { }

  getCommercialExecutive(profile: number, state: string): Observable<any> {
    let params = stringFormat(environment.security.get_commercial_executive, profile, state);
    let url = environment.api.security + params;
    return this.httpService.get<any>(url);
  }
  
}