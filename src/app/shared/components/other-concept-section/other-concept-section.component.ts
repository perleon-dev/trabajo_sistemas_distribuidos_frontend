import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { forkJoin } from 'rxjs';
import { AdvanceService } from 'src/app/features/services/advanceServices/advance.service';
import { ContractService } from 'src/app/features/services/contractServices/contract.service';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { constants } from 'src/app/shared/utility/constants';
import { downloadFile } from 'src/app/shared/utility/downloadFile';
import { thousandsSeparator } from 'src/app/shared/utility/functions';
import { Modal } from 'src/app/shared/utility/modal';
import { KeyRightDetailComponent } from '../key-right-detail/key-right-detail.component';

@Component({
  selector: 'app-other-concept-section',
  templateUrl: './other-concept-section.component.html',
  styleUrls: ['./other-concept-section.component.scss']
})
export class OtherConceptSectionComponent {

  @Input() contractTemplate: Array<any> = [];
  @Input() screen?: number;
  @Input() profileId?: number;

  @Input() profileName: string;
  @Input() userCode: string;
  @Input() userName: string;
  @Input() userId?: number;
  @Input() approveItem: boolean = true;
  
  frmOtroConcepto: FormGroup;

  contractTemplateId: any;
  contractId: any;
  contractVersion: any;
  contractModification: any;
  itemId: any;
  propertyId: any;
  documentNumberUserAssing: any;
  symbolCurrencyRevisionProjectAmount: any;
  symbolCurrencyKeyRightAmount: any;
  symbolCurrencyAmountPayProtection: any;
  symbolCurrencyAmountPayProtectionprevious: any;
  symbolCurrencyCostconnectionairconditioning: any;
  symbolCurrencyAmountPayCostWork: any;
  symbolCurrencyAmountPayCostWorkprevious: any;

  currencyList: Array<any> = [];
  contractFixedRentFound: Array<any> = [];
  contractTemplateRevisionProjectFound: Array<any> = [];
  contractTemplateKeyRightFound: Array<any> = [];
  contractTemplateSecurePolicyFound: Array<any> = [];
  contractTemplateWaterValvesFound: Array<any> = [];
  contractTemplateAirConditionerConnectionFound: Array<any> = [];
  contractTemplareAirConditionerFound: Array<any> = [];
  contractTemplateConstructionCostFound: Array<any> = [];
  waterValvesDefault: Array<any> = [];
  constructionCostDefault: Array<any> = [];
  contractTemplateMallAirConditionerFound: Array<any> = [];
  contractTemplateAddendumFound: Array<any> = [];
  contractTemplateHistoryFound: Array<any> = [];

  disapprovalMoviteList: Array<any> = [];
  parameterDetailList: Array<any> = [];
  contractTemplateUrgencyList: Array<any> = [];

  contractRevisionProject: any;
  contractKeyRight: any;
  contractInsurancePolicy: any;
  contractWaterValve: any;
  contractAirConditionerConnection: any;
  contractConstructionCost: any;
  contractAirConditioner: any;
  contractList: Array<any> = [];
  
  motiveAddendumList: Array<any> = [];
  visaGuarranteFound: Array<any> = [];
  
  colaboratorFound: any;
  loadingSping: boolean = false;
  loadingDownload: boolean = false;
  loadingApprove: boolean = false;
  loadingDisapprove: boolean = false;
  isLoading: boolean = false;

  showControl: boolean = false;
  showChkUgency: boolean = false;
  documentNumberUserRegister: string;

  constructor(
    private formBuilder: FormBuilder,
    private advanceService: AdvanceService,
    private contractService: ContractService,
    private dateFormatPipe: DateFormatPipe,
    private modalService: NzModalService,
    private modalMessage: Modal,
    private downloadFile: downloadFile
  ) { }

  ngOnChanges(): void {
    this.initForm();
    if(this.contractTemplate[0] === undefined) return;
    this.setProperty();
    this.getListOtherConcept();
  }

  initForm(){
    this.frmOtroConcepto = this.formBuilder.group({
      amountpaymentprevious: [{value: '', disabled: true}],
      rentnumberprevious: [{value: '', disabled: true}],
      paymentdateprevious: [{value: '', disabled: true}],
      amountpermanenceprevious: [{value: '', disabled: true}],
      maximumdeliverydateprevious: [{value: '', disabled: true}],

      localtypeprevious: [{value: '', disabled: true}],
      localitemprevious: [{value: '', disabled: true}],
      amountinsuredprevious: [{value: '', disabled: true}],

      amountpayprotectionprevious: [{value: '', disabled: true}],
      amountpaypublicityprevious: [{value: '', disabled: true}],

      amountpaycostconnectionairconditioningprevious: [{value: '', disabled: true}],
      amountpaycostworkprevious: [{value: '', disabled: true}],

      amountpaycostairconditioningoperationprevious: [{value: '', disabled: true}],

      amountpayment: [{value: '', disabled: true}],
      rentnumber: [{value: '', disabled: true}],
      paymentdate: [{value: '', disabled: true}],
      amountpermanence: [{value: '', disabled: true}],
      maximumdeliverydate: [{value: '', disabled: true}],
      localtype: [{value: '', disabled: true}],
      localitem: [{value: '', disabled: true}],
      amountinsured: [{value: '', disabled: true}],
      amountpayprotection: [{value: '', disabled: true}],
      amountpaypublicity: [{value: '', disabled: true}],
      amountpaycostconnectionairconditioning: [{value: '', disabled: true}],
      amountpaycostwork: [{value: '', disabled: true}],
      amountpaycostairconditioningoperation: [{value: '', disabled: true}],
      observation: [{value: '', disabled: true}],
      legalobservation: [{value: '', disabled: true}],
      subcriptiondateaddendum: [{value: '', disabled: true}],
      validitydateaddendum: [{value: '', disabled: true}],
      addendumreason: [{value: '', disabled: true}],
      traderemarks: [{value: '', disabled: true}],
      observationaddendum: [{value: '', disabled: true}],
      previouscomment: [{value: '', disabled: true}],
      comment: [null],
      ddldisapprovalmotive: [null],
      chkurgent: [null]
    });
  }

  setProperty(){
    this.contractTemplateId = this.contractTemplate[0].contPlantIcod;
    this.contractId = this.contractTemplate[0].contCod;
    this.contractVersion = this.contractTemplate[0].contVer;
    this.contractModification = this.contractTemplate[0].contMod;
    this.itemId = this.contractTemplate[0].rubroId;
    this.propertyId = this.contractTemplate[0].inmCod
    this.documentNumberUserAssing = this.contractTemplate[0].contUsuaDocAsig;
    this.documentNumberUserRegister = this.contractTemplate[0].contUsuaDocIdReg;
  }

  getListOtherConcept(){
    this.loadingSping = true;
    forkJoin([
      this.advanceService.getCurrencies(0),
      this.contractService.getContractsFixedRentSearch({ContractId: this.contractId, ContractVersion: this.contractVersion, ContractModification: this.contractModification}),
      this.contractService.getContractTemplateRevisionProjectSearch({cont_c_plant_icod: this.contractTemplateId}),
      this.contractService.getContractTemplateKeyRightSearch({cont_c_plant_icod: this.contractTemplateId}),
      this.contractService.getItemInsurancePolicySearch({rubro_c_yid: this.itemId}),
      this.contractService.getContractTemplateWaterValveSearch({cont_c_plant_icod: this.contractTemplateId}),
      this.contractService.getContractTemplateAirConditionerConnectionSearch({cont_c_plant_icod: this.contractTemplateId}),
      this.contractService.getContractsTemplateAirConditionesSearch({contractTemplateId: this.contractTemplateId, state: constants.STATE.ACTIVE}),
      this.contractService.getContractTemplateConstructionCostSearch({cont_c_plant_icod: this.contractTemplateId}),
      this.advanceService.getParameterDetail(50),
      this.advanceService.getParameterDetail(49),
      this.contractService.getContractsTemplateMallAirConditionesSearch({mallId: this.propertyId, conceptId: constants.PARAMETER.OPERATION_CONCEPT_AIR_CONDITIONER, state: constants.STATE.ACTIVE}),
      this.contractService.getContractsTemplateAddendumSearch({cont_c_plant_icod: this.contractTemplateId}),
      this.advanceService.getParameterDetail(constants.PARAMETER.MOTIVE_ADDENDUM),
      this.advanceService.getColaboratorByDocument(this.documentNumberUserRegister),
      this.contractService.getContractsVisaGuaranteeSearch({ContractTemplateId: this.contractTemplateId}),
      this.contractService.getContractsTemplateHistorySearch({ContractTemplateId: this.contractTemplateId}),
      this.contractService.getContractsAdditionalConcept(this.contractId, this.contractVersion, this.contractModification),
      this.contractService.getContracts({ ContractId: this.contractId, ContractVersion: this.contractVersion, ContractModification: this.contractModification }),
      this.advanceService.getParameterDetailTemplate(0,this.profileId),
      this.contractService.getContractsTemplateUrgencySearch({contractTemplateId: this.contractTemplateId})      
    ]).subscribe(result => {
      this.currencyList = result[0];
      this.contractFixedRentFound = result[1];
      this.contractTemplateRevisionProjectFound = result[2];
      this.contractTemplateKeyRightFound = result[3];
      this.contractTemplateSecurePolicyFound = result[4];
      this.contractTemplateWaterValvesFound = result[5];
      this.contractTemplateAirConditionerConnectionFound = result[6];
      this.contractTemplareAirConditionerFound = result[7];
      this.contractTemplateConstructionCostFound = result[8];
      this.waterValvesDefault = result[9];
      this.constructionCostDefault = result[10];
      this.contractTemplateMallAirConditionerFound = result[11];
      this.contractTemplateAddendumFound = result[12];
      this.motiveAddendumList = result[13];
      this.colaboratorFound = result[14]
      this.visaGuarranteFound = result[15];
      this.contractTemplateHistoryFound = result[16];
      this.contractRevisionProject = result[17].revisionProject;
      this.contractKeyRight = result[17].keyRight;
      this.contractWaterValve = result[17].waterValve;
      this.contractAirConditionerConnection = result[17].airConditionerConnection;
      this.contractConstructionCost = result[17].constructionCost;
      this.contractTemplareAirConditionerFound = result[17].airConditioner;
      this.contractInsurancePolicy = result[17].insurancePolicy;
      this.contractAirConditioner = result[17].airConditioner;
      this.contractList = result[18];
      this.parameterDetailList = result[19];
      this.contractTemplateUrgencyList = result[20];
      
    },
    (error: any) => {
      console.log(error);
      this.loadingSping = false;
    },
    () => {
      this.setDataRevisionProject();
      this.setDataKeyRight();
      this.setDataSecurePolicy();
      this.setDataFireProtectionKit();
      this.setDataAirConditionerConnection();
      this.setDataConstructionCost();
      this.setDataAirConditionerOperationCost();
      this.setDataAddendum();
      this.frmOtroConcepto.get('observation')!.setValue(this.contractTemplate[0].contObs);
      this.frmOtroConcepto.get('legalobservation')!.setValue(this.contractTemplate[0].contObsLeg);
      this.setDataPreviousComment();
      this.setDataOtherConceptContract();
      this.loadingSping = false;

      if(this.parameterDetailList.length > 0){
        this.disapprovalMoviteList = this.parameterDetailList.filter(x => Number(x.parameterId) === constants.PARAMETER.DISAPPROVAL_MOTIVE);
      }

      if(this.contractTemplateUrgencyList.length > 0){
        if(Number(this.contractTemplateUrgencyList[0].isUrgency) === 1)
          this.frmOtroConcepto.get('chkurgent').setValue(true);
      }

      this.showControlbyProfile();
    });
  }

  showControlbyProfile(){
    switch (this.profileId) {
      case constants.PROFILES.COMMERCIAL_BOSS:
        this.showChkUgency = true;
        this.showControl = true;
        break;
      case constants.PROFILES.COMMERCIAL_MANAGER:
        this.showControl = true;
        break;
      case constants.PROFILES.COMMERCIAL_MARKETING_DIRECTOR:
        this.showControl = true;
        break;
      case constants.PROFILES.LEGAL_REPRESENTATIVE:
        this.showControl = true;
        break;
    }

    if(this.screen !== constants.SCREEN.TRAY_TEMPLATE) {
      this.showControl = false;
      this.showChkUgency = false;
    }
  }

  onChangeUrgency(data: boolean){

  }

  setDataOtherConceptContract(){
    this.frmOtroConcepto.get('amountpaymentprevious').setValue('NO APLICA');
    this.frmOtroConcepto.get('rentnumberprevious').setValue('NO APLICA');
    this.frmOtroConcepto.get('paymentdateprevious').setValue('NO APLICA');
    this.frmOtroConcepto.get('amountpermanenceprevious').setValue('NO APLICA');
    this.frmOtroConcepto.get('maximumdeliverydateprevious').setValue('NO APLICA');

    this.frmOtroConcepto.get('localtypeprevious').setValue('NO APLICA');
    this.frmOtroConcepto.get('localitemprevious').setValue('NO APLICA');
    this.frmOtroConcepto.get('amountinsuredprevious').setValue('NO APLICA');

    this.frmOtroConcepto.get('amountpayprotectionprevious').setValue('NO APLICA');
    this.frmOtroConcepto.get('amountpaypublicityprevious').setValue('NO APLICA');

    this.frmOtroConcepto.get('amountpaycostconnectionairconditioningprevious').setValue('NO APLICA');
    this.frmOtroConcepto.get('amountpaycostworkprevious').setValue('NO APLICA');

    this.frmOtroConcepto.get('amountpaycostairconditioningoperationprevious').setValue('NO APLICA');

    if(this.contractRevisionProject !== null){

    }

    if(this.contractInsurancePolicy !== null){
      this.frmOtroConcepto.get('localtypeprevious').setValue(this.contractList[0].localTypeName);
      this.frmOtroConcepto.get('localitemprevious').setValue(this.contractList[0].commercialItem);
      this.frmOtroConcepto.get('amountinsuredprevious').setValue("$ " + this.contractInsurancePolicy.rubro_pol_seguro_c_emonto);
    }

    if(this.contractWaterValve !== null){
      if(this.contractWaterValve.cont_valagua_c_bhabilitado){
        let found = this.currencyList.find(x => Number(x.currencyId) === Number(this.contractWaterValve.moneda_c_yid));
        if(found) this.symbolCurrencyAmountPayProtection = found.currencySymbol;
        this.frmOtroConcepto.get('amountpayprotectionprevious').setValue(thousandsSeparator(this.contractWaterValve.cont_valagua_c_emonto_base));
      }
    }

    if(this.contractAirConditionerConnection !== null){
      if(this.contractAirConditionerConnection.cont_conaire_c_bhabilitado){
        this.frmOtroConcepto.get('amountpaycostconnectionairconditioningprevious').setValue(thousandsSeparator(this.contractAirConditionerConnection.cont_conaire_c_emonto_base));
      }
    }
    
    if(this.contractConstructionCost !== null){
      if(this.contractConstructionCost.obra_c_bhabilitado){
        let found = this.currencyList.find(x => Number(x.currencyId) === Number(this.contractConstructionCost.moneda_c_yid));
        if(found) this.symbolCurrencyAmountPayCostWorkprevious = found.currencySymbol;
        this.frmOtroConcepto.get('amountpaycostworkprevious').setValue(thousandsSeparator(this.contractConstructionCost.obra_c_emonto_base));
      }
    }

    if(this.contractAirConditioner !== null){
      if(this.contractAirConditioner.enabled){
        this.frmOtroConcepto.get('amountpaycostairconditioningoperationprevious').setValue(thousandsSeparator(this.contractAirConditioner.baseAmount));
      }
    }

  }

  setDataRevisionProject(){
    if(this.contractTemplateRevisionProjectFound.length > 0){
      if(this.contractFixedRentFound.length > 0){
        let currencyFound: any;
        currencyFound = this.currencyList.find(x => Number(x.currencyId) === Number(this.contractFixedRentFound[0].contractCurrencyId));
        if(currencyFound) this.symbolCurrencyRevisionProjectAmount = currencyFound.currencySymbol;
        this.frmOtroConcepto.get('amountpayment').setValue(thousandsSeparator(this.contractTemplateRevisionProjectFound[0].cont_revproy_c_emonto));
        this.frmOtroConcepto.get('paymentdate').setValue(this.dateFormatPipe.transform(this.contractTemplateRevisionProjectFound[0].cont_revproy_c_dfec));
      }
    }else{
      this.frmOtroConcepto.get('amountpayment').setValue('NO APLICA');
      this.frmOtroConcepto.get('paymentdate').setValue('NO APLICA');
    }
  }

  setDataKeyRight(){
    this.frmOtroConcepto.get('rentnumber').setValue('NO APLICA');
    this.frmOtroConcepto.get('amountpermanence').setValue('NO APLICA');
    this.frmOtroConcepto.get('maximumdeliverydate').setValue('NO APLICA');
    if(this.contractTemplateKeyRightFound.length > 0){
      let currencyFound: any;
      currencyFound = this.currencyList.find(x => Number(x.currencyId) === Number(this.contractTemplateKeyRightFound[0].moneda_c_yid));
      if(currencyFound) this.symbolCurrencyKeyRightAmount = currencyFound.currencySymbol;
      this.frmOtroConcepto.get('rentnumber').setValue(thousandsSeparator(this.contractTemplateKeyRightFound[0].cont_gar_c_nnro_rentas));
      this.frmOtroConcepto.get('amountpermanence').setValue(thousandsSeparator(this.contractTemplateKeyRightFound[0].cont_derllave_c_emonto)),
      this.frmOtroConcepto.get('maximumdeliverydate').setValue(this.dateFormatPipe.transform(this.contractTemplateKeyRightFound[0].cont_derllave_c_dfec));
    }
  }

  setDataSecurePolicy(){
    this.frmOtroConcepto.get('localtype').setValue(this.contractTemplate[0].localTypeName);
    this.frmOtroConcepto.get('localitem').setValue(this.contractTemplate[0].rubroName);
    if(this.contractTemplateSecurePolicyFound.length > 0){
      this.frmOtroConcepto.get('amountinsured').setValue(this.contractTemplateSecurePolicyFound[0].rubro_pol_seguro_c_emonto);
    }
  }

  setDataFireProtectionKit(){
    let currencyFound: any;
    if(this.contractTemplateWaterValvesFound.length > 0){
      if(!this.contractTemplateWaterValvesFound[0].cont_valagua_c_bhabilitado){
        this.frmOtroConcepto.get('amountpayprotection').setValue('NO APLICA');
      }else{
        currencyFound = this.currencyList.find(x => Number(x.currencyId) === Number(this.contractTemplateKeyRightFound[0].moneda_c_yid));
        if(currencyFound) this.symbolCurrencyAmountPayProtection = currencyFound.currencySymbol;
        this.frmOtroConcepto.get('amountpayprotection').setValue(thousandsSeparator(this.contractTemplateWaterValvesFound[0].cont_valagua_c_emonto_base));
      }      
    }else if (this.waterValvesDefault.length > 0){
      currencyFound = this.currencyList.find(x => Number(x.currencyId) === Number(this.waterValvesDefault[1].field1));
      if(currencyFound) this.symbolCurrencyAmountPayProtection = currencyFound.currencySymbol;
      this.frmOtroConcepto.get('amountpayprotection').setValue(thousandsSeparator(this.waterValvesDefault[0].field1));
    }
    else{
      this.frmOtroConcepto.get('amountpayprotection').setValue('NO APLICA');
    }
    this.frmOtroConcepto.get('amountpaypublicity').setValue('NO APLICA');
  }

  setDataAirConditionerConnection(){
    let currencyFound: any;
    if(this.contractTemplateAirConditionerConnectionFound.length > 0){
      if(this.contractTemplateAirConditionerConnectionFound[0].cont_conaire_c_bhabilitado){
        currencyFound = this.currencyList.find(x => Number(x.currencyId) === Number(this.contractTemplateAirConditionerConnectionFound[0].moneda_c_yid));
        if(currencyFound) this.symbolCurrencyAmountPayProtection = currencyFound.currencySymbol;
        this.frmOtroConcepto.get('amountpaycostconnectionairconditioning').setValue(thousandsSeparator(this.contractTemplateAirConditionerConnectionFound[0].cont_conaire_c_emonto_base) + ' x m2');
      }else{
        this.frmOtroConcepto.get('amountpaycostconnectionairconditioning').setValue('NO APLICA');
      }      
    }else{
      this.frmOtroConcepto.get('amountpaycostconnectionairconditioning').setValue('NO APLICA');
      if(this.contractTemplareAirConditionerFound === null) return;

      if(this.contractTemplareAirConditionerFound.length > 0){
        currencyFound = this.currencyList.find(x => Number(x.currencyId) === Number(this.contractTemplareAirConditionerFound[0].currencyId));
      if(currencyFound) this.symbolCurrencyAmountPayProtection = currencyFound.currencySymbol;
        this.frmOtroConcepto.get('amountpaycostconnectionairconditioning').setValue(thousandsSeparator(this.contractTemplareAirConditionerFound[0].baseAmount) + ' x m2');
      }
    }
  }

  setDataConstructionCost(){
    let currencyFound: any;
    if(this.contractTemplateConstructionCostFound.length> 0){
      if(this.contractTemplateConstructionCostFound[0].obra_c_bhabilitado){
        currencyFound = this.currencyList.find(x => Number(x.currencyId) === Number(this.contractTemplateConstructionCostFound[0].moneda_c_yid));
        if(currencyFound) this.symbolCurrencyAmountPayCostWork = currencyFound.currencySymbol;
        this.frmOtroConcepto.get('amountpaycostwork').setValue(thousandsSeparator(this.contractTemplateConstructionCostFound[0].obra_c_emonto_base));
      }else{
        this.frmOtroConcepto.get('amountpaycostwork').setValue('NO APLICA');
      }      
    }else if (this.constructionCostDefault.length){
      this.frmOtroConcepto.get('amountpaycostwork').setValue(thousandsSeparator(this.constructionCostDefault[0].field1));
    }
  }

  setDataAirConditionerOperationCost(){
    let currencyFound: any;
    this.frmOtroConcepto.get('amountpaycostairconditioningoperation').setValue('NO APLICA');
    if(this.contractTemplareAirConditionerFound === null) return;
    if(this.contractTemplareAirConditionerFound.length > 0){
      currencyFound = this.currencyList.find(x => Number(x.currencyId) === Number(this.contractTemplareAirConditionerFound[0].currencyId));
      if(currencyFound) this.symbolCurrencyAmountPayProtection = currencyFound.currencySymbol;
      this.frmOtroConcepto.get('amountpaycostairconditioningoperation').setValue(thousandsSeparator(this.contractTemplareAirConditionerFound[0].baseAmount) + ' x m2');
    }
  }

  setDataAddendum(){
    if(this.contractTemplateAddendumFound.length > 0){
      this.frmOtroConcepto.get('subcriptiondateaddendum')!.setValue(this.dateFormatPipe.transform(this.contractTemplateAddendumFound[0].aden_fec_sup));

      let moviteAddendumFound = this.motiveAddendumList.find(x => Number(x.parameterDetailId) === Number(this.contractTemplateAddendumFound[0].aden_tipmot));
      if(moviteAddendumFound)
        this.frmOtroConcepto.get('addendumreason').setValue(moviteAddendumFound.description);

      this.frmOtroConcepto.get('observationaddendum')!.setValue(this.contractTemplateAddendumFound[0].aden_obs_tip1);
      this.frmOtroConcepto.get('traderemarks')!.setValue(this.contractTemplateAddendumFound[0].aden_obs_tip2);
      this.frmOtroConcepto.get('validitydateaddendum')!.setValue(this.dateFormatPipe.transform(this.contractTemplateAddendumFound[0].aden_fec_evig));
    }
  }

  setDataPreviousComment(){
    let previousComment: string = '';
    if(this.contractTemplateAddendumFound[0].aden_obs_tip1 !== null){
      previousComment = this.colaboratorFound.name + ' ' + this.colaboratorFound.lastName + ' ' + this.colaboratorFound.secondLastName + ' : ';
      previousComment += this.contractTemplateAddendumFound[0].aden_obs_tip1 + "\n";
    }
    
    if(this.contractTemplateHistoryFound.length > 0){
      let historyFound = this.contractTemplateHistoryFound.filter(x => x.usua_c_doc_iid !== this.documentNumberUserAssing);
      if(historyFound.length > 0){
        historyFound.forEach(item => {
          if(item.cont_hist_c_vcomentario !== null){
            if(item.cont_hist_c_vcomentario.length > 0){
              previousComment += item.user_full_name + ": " + item.cont_hist_c_vcomentario + "\n";
            }              
          }           
            
        });
      }
    }

    this.frmOtroConcepto.get('previouscomment').setValue(previousComment);
  } 

  openKeyRightDetailModal(){

    let modal = this.modalService.create({
      nzTitle: constants.MODAL_TITLE.KEY_RIGHT_DETAIL,
      nzContent: KeyRightDetailComponent,
      nzWidth: '800',
      nzComponentParams: {
        contractTemplateId: this.contractTemplateId
      }
    });

    modal.afterClose.subscribe(result => {
         
    });

  }

  onDownloadContractTemplateDetail(){
    this.loadingDownload = true;
    this.contractService.getContractsTemplateDownloadDetail({ContractTemplateId: this.contractTemplateId})
                        .subscribe((response: any) => {
                          this.downloadFile.GeneratePDF(response);
                          this.loadingDownload = false;
                        },
                        (error: any) => {
                          this.loadingDownload = false;
                          this.modalMessage.error(constants.MESSAGE.ERROR_GET_DATA);
                        });
  }

  setCommandApprove(): any{
    let command = {
      contractTemplateId: this.contractTemplateId,
      userId: this.userId,
      userNetwork: this.userCode,
      userFullName: this.userName,
      profileId: this.profileId,
      profileName: this.profileName,
      comment: this.frmOtroConcepto.value.comment,
      action: 'Aprobar',
      disaproveMotive: this.frmOtroConcepto.value.ddldisapprovalmotive
    };

    return command;
  }

  setCommandDisapprove(): any{
    let list: Array<string> = [];
    list.push(this.contractTemplateId);
    let command = {
      lstContPlan: list,
      userNetwork: this.userCode,
      profileId: this.profileId,
      profileName: this.profileName,
      reasonId: this.frmOtroConcepto.value.ddldisapprovalmotive,
      reasonDesc: this.frmOtroConcepto.value.comment,
      action: 'Desaprobar'
    };

    return command;
  }

  setCommandUrgency(isUrgency: boolean): any{
    let contractTemplateUrgencyId: any;
    if(this.contractTemplateUrgencyList.length > 0)
      contractTemplateUrgencyId = this.contractTemplateUrgencyList[0].contractTemplateUrgencyId;

    let command = {
      contractTemplateUrgencyId: contractTemplateUrgencyId,
      contractTemplateId: this.contractTemplateId,
      isUrgency: (isUrgency) ? 1: 0,
      state: constants.STATE.ACTIVE,
      registerUserCode: this.userCode,
      registerUserFullname: this.userName
    };
    return command;
  }

  onChangechkurgent(data: boolean){
    this.isLoading = true;
    if(this.contractTemplateUrgencyList.length === 0){
      this.contractService.postContractsTemplateUrgency(this.setCommandUrgency(data))
                        .subscribe(() => {
                          this.contractService.getContractsTemplateUrgencySearch({contractTemplateId: this.contractTemplateId})
                                              .subscribe(response => {
                                                this.contractTemplateUrgencyList = [];
                                                this.contractTemplateUrgencyList = response;
                                                this.isLoading = false;
                                              });
                        },
                        (error: any) => {
                          this.isLoading = false;
                          this.modalMessage.error(constants.MESSAGE.ERROR);
                        });
    }else{
      this.contractService.putContractsTemplateUrgency(this.setCommandUrgency(data))
                        .subscribe(() => {
                          this.contractService.getContractsTemplateUrgencySearch({contractTemplateId: this.contractTemplateId})
                                              .subscribe(response => {
                                                this.contractTemplateUrgencyList = [];
                                                this.contractTemplateUrgencyList = response;
                                                this.isLoading = false;
                                              });
                        },
                        (error: any) => {
                          this.isLoading = false;
                          this.modalMessage.error(constants.MESSAGE.ERROR);
                        });
    }
    
  }

  validateDisapprove(): boolean{
    let validate: boolean = true;
    if(this.frmOtroConcepto.value.ddldisapprovalmotive === null){
      this.modalMessage.warning('Debe seleccionar el motivo de la desaprobación');
      return false;
    }
    return validate;
  }

  onApprove(){

    if( !this.approveItem ){
      this.modalMessage.info("Se debe aprobar la nueva configuración de Rubro");
      return;
    } 
    let areaModified = this.contractTemplate[0].areaMod;
    let contractAreaLocal = this.contractTemplate[0].locAreaTot;
    let localArea = this.contractTemplate[0].locAreaTot_tabla_local;
    if(areaModified !== null){
      if(areaModified){
        this.modalMessage.confirm(
          'El área del local es ' + localArea + ' m2 y ha sido modificado a ' + contractAreaLocal + ' m2, está seguro de aprobar la plantilla ' + this.contractTemplateId,
          () => {
            this.loadingApprove = true;
            this.contractService.postContractsTemplateApproved(this.setCommandApprove())
                                .subscribe((response: any) => {
                                  if(Number(response.codeStatus) === 1){
                                    this.loadingApprove = false;
                                    this.modalMessage.success(response.message);                                    
                                    if(Number(this.screen) === constants.SCREEN.TRAY_TEMPLATE){
                                      window.location.href = constants.ROUTES.TRAY_CONTRACT_TEMPLATE;
                                    }
                                  }else{
                                    this.loadingApprove = false;
                                    this.modalMessage.warning(response.message);
                                  }
                                },
                                (error: any) => {
                                  this.loadingApprove = false;
                                  this.modalMessage.error(constants.MESSAGE.ERROR);
                                });
          }
        );
      }else{
        this.modalMessage.confirm(
          '¿Estas seguro de aprobar la plantilla ' + this.contractTemplateId + '?',
          () => {
            this.loadingApprove = true;
            this.contractService.postContractsTemplateApproved(this.setCommandApprove())
                                .subscribe((response: any) => {
                                  if(Number(response.codeStatus) === 1){
                                    this.loadingApprove = false;
                                    this.modalMessage.success(response.message);                                    
                                    if(Number(this.screen) === constants.SCREEN.TRAY_TEMPLATE){
                                      if(this.profileId === constants.PROFILES.CREDIT_COLLECTION_BOSS ||
                                        this.profileId === constants.PROFILES.CREDIT){
                                       window.location.href = constants.ROUTES.TRAY_CREDIT_EVALUATION;
                                     }else{
                                       window.location.href = constants.ROUTES.TRAY_CONTRACT_TEMPLATE;
                                     }
                                    }
                                  }else{
                                    this.loadingApprove = false;
                                    this.modalMessage.warning(response.message);
                                  }
                                },
                                (error: any) => {
                                  this.loadingApprove = false;
                                  this.modalMessage.error(constants.MESSAGE.ERROR);
                                });
          }
        );
      }
    }else{
      this.modalMessage.confirm(
        '¿Estas seguro de aprobar la plantilla ' + this.contractTemplateId + '?',
        () => {
          this.loadingApprove = true;
          this.contractService.postContractsTemplateApproved(this.setCommandApprove())
                              .subscribe((response: any) => {
                                if(Number(response.codeStatus) === 1){
                                  this.loadingApprove = false;
                                  this.modalMessage.success(response.message);                                    
                                  if(Number(this.screen) === constants.SCREEN.TRAY_TEMPLATE){
                                    if(this.profileId === constants.PROFILES.CREDIT_COLLECTION_BOSS ||
                                      this.profileId === constants.PROFILES.CREDIT){
                                     window.location.href = constants.ROUTES.TRAY_CREDIT_EVALUATION;
                                   }else{
                                     window.location.href = constants.ROUTES.TRAY_CONTRACT_TEMPLATE;
                                   }
                                  }
                                }else{
                                  this.loadingApprove = false;
                                  this.modalMessage.warning(response.message);
                                }
                              },
                              (error: any) => {
                                this.loadingApprove = false;
                                this.modalMessage.error(constants.MESSAGE.ERROR);
                              });
        }
      );
    }
  }

  onDisapprove(): void{
    if(!this.validateDisapprove()) return;
    this.modalMessage.confirm(
      '¿Estas seguro de rechazar la plantilla ' + this.contractTemplateId + '?',
      () => {
        this.loadingDisapprove = true;
        this.contractService.postContractsTemplateDisapprove(this.setCommandDisapprove())
                            .subscribe((response: any) => {
                              this.loadingDisapprove = false;
                              if(response.success !== null){
                                if(response.success){                                  
                                  this.modalMessage.success(response.message);
                                  if(Number(this.screen) === constants.SCREEN.TRAY_TEMPLATE){
                                    if(this.profileId === constants.PROFILES.CREDIT_COLLECTION_BOSS ||
                                      this.profileId === constants.PROFILES.CREDIT){
                                     window.location.href = constants.ROUTES.TRAY_CREDIT_EVALUATION;
                                   }else{
                                     window.location.href = constants.ROUTES.TRAY_CONTRACT_TEMPLATE;
                                   }
                                  }
                                }
                              }else{
                                this.modalMessage.warning(response.message);
                              }
                            },
                            (error: any) => {
                              this.loadingDisapprove = false;
                              this.modalMessage.error(constants.MESSAGE.ERROR);
                            });
      }
    );
  }

}

