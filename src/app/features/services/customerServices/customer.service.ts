import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Observable } from 'rxjs';
import { stringFormat } from 'src/app/shared/utility/functions';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/app/models/customers';
import { HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(
    private httpService: HttpServiceService
  ) { }

  getAllCustomers(): Observable<Array<Customer>> {
    let params = stringFormat(environment.customer.get_customers);
    let url = environment.api.customers + params;
    return this.httpService.get<Array<Customer>>(url);
  }

  getContactsXDocument(document: string, state: number): Observable<any> {
    let params = stringFormat(environment.customer.get_contactsXDocument, document, state);
    let url = environment.api.customers + params;
    return this.httpService.get<any>(url);
  }

  getAddressesxDocument(document: string, state: number): Observable<any> {
    let params = stringFormat(environment.customer.get_addressesxDocument, document, state);
    let url = environment.api.customers + params;
    return this.httpService.get<any>(url);
  }

  getTradeNames(document: string){
    let params = stringFormat(environment.customer.get_tradenames, document);
    let url = environment.api.customers + params;
    return this.httpService.get<any>(url);
  }

  getMails(document: string){
    let params = stringFormat(environment.customer.get_mails, document);
    let url = environment.api.customers + params;
    return this.httpService.get<any>(url);
  }

  getCustomers(parameters: any): Observable<any> {
    let url = environment.api.customers + environment.customer.get_custromers_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getCustomerByDocument(document: string){
    let params = stringFormat(environment.customer.get_customers_by_document, document);
    let url = environment.api.customers + params;
    return this.httpService.get<any>(url);
  }

  getCustomerCreditEvaluationCollection(parameters: any): Observable<any>{
    let url = environment.api.customers + environment.customer.get_customer_credit_evaluation_collection;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getTradenameItems(parameters: any): Observable<any>{
    let url = environment.api.customers + environment.customer.get_tradename_rubro_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }
  getAllIdSumma(){
    let params = stringFormat(environment.customer.get_IdSumma);
    let url = environment.api.customers + params;
    return this.httpService.get<any>(url);
  }

  postTradenameItems(model: any): Observable<any>{
    let url = environment.api.customers + environment.customer.post_tradenamerubros;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpService.post<any>(url, model, httpOptions);
  }

  postTradenameItemApprove(model: any): Observable<any>{
    let url = environment.api.customers + environment.customer.post_tradenamerubros_approve;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpService.post<any>(url, model, httpOptions);
  }
}


