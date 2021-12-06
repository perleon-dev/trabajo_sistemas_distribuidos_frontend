import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { stringFormat } from 'src/app/shared/utility/functions';
import { CommercialTemplateTradenameFindAll, CommercialTemplateTradename } from 'src/app/models/commercialTemplatesTradenames';
import { CommercialTemplateData } from 'src/app/models/commercialTemplateData';
import { CommercialTemplateContactFindAll } from 'src/app/models/commercialTemplateContact';
import { CommercialTemplateMailFindAll } from 'src/app/models/commercialTemplateMail';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  subjectTradenameList = new Subject<Array<CommercialTemplateTradename>>();

  constructor(
    private httpService: HttpServiceService
  ) { }

  getCommercialTemplatesInbox(commercialTemplateId: number, customerId: string, tradeNameId: number, status: string, segment: string, origin: string, commercialName: string, pageIndex: number, pageSize: number, sort: string, user_id: string): Observable<any> {
    let params = stringFormat(environment.contracts.get_commercial_templates, commercialTemplateId, customerId, tradeNameId, status, segment, origin, commercialName, pageIndex, pageSize, sort, user_id);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getCommercialTemplatesDataSearch(commercialTemplateId: string): Observable<Array<CommercialTemplateData>> {
    let params = stringFormat(environment.contracts.get_commercial_template_commercial_data_search, commercialTemplateId);
    let url = environment.api.contracts + params;
    return this.httpService.get<Array<CommercialTemplateData>>(url);
  }

  getCommercialTemplatesTradenamesFindAll(commercialTemplateId: string, pageIndex: number, pageSize: number, sort: string): Observable<CommercialTemplateTradenameFindAll> {
    let params = stringFormat(environment.contracts.get_commercial_templates_tradenames_findall, commercialTemplateId, pageIndex, pageSize, sort);
    let url = environment.api.contracts + params;
    return this.httpService.get<CommercialTemplateTradenameFindAll>(url);
  }

  getTradeNamesCommercialTemplates(commercialTemplateId: number): Observable<any> {
    let params = stringFormat(environment.contracts.get_tradenames_commercial_templates, commercialTemplateId);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getPlatformCommercialTemplate(commercialTemplateId: number): Observable<any> {
    let params = stringFormat(environment.contracts.get_platforms_commercial_template, commercialTemplateId);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getFixedValidityCommercialTemplate(commercialTemplateId: number) {
    let params = stringFormat(environment.contracts.get_fixed_validity_commercial_template, commercialTemplateId);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getVariableValidityCommercialTemplate(commercialTemplateId: number, state: number) {
    let params = stringFormat(environment.contracts.get_variable_validity_commercial_template, commercialTemplateId, state);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getProspectDocumentCommercialTemplate(commercialTemplateId: number) {
    let params = stringFormat(environment.contracts.get_commercial_template_prospect_document_search, commercialTemplateId);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  postCommercialTemplate(model: any) {
    let url = environment.api.contracts + environment.contracts.post_commercial_template;
    return this.httpService.post<any>(`${url}`, model);
  }

  postCommercialTemplateApproved(model: any) {
    let url = environment.api.contracts + environment.contracts.put_commercial_templates_approved;
    return this.httpService.put<any>(`${url}`, model);
  }

  postCommercialTemplateObserved(model: any) {
    let url = environment.api.contracts + environment.contracts.put_commercial_templates_observe;
    return this.httpService.put<any>(`${url}`, model);
  }

  postCommercialTemplateAnulled(model: any) {
    let url = environment.api.contracts + environment.contracts.put_commercial_templates_annulled;
    return this.httpService.put<any>(`${url}`, model);
  }

  getHistoryCommercialTemplate(commercialTemplateId: number, pageIndex: number, pageSize: number, sort: string) {
    let params = stringFormat(environment.contracts.get_commercial_template_history, commercialTemplateId, pageIndex, pageSize, sort);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getCommercialTemplatesContactsFindAll(commercialTemplateId: string, pageIndex: number, pageSize: number, sort: string): Observable<CommercialTemplateContactFindAll> {
    let params = stringFormat(environment.contracts.get_commercial_templates_contacts_findall, commercialTemplateId, pageIndex, pageSize, sort);
    let url = environment.api.contracts + params;
    return this.httpService.get<CommercialTemplateContactFindAll>(url);
  }

  getCommercialTemplatesMailsFindAll(commercialTemplateId: string, pageIndex: number, pageSize: number, sort: string): Observable<CommercialTemplateMailFindAll> {
    let params = stringFormat(environment.contracts.get_commercial_templates_mails_findall, commercialTemplateId, pageIndex, pageSize, sort);
    let url = environment.api.contracts + params;
    return this.httpService.get<CommercialTemplateMailFindAll>(url);
  }

  getContractsMarketPlaceFindAll(contractId: number, contractVersion: number, contractModification: number, ruc: number, state: number, starDate: string, endDate: string, bussinessName: string, tradename: string, pageIndex: number, pageSize: number): Observable<any> {
    let params = stringFormat(environment.contracts.get_contracts_marketplace_findall, contractId, contractVersion, contractModification, ruc, state, starDate, endDate, bussinessName, tradename, pageIndex, pageSize);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getContractsMarketPlaceSearch(contractId: number, contractVersion: number, contractModification: number, ruc: number, state: number, starDate: String, endDate: String, bussinessName: String, tradename: String): Observable<any> {
    let params = stringFormat(environment.contracts.get_contracts_marketplace_search, contractId, contractVersion, contractModification, ruc, state, starDate, endDate, bussinessName, tradename);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getContractsMarketPlaceSearchById(contactId: number, contractVersion: number, contractModification: number) {
    let params = stringFormat(environment.contracts.get_contracts_marketplace_search_by_id, contactId, contractVersion, contractModification);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getContractsAddressesSearch(contactId: number, contractVersion: number, contractModification: number) {
    let params = stringFormat(environment.contracts.get_contracts_addresses_search, contactId, contractVersion, contractModification);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getContractsContactsSearch(contactId: number, contractVersion: number, contractModification: number) {
    let params = stringFormat(environment.contracts.get_contracts_contacts_search, contactId, contractVersion, contractModification);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getContractsComissionFixed(contactId: number, contractVersion: number, contractModification: number) {
    let params = stringFormat(environment.contracts.get_contracts_commision_fixed_search, contactId, contractVersion, contractModification);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getContractsComissionVariable(contactId: number, contractVersion: number, contractModification: number) {
    let params = stringFormat(environment.contracts.get_contracts_commision_variable_search, contactId, contractVersion, contractModification);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getContractsPlatforms(contactId: number, contractVersion: number, contractModification: number) {
    let params = stringFormat(environment.contracts.get_contracts_platforms_search, contactId, contractVersion, contractModification);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getContractsMails(contactId: number, contractVersion: number, contractModification: number) {
    let params = stringFormat(environment.contracts.get_contracts_mails_search, contactId, contractVersion, contractModification);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }
  getContractTradenamesSearch(contactId: number, contractVersion: number, contractModification: number): Observable<any> {
    let params = stringFormat(environment.contracts.get_contracts_tradenames_search, contactId, contractVersion, contractModification);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getContractsDocumentSearch(contactId: number, contractVersion: number, contractModification: number) {
    let params = stringFormat(environment.contracts.get_contracts_document_search, contactId, contractVersion, contractModification);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getContractsHistory(contactId: number, contractVersion: number, contractModification: number, pageIndex: number, pageSize: number, sort: string) {
    let params = stringFormat(environment.contracts.get_contracts_history, contactId, contractVersion, contractModification, pageIndex, pageSize, sort);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  postUpdateContractMarketplaceUnified(model: any) {
    let url = environment.api.contracts + environment.contracts.post_contracts_update_marketplace_unified;
    return this.httpService.post<any>(`${url}`, model);
  }

  getContractEconomicConditionsSearch(contactId: number, contractVersion: number, contractModification: number) {
    let params = stringFormat(environment.contracts.get_contracts_economid_conditions_search, contactId, contractVersion, contractModification);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getContractCategoriesSearch(typeSeller: number) {
    let params = stringFormat(environment.contracts.get_contracts_categories_search, typeSeller);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  postReportMetrics(model: any) {
    let url = environment.api.contracts + environment.contracts.post_report_metrics;
    return this.httpService.post<any>(`${url}`, model);
  }

  getConsultCommercialTemplatesInbox(commercialTemplateId: number, customerId: string, tradeNameId: number, status: string, segment: string, origin: string, pageIndex: number, pageSize: number, sort: string): Observable<any> {
    let params = stringFormat(environment.contracts.get_commercial_templates_findall, commercialTemplateId, customerId, tradeNameId, status, segment, origin, pageIndex, pageSize, sort);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getExceptionTemplateFindAll(templateId: number, contractId: number, businessName: string, tradeName: string, mall: string, local: string, state: string, executive: string, template: string, dateType: string, startDate: string, endDate: string): Observable<any>{
    let params = stringFormat(environment.contracts.get_exception_template_export, templateId, contractId, businessName, tradeName, mall, local, state, executive, template, dateType, startDate, endDate);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  putActiveVigency(model: any){
    let url = environment.api.contracts + environment.contracts.put_contracts_ranges_actived;
    return this.httpService.put<any>(`${url}`, model);
  }

  downloadValidity(ruc: string, state: number) {
    let params = stringFormat(environment.contracts.get_contracts_export_validities, ruc, state);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  putUploadValidity(model: any): Observable<any> {
    // let options = { processData: false, contentType: false, mimeType: 'multiplart/form-data' };
    let url = environment.api.contracts + environment.contracts.put_upload_validity;
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': "bearer " + environment.static_tokens.seller_data }),
      processData: false,
      contentType: false,
      mimeType: 'multiplart/form-data'
    };
    return this.httpService.put<any>(url, model, httpOptions)
  }

  getExportContracts(contractId: number, contractVersion: number, contractModification: number, ruc: number, state: number, starDate: string, endDate: string, bussinessName: string, tradename: string): Observable<any> {
    let params = stringFormat(environment.contracts.get_contracts_export_all, contractId, contractVersion, contractModification, ruc, state, starDate, endDate, bussinessName, tradename);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getAccountBank(contractId: number, contractVersion: number, contractModification: number): Observable<any> {
    let params = stringFormat(environment.contracts.get_contracts_accountBank_search, contractId, contractVersion, contractModification);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getCategoryCommission(typeSeller: number, level: number): Observable<any> {
    let params = stringFormat(environment.contracts.get_category_commission, typeSeller, level);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getGuaranteeTypePaymentTemplate(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_guarantee_type_payment_template;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContracts(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplateCurrentSituation(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_current_situation;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsCurrentSituation(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_current_situation;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsRepresentative(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_representative;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsCreditEvaluationSentinel(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_credit_evaluation_sentinel;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplateIntegrator(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_search_integrator;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  postContractsTemplateIntegrator(model: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.post_contracts_template_post_integrator;
    return this.httpService.post<any>(url, model);
  }

  getContractsTemplateVariableRentRangeType(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_variable_rent_range_type;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplateVariableRentSellingType(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contract_template_variable_rent_selling_type;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getItemDetailSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_item_details_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getItemSubtypeLoadSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_item_subtype_loads_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getTypeLoadDetailSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_type_load_details_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getItemInsurancePolicySearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_item_insurance_policies_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getFixedRentValiditySearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_fixed_rent_validities_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }
  

  getContractTemplate(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contract_template;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractTemplateConsumptionSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contract_template_consumptions_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractTemplateServiceSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contract_template_services_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractTemplateRevisionProjectSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contract_template_revision_projects_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractTemplateKeyRightSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contract_template_key_rights_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractTemplateAirConditionerConnectionSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contract_template_air_conditioner_connections_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractTemplateConstructionCostSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contract_template_construction_costs_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractTemplateWaterValveSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contract_template_water_valves_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplatePromotionExpenseSearchIntegrator(contractTemplateId: number): Observable<any> {
    let params = stringFormat(environment.contracts.get_contracts_template_promotion_expense_search_integrator, contractTemplateId);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }
  getContractsTemplateCommonExpenseSearchIntegrator(contractTemplateId: number): Observable<any> {
    let params = stringFormat(environment.contracts.get_contracts_template_common_expense_search_integrator, contractTemplateId);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }
  getContractsTemplateVariableRentSearchIntegrator(contractTemplateId: number): Observable<any> {
    let params = stringFormat(environment.contracts.get_contracts_template_variable_rent_search_integrator, contractTemplateId);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }
  getContractsTemplateVariableRentSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_variable_rent_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }
  getContractsTemplateFixedRentSearchIntegrator(contractTemplateId: number): Observable<any> {
    let params = stringFormat(environment.contracts.get_contracts_template_fixed_rent_search_integrator, contractTemplateId);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }
  getContractsTemplateValiditySearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_validity_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplateGuaranteeSearchIntegrator(contractTemplateId: number): Observable<any> {
    let params = stringFormat(environment.contracts.get_contracts_template_guarantee_search_integrator, contractTemplateId);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getPreContratos(pageIndex:number, pageSize:number, ruc:string, businessName:string, tradename:string, startDate:string, endDate:string, state:number ){
    let params = stringFormat(environment.contracts.get_pre_contract_findall, ruc, businessName, tradename, startDate, endDate, pageIndex, pageSize, state);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getPreContractTradenameSearch(state:number){
    let params = stringFormat(environment.contracts.get_pre_contract_tradename_search, state);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  postGuaranteeUploadDocument(model: any): Observable<any> {
    let options = { processData: false, contentType: false, mimeType: 'multiplart/form-data' };
    let url = environment.api.contracts + environment.contracts.post_contracts_upload_doc_guarantee;
    return this.httpService.post<any>(`${url}`, model, { options })
  }

  getGuaranteeUploadDocumentById(documentId: number): Observable<any> {
    let params = stringFormat(environment.contracts.get_contracts_template_guarantee_byid, documentId);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }
 
  putGuaranteeUploadDocument(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_upload_doc_guarantee;
    return this.httpService.put<any>(`${url}`, model);
  }


  getContractsTemplateSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }
  
  getContractsTemplateAddendumSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_addendum_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplateAirConditionesSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_air_conditioner_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplateMallAirConditionesSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_mall_air_conditioner_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplatePromotionExpenseTypeSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_promotion_expense_type_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplateRepresentativeSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_representative_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplateMultipleExceptionAdden(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_multiple_exception_adden;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  postContractsTemplateValidityUnified(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_template_validity_unified;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpService.post<any>(url, model, httpOptions);
  }

  postContractsTemplatefixedRentUnified(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_template_fixed_rent_unified;
    return this.httpService.post<any>(url, model);
  }

  postContractsTemplateVariableRentUnified(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_template_variable_rent_unified;
    return this.httpService.post<any>(url, model);
  }

  postContractsTemplateCommonExpenseUnified(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_template_common_expense_unified;
    return this.httpService.post<any>(url, model);
  }

  postContractsTemplatePromotionExpenseUnified(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_template_promotion_expense_unified;
    return this.httpService.post<any>(url, model);
  }

  postContractsTemplateConsumptionUnified(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_template_consumption_unified;
    return this.httpService.post<any>(url, model);
  }

  postContractsTemplateOtherConceptsUnified(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_template_other_concepts_unified;
    return this.httpService.post<any>(url, model);
  }

  postContractsTemplateExceptionUnified(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_template_exception_unified;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
    }
    return this.httpService.post<any>(url, model, httpOptions);
  }

  getContractsTemplateExceptionSearchIntegrator(contractTemplateId: number): Observable<any> {
    let params = stringFormat(environment.contracts.get_contracts_template_exception_search_integrator, contractTemplateId);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getPreContractSearch(state:number){
    let params = stringFormat(environment.contracts.get_pre_contract_search, state);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getContractsGuaranteeSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_guarantess_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  postContractsTemplateGuaranteeUnified(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_template_guarantee_unified;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
    }
    return this.httpService.post<any>(url, model, httpOptions);
  }

  getContractsRevisionProjectSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_revision_project_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsVisaGuaranteeSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_visa_guarantee_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsFixedRentSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_fixed_rent_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplateFixedRentSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contract_template_fixed_rent_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  postContractsTemplateSend(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_template_send;
    return this.httpService.post<any>(url, model);
  }

  getContractsWarrantyTrySearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_warranty_tray_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  postContractsSendCreditUnified(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_send_credit_unified;
    return this.httpService.post<any>(url, model);
  }

  getContractsTemplateGuaranteeSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_guarantee_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsServiceSearch(contractId: number, contractVersion: number, contractModification: number): Observable<any> {
    let params = stringFormat(environment.contracts.get_contracts_service_search, contractId, contractVersion, contractModification);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getContractsKeyRigthSearchStandard(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_key_right_search_standard;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplateCommonExpenseSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_common_expense_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplatePromotionExpenseSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_promotion_expense_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplateFixedRentDetailSearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contract_template_fixed_rent_detail_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplateDownloadDetail(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_download_detail;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsTemplateHistorySearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_history_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsFixedRentSearchIntegrator(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_fixed_rent_search_integrator;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsVariableRentSearchIntegrator(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_variable_rent_search_integrator;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsCommonExpenseSearchIntegrator(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_common_expense_search_integrator;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsPromotionExpenseSearchIntegrator(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_promotion_expense_search_integrator;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsConsumptionSearchIntegrator(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_consumption_search_integrator;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  getContractsAdditionalConcept(contractId: number, contractVersion: number, contractModification: number): Observable<any> {
    let params = stringFormat(environment.contracts.get_contracts_additional_concept, contractId, contractVersion, contractModification);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }
  
  getPreContractDownloadTemplateSellerCenter(){
    let params = stringFormat(environment.contracts.get_pre_contract_download_template_sellercenter);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }
  
  getPreContractDownloadTemplateVtex(){
    let params = stringFormat(environment.contracts.get_pre_contract_download_template_vtex);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getPreContractDownloadTemplateVtexToVtex(){
    let params = stringFormat(environment.contracts.get_pre_contract_download_template_vtex_to_vtex);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(url);
  }

  getContractsValiditySearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_validity_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

  postContractsVisaGuarantee(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_visa_guarantee;
    return this.httpService.post<any>(url, model);
  }

  postContractsTemplateApproved(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_template_approve;
    return this.httpService.post<any>(url, model);
  }

  postContractsTemplateDisapprove(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_template_disapprove;
    return this.httpService.post<any>(url, model);
  }

  postContractsTemplateUrgency(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.post_contracts_template_urgency;
    return this.httpService.post<any>(url, model);
  }

  putContractsTemplateUrgency(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.put_contracts_template_urgency;
    return this.httpService.put<any>(url, model);
  }

  getContractsTemplateUrgencySearch(parameters: any): Observable<any>{
    let url = environment.api.contracts + environment.contracts.get_contracts_template_urgency_search;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }
  
  postPreContractCreateMasive(model: any) {
    let url = environment.api.contracts + environment.contracts.post_pre_contract_create_masive;
    return this.httpService.post<any>(`${url}`, model);
  }

  postPreContractSendPreContract(model: any) {
    let url = environment.api.contracts + environment.contracts.post_pre_contract_send_precontract;
    return this.httpService.post<any>(`${url}`, model);
  }

  putPreContractUpdateMassiveState(model: any) {
    let url = environment.api.contracts + environment.contracts.put_pre_contract_update_massive_state;
    return this.httpService.put<any>(`${url}`, model);
  }

  putContractsTemplate(model: any): Observable<any> {
    let url = environment.api.contracts + environment.contracts.put_contract_template;
    return this.httpService.put<any>(`${url}`, model);
  }

  getContractsTemplateDownloadCreditEvaluation(contractTemplateId) {
    let params = stringFormat(environment.contracts.get_contracts_template_credit_evaluation_download, contractTemplateId);
    let url = environment.api.contracts + params;
    return this.httpService.get<any>(`${url}`);
  }

  getContractsMultipleExceptionTemplateAdvance(parameters: any) {
    let url = environment.api.contracts + environment.contracts.get_contracts_multiple_exception_template_advance;
    let httpParams = new HttpParams({
      fromObject: parameters
    });
    return this.httpService.get<any>(url, {params: httpParams});
  }

}