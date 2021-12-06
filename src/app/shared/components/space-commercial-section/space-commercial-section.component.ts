import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AdvanceService } from 'src/app/features/services/advanceServices/advance.service';
import { ContractService } from 'src/app/features/services/contractServices/contract.service';
import { CustomersService } from 'src/app/features/services/customerServices/customer.service';
import { constants } from 'src/app/shared/utility/constants';
import { formatNumber, thousandsSeparator } from 'src/app/shared/utility/functions';
import { Modal } from 'src/app/shared/utility/modal';

@Component({
  selector: 'app-space-commercial-section',
  templateUrl: './space-commercial-section.component.html',
  styleUrls: ['./space-commercial-section.component.scss']
})
export class SpaceCommercialSectionComponent {

  @Input() contractTemplate: Array<any> = [];
  @Input() profileId: any = null;
  
  @Output() approveItem: EventEmitter<any> = new EventEmitter();

  frmEspacioComercial: FormGroup;
  loadingSpin: boolean = false;
  loadingUpdate: boolean = false;

  tradenameFound: any;
  customerFound: any;
  customerAddressFound: Array<any> = [];
  itemFound: Array<any> = [];
  subItemFound: Array<any> = [];
  customerContactFound: Array<any> = [];
  contractTemplateRepresentativeFound: Array<any> = [];
  creditEvaluationFound: Array<any> = [];
  contractList: Array<any> = [];

  localId: any;
  propertyId: any;
  tradenameId: any;
  customerId: any;
  itemId: any;
  subItemId: any;
  contractTemplateId: any;
  contractId: any;
  contractVersion: any;
  contractModification: any;

  pageLoading: boolean = false;

  istradenameitem: boolean = false;
  itemList: Array<any> = [];
  subItemList: Array<any> = [];

  loc_tipo_c_yid: any;
  userId: any;
  userFullname: any;
  isApproveItem: boolean = true;

  btnApproveItemLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private advanceService: AdvanceService,
    private modalMessage: Modal,
    private customersService: CustomersService,
    private contractService: ContractService
  ) { }

  ngOnChanges(): void {
    this.initForm();
    if(this.contractTemplate[0] === undefined) return;
    this.setProperties();
    this.getDataSpaceCommercial();
    this.getListCommercialInformation();
    this.getDataLocalStorage();
  }

  initForm(){
    this.frmEspacioComercial = this.formBuilder.group({
      localcodeprevious: [{value: '', disabled: true}],
      localareaprevious: [{value: '', disabled: true}],
      localtypeprevious: [{value: '', disabled: true}],
      cadastrenumberprevious: [{value: '', disabled: true}],
      propertylevelprevious: [{value: '', disabled: true}],
      localcode: [{value: '', disabled: true}],
      localarea: [{value: '', disabled: true}],
      localtype: [{value: '', disabled: true}],
      cadastrenumber: [{value: '', disabled: true}],
      propertylevel: [{value: '', disabled: true}],
      tradename: [{value: '', disabled: true}],
      turn: [{value: '', disabled: true}],
      businesshour: [{value: '', disabled: true}],
      item: [{value: '', disabled: true}],
      ruc: [{value: '', disabled: true}],
      subitem: [{value: '', disabled: true}],
      businessname: [{value: '', disabled: true}],
      centralriskstatus: [{value: '', disabled: true}],
      fiscaladdress: [{value: '', disabled: true}],
      comentaryriskcenter: [{value: '', disabled: true}],
      legalrepresentativeone: [{value: '', disabled: true}],
      legalrepresentativetwo: [{value: '', disabled: true}],
      startingnumber: [{value: '', disabled: true}],
      flagTipoPlantilla: [{value: '', disabled: true}],
      ddlitem: [null],
      ddlsubitem: [null]
    });
  }

  setProperties(){
    this.localId = this.contractTemplate[0].locCod;
    this.propertyId = this.contractTemplate[0].inmCod
    this.tradenameId = this.contractTemplate[0].nombComId;
    this.customerId = this.contractTemplate[0].cliDocId;
    this.itemId = this.contractTemplate[0].rubroId;
    this.subItemId = (this.contractTemplate[0].rubroSubId === null) ? 0: this.contractTemplate[0].rubroSubId;
    this.contractTemplateId = this.contractTemplate[0].contPlantIcod;
    this.contractId = this.contractTemplate[0].contCod;
    this.contractVersion = this.contractTemplate[0].contVer;
    this.contractModification = this.contractTemplate[0].contMod;
  }

  getDataSpaceCommercial(){
    this.loadingSpin = true;
    this.frmEspacioComercial.get('localcode').setValue(this.localId);
    this.frmEspacioComercial.get('localarea').setValue(formatNumber(this.contractTemplate[0].locAreaTot));
    this.advanceService.getLocal({LocalId: this.localId, PropertyId: this.propertyId})
                        .subscribe((response: any) => {
                          this.loc_tipo_c_yid = response[0].localType;
                        this.setDataSpaceCommercial(response);
                        },
                        (error: any) => {
                          this.loadingSpin = false;
                        });
  }

  setDataSpaceCommercial(response: any){
    if(response.length === 0){
      this.modalMessage.warning("El local " + this.localId + ", ha sido inhabilitado por favor comuniquese con Diseño de Tiendas para habilitar el local de la plantilla");
    }else{
      this.advanceService.getLocalTypes({localTypeId: response[0].localType , state : constants.STATE.ACTIVE})
                         .subscribe((result: any) => {
                          this.frmEspacioComercial.get('localtype').setValue(result[0].localTypeName);
                          this.loadingSpin = false;
                         });
      let cadastrenumber: any;
      if(response[0].localNumberCadastre === null) 
        cadastrenumber = "NO APLICA";
      else
        cadastrenumber = response[0].localNumberCadastre;
      
      this.frmEspacioComercial.get('cadastrenumber').setValue(cadastrenumber);
      this.frmEspacioComercial.get('propertylevel').setValue(response[0].localLevel.toString().trim());

      forkJoin([
        this.customersService.getTradenameItems(
          { nomb_com_id: this.tradenameId, typelocal: this.loc_tipo_c_yid  }
          ),
        this.advanceService.getItem({localTypeId: this.loc_tipo_c_yid,  state: constants.STATE.ACTIVE}),
        this.advanceService.getSubItem({itemId: this.itemId, state: constants.STATE.ACTIVE})
      ]).subscribe(
        result =>{
          let tradenameitems =  result[0].filter( t => t.rubroId == this.itemId && t.rubroSubId == this.subItemId && t.state == constants.STATE_TRADENAMEITEMS.PENDING);
          
          if( constants.PROFILES.COMMERCIAL_BOSS == this.profileId && tradenameitems.length > 0){
            this.istradenameitem = true;
            this.isApproveItem = false;
            this.approveItem.emit(false);
          }
          this.itemList = this.filterItemsComponents(result[1] , result[0].filter( t => t.state == constants.STATE_TRADENAMEITEMS.APPROVE) , false);
          this.subItemList = this.filterItemsComponents(result[2] , result[0].filter( t => t.state == constants.STATE_TRADENAMEITEMS.APPROVE), true);
          this.frmEspacioComercial.get('ddlitem').setValue( this.itemId );
          this.frmEspacioComercial.get('ddlsubitem').setValue( this.subItemId );
        }
      )
    }
  }

  setDataSpaceCommercialContract(){
    this.frmEspacioComercial.get('localcodeprevious').setValue(this.contractList[0].localId);
    this.frmEspacioComercial.get('localareaprevious').setValue(thousandsSeparator(this.contractList[0].localTotalArea));
    this.frmEspacioComercial.get('localtypeprevious').setValue(this.contractList[0].localTypeName);

    this.advanceService.getLocal({LocalId: this.contractList[0].localId, PropertyId: this.propertyId})
                        .subscribe((response: any) => {
                          this.advanceService.getLocalTypes({localTypeId: response[0].localType , state : constants.STATE.ACTIVE})
                              .subscribe((result: any) => {
                                this.frmEspacioComercial.get('localtypeprevious').setValue(result[0].localTypeName);
                              });
                          let cadastrenumber: any;
                          if(response[0].localNumberCadastre === null) 
                            cadastrenumber = "NO APLICA";
                          else
                            cadastrenumber = response[0].localNumberCadastre;
                          this.frmEspacioComercial.get('cadastrenumberprevious').setValue(cadastrenumber);
                          this.frmEspacioComercial.get('propertylevelprevious').setValue(response[0].localLevel.toString().trim());
                        },
                        (error: any) => {
                          this.loadingSpin = false;
                        });
  }

  getListCommercialInformation(){
    this.pageLoading = true;
    this.loadingSpin = true;
    forkJoin([
      this.advanceService.getTradenamebyId(this.tradenameId),
      this.customersService.getCustomerByDocument(this.customerId),
      this.customersService.getAddressesxDocument(this.customerId, constants.STATE.ACTIVE),
      this.advanceService.getItem({itemComponentId: this.itemId}),
      this.advanceService.getSubItem({subItemId: this.subItemId}),
      this.customersService.getContactsXDocument(this.customerId, constants.STATE.ACTIVE),
      this.contractService.getContractsTemplateRepresentativeSearch({contractTemplateId: this.contractTemplateId, state: constants.STATE.ACTIVE}),
      this.customersService.getCustomerCreditEvaluationCollection({customerId: this.customerId, state: constants.STATE.LETTERACTIVE}),
      this.contractService.getContracts({ ContractId: this.contractId, ContractVersion: this.contractVersion, ContractModification: this.contractModification }),
      

    ]).subscribe(result => {
      this.tradenameFound = result[0];
      this.customerFound = result[1];
      this.customerAddressFound = result[2];
      this.itemFound = result[3];
      this.subItemFound = result[4];
      this.customerContactFound = result[5];
      this.contractTemplateRepresentativeFound = result[6];
      this.creditEvaluationFound = result[7];
      this.contractList = result[8];

    },
    (error: any) => {
      console.log(error);
      this.loadingSpin = false;
      this.pageLoading = false;
    },
    () => {
      this.setDataCommercialInformation();
      this.setDataSpaceCommercialContract();
      this.loadingSpin = false;
      this.pageLoading = false;
    });
  }

  filterItemsComponents( items : Array<any> , filter: Array<any> , subtiem: boolean){
    var new_filter = [];
    if( filter.length > 0 ){
      if(!subtiem){  
        let itemsComponents = filter.map( m => m.rubroId );
        for (let index = 0; index < items.length; index++) {
          if( itemsComponents.indexOf( items[index].itemComponentId ) >= 0 ){
            new_filter.push(items[index]);
          }
        }
      }else{
        let itemsComponents = filter.map( m => m.rubroSubId );
        for (let index = 0; index < items.length; index++) {
          if( itemsComponents.indexOf( items[index].subItemId ) >= 0 ){
            new_filter.push(items[index]);
          }
        }
      }
    }else{
      new_filter = items;
    }
  
    return new_filter;
  }

  setDataCommercialInformation(){

    let turn: any;
    let businesshour: any;
    console.log(this.contractTemplate[0]);
    if(this.contractTemplate[0].contRubroDet === null) 
      turn = "NO APLICA";
    else
      turn = this.contractTemplate[0].contRubroDet;

    if(this.contractTemplate[0].contHorario === null)
      businesshour = "NO APLICA";
    else
      businesshour = this.contractTemplate[0].contHorario;
    this.frmEspacioComercial.get('flagTipoPlantilla').setValue(this.contractTemplate[0].flagTipoPlantilla === 1 ? "Digital": "Físico"); 
    this.frmEspacioComercial.get('tradename').setValue(this.tradenameFound.tradenameName);
    this.frmEspacioComercial.get('turn').setValue(turn);
    this.frmEspacioComercial.get('businesshour').setValue(businesshour);
    this.frmEspacioComercial.get('item').setValue(this.itemFound[0].name);
    this.frmEspacioComercial.get('ruc').setValue(this.customerId);
    this.frmEspacioComercial.get('subitem').setValue(this.subItemFound[0].subItemDescription);
    this.frmEspacioComercial.get('businessname').setValue(this.customerFound.businessName);

    //Fiscal Adderss
    let fiscalAddress = this.customerAddressFound.find(x => Number(x.type) === constants.ADDRESS_TYPE.FISCAL);
    if(fiscalAddress)
      this.frmEspacioComercial.get('fiscaladdress').setValue(fiscalAddress.address);

    this.frmEspacioComercial.get('startingnumber').setValue(this.customerFound.nroPartida);

    if(this.contractTemplateRepresentativeFound.length > 0){

      let legalRepresentativeOne: any;
      let legalRepresentativeTwo: any;
      let found: any; 
      let legalRepresentativeFound = this.customerContactFound.filter(x => Number(x.jobTitle) === constants.CONTACT.JOB_TITLE_REPRESENTANTE_LEGAL ||
      Number(x.jobTitle) === constants.CONTACT.JOB_TITLE_GENERAL_MANAGER);
      if(this.contractTemplateRepresentativeFound.length === 2){
               
        legalRepresentativeOne = this.contractTemplateRepresentativeFound.find(x => Number(x.rep_cont_c_iorden) === constants.CONTACT.ORDER_ONE);
        found = legalRepresentativeFound.find(x => Number(x.contactId) === Number(legalRepresentativeOne.cli_contac_c_iid));
        if(found){
          this.frmEspacioComercial.get('legalrepresentativeone').setValue(found.firstName + ' ' + found.secondLastName + ' ' + found.lastName);
        }
        legalRepresentativeTwo = this.contractTemplateRepresentativeFound.find(x => Number(x.rep_cont_c_iorden) === constants.CONTACT.ORDER_TWO);
        found = legalRepresentativeFound.find(x => Number(x.contactId) === Number(legalRepresentativeTwo.cli_contac_c_iid));
        if(found){
          this.frmEspacioComercial.get('legalrepresentativetwo').setValue(found.firstName + ' ' + found.secondLastName + ' ' + found.lastName);
        }
      }else{
        legalRepresentativeOne = this.contractTemplateRepresentativeFound.find(x => Number(x.rep_cont_c_iorden) === constants.CONTACT.ORDER_ONE);
        found = legalRepresentativeFound.find(x => Number(x.contactId) === Number(legalRepresentativeOne.cli_contac_c_iid));
        if(found){
          this.frmEspacioComercial.get('legalrepresentativeone').setValue(found.firstName + ' ' + found.secondLastName + ' ' + found.lastName);
          this.frmEspacioComercial.get('legalrepresentativetwo').setValue('--');
        }
      }  
    }else{
      this.frmEspacioComercial.get('legalrepresentativeone').setValue('--');
      this.frmEspacioComercial.get('legalrepresentativetwo').setValue('--');
    }
    if(this.creditEvaluationFound.length > 0){
      this.frmEspacioComercial.get('centralriskstatus').setValue(this.creditEvaluationFound[0].dictum);
      this.frmEspacioComercial.get('comentaryriskcenter')!.setValue(this.creditEvaluationFound[0].motive); 
    }
                                                                        
  }

  getCreditEvaluationSentinel(){
    this.loadingUpdate = true;
    this.contractService.getContractsCreditEvaluationSentinel({documentId: this.customerId, documentTypeId: constants.SENTINEL_DOCUMENT_TYPE.RUC})
                        .subscribe((result: any) => {
                          if(result.length > 0){
                            this.frmEspacioComercial.get('centralriskstatus').setValue(result[0].result);
                            this.frmEspacioComercial.get('comentaryriskcenter')!.setValue(result[0].motive);
                            this.modalMessage.success('Se actualizó la información crediticia del cliente');
                            this.loadingUpdate = false;
                          }
                        }, (error: any) =>{
                          this.loadingUpdate = false;
                          this.modalMessage.error(constants.MESSAGE.ERROR_SENTINEL_SERVICE);
                        });
  }


  getSubItemByItem(itemId: any){
    this.subItemList = [];
    if(itemId === null){
      this.frmEspacioComercial.get('ddlsubitem').setValue(null);
      return
    };
    
    this.frmEspacioComercial.get('ddlsubitem')!.setValue(null);
    forkJoin([
      this.advanceService.getSubItem({itemId: itemId, state: constants.STATE.ACTIVE}),
      this.customersService.getTradenameItems({ nomb_com_id: this.tradenameId  , state: constants.STATE_TRADENAMEITEMS.APPROVE})
    ]).subscribe(
      response => {
        this.subItemList = this.filterItemsComponents(response[0] , response[1] , true);

      }
    )
  }
  onApproveItem(){
    
    this.btnApproveItemLoading = true;
    let model = {
      nomb_com_rubro_yid : 0,
      profileId : this.profileId,
      update_user_id : this.userId,
      update_user_fullname : this.userFullname,
      stage : constants.STATE_TRADENAMEITEMS.APPROVE,
      nomb_com_c_iid : this.tradenameId,
      loc_tipo_c_yid : this.loc_tipo_c_yid,
      rubro_c_yid : this.frmEspacioComercial.value.ddlitem,
      rubro_sub_c_iid : this.frmEspacioComercial.value.ddlsubitem,
      rubro_c_yid_old: this.contractTemplate[0].rubroId,
      rubro_sub_c_iid_old: this.contractTemplate[0].rubroSubId
    }
    this.customersService.postTradenameItemApprove(model).subscribe(
      result => {
        this.modalMessage.success("Se Aprobo nueva configuración");
        this.isApproveItem = true;
        this.approveItem.emit(true);
        this.istradenameitem = false;

        this.contractTemplate[0].rubroId = this.frmEspacioComercial.value.ddlitem;
        this.contractTemplate[0].rubroSubId = this.frmEspacioComercial.value.ddlsubitem;
        this.contractService.putContractsTemplate(this.contractTemplate[0]).subscribe(res=>{})
        this.btnApproveItemLoading = false;
      },
      error => {
        this.modalMessage.error(constants.MESSAGE.ERROR);
        this.isApproveItem = false;
        this.istradenameitem = true;
        this.approveItem.emit(false);
      }
    );
  }

  getDataLocalStorage(){
    let user = JSON.parse(localStorage.getItem('user'));
    let identity = JSON.parse(localStorage.getItem('identity'));
    this.userFullname = user.user_name + ' ' + user.user_first_lastname + ' ' + user.user_second_lastname;
    this.userId = user.user_id;
  }
}
