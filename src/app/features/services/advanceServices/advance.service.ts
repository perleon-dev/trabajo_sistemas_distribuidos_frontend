import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { stringFormat } from 'src/app/shared/utility/functions';
import { ParameterDetail } from 'src/app/models/parameterDetails';
import { Provinces } from 'src/app/models/provinces';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdvanceService {

  constructor(private httpService: HttpServiceService) { }

  getParameterDetail(param: any): Observable<Array<ParameterDetail>> {
    let params = stringFormat(environment.advance.get_parameter_detail, param);
    let url = environment.api.advance + params;
    return this.httpService.get<Array<ParameterDetail>>(url);
  }

  getParameterDetailTemplate(param: any, param2: any): Observable<any> {
    let params = stringFormat(environment.advance.get_parameter_detail_template, param, param2);
    let url = environment.api.advance + params;
    return this.httpService.get<any>(url);
  }

  getProvinces(idDepartment: string): Observable<Array<Provinces>> {
    let params = stringFormat(environment.advance.get_provinces, idDepartment);
    let url = environment.api.advance + params;
    return this.httpService.get<Array<Provinces>>(url);
  }

  getDistricts(idProvince: string): Observable<any> {
    let params = stringFormat(environment.advance.get_districts, idProvince);
    let url = environment.api.advance + params;
    return this.httpService.get<any>(url);
  }

  getTradeNames(): Observable<any> {
    let url = environment.api.advance + environment.advance.get_tradenames;
    return this.httpService.get<any>(url);
  }
  
  getStateWorkFlow(stateId: number): Observable<any> {
    let params = stringFormat(environment.advance.get_state_workflow, stateId);
    let url = environment.api.advance + params;
    return this.httpService.get<any>(url);
  }

  getStateWorkFlowTemplate(entities: string): Observable<any> {
    let params = stringFormat(environment.advance.get_state_workflow_template, entities);
    let url = environment.api.advance + params;
    return this.httpService.get<any>(url);
  }

  getCurrencies(currencyId: number): Observable<Array<any>> {
    let params = stringFormat(environment.advance.get_currencys, currencyId);
    let url = environment.api.advance + params;
    return this.httpService.get<Array<any>>(url);
  }
  
  getMalls(): Observable<any> {
    let url = environment.api.advance + environment.advance.get_malls;
    return this.httpService.get<any>(url);
  }

  getLocals(mallId: number): Observable<any> {
    let params = stringFormat(environment.advance.get_locals, mallId);
    let url = environment.api.advance + params;
    return this.httpService.get<any>(url);
  }

  getConcept(parameters: any): Observable<any> {
    let url = environment.api.advance + environment.advance.get_concept;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getLocal(parameters: any): Observable<any>{
    let url = environment.api.advance + environment.advance.get_local_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getLocalCurrentSituation(parameters: any): Observable<any>{
    let url = environment.api.advance + environment.advance.get_local_current_situation;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getLocalTypes(parameters: any): Observable<any>{
    let url = environment.api.advance + environment.advance.get_local_types;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getItem(parameters: any): Observable<any>{
    let url = environment.api.advance + environment.advance.get_item_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getSubItem(parameters: any): Observable<any>{
    let url = environment.api.advance + environment.advance.get_sub_item_seach;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getTradenameByCustomerId(parameters: any): Observable<any>{
    let url = environment.api.advance + environment.advance.get_tradename_by_customerid;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getColaboratorByDocument(documentNumber: any): Observable<any>{
    let url = environment.api.advance + stringFormat(environment.advance.get_colaborator_by_document, documentNumber);
    return this.httpService.get<any>(url);
  }

  getMallbyId(mallId: any): Observable<any>{
    let url = environment.api.advance + stringFormat(environment.advance.get_mall_by_id, mallId);
    return this.httpService.get<any>(url);
  }

  getTradenamebyId(tradenameId: any): Observable<any>{
    let url = environment.api.advance + stringFormat(environment.advance.get_tradename_by_id, tradenameId);
    return this.httpService.get<any>(url);
  }

  getLocalExecutiveSearch(parameters: any): Observable<any>{
    let url = environment.api.advance + environment.advance.get_local_executive_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }
  
  postLocalExecutive(model: any): Observable<any>{
    let url = environment.api.advance + environment.advance.post_local_executive;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
    }
    return this.httpService.post<any>(url, model, httpOptions);
  }
}