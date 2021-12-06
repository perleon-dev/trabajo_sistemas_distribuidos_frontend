import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { stringFormat } from 'src/app/shared/utility/functions';
import { UserData } from 'src/app/models/user/userData';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  userData: UserData;

  constructor(private httpService: HttpServiceService) { }

  getFileStreamById(s3Id) : Observable<any> {
    let params = stringFormat(environment.storage.get_file_url, s3Id);
    let url = environment.api.storage + params;
    return this.httpService.get<any>(url);
  }

  getLocalStorageUser(){
    this.userData = JSON.parse(localStorage.getItem('user'));
    return this.userData;
  }
}