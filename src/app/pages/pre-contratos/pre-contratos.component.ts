import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { constants } from 'src/app/shared/components/utility/constans';

@Component({
  selector: 'app-pre-contratos',
  templateUrl: './pre-contratos.component.html',
  styleUrls: ['./pre-contratos.component.css']
})
export class PreContratosComponent implements OnInit {

  user:any;
  userid:any;

  contractsTradenameList:any;
  isLoading:boolean = true;
  customerList: Array<any> = [];
  customerListFiltered: Array<any> = [];
  DocumentIdList: Array<any> = [];
  DocumentIdListFiltered: Array<any> = [];
  IdSumaList: Array<any> = [];
  IdSumaListFiltered: Array<any> = [];

  ListOption: any;
  
  LisAnulacionMasiva:any;
  
  objSendPrecontract:any;

  totalRows = 0;
  pageIndex = constants.PAGINATION.PAGE_INDEX;
  pageSize = constants.PAGINATION.PAGE_SIZE;
  frmMarketplaceContractValidity: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private contractService: ContractService,
              private advanceService: AdvanceService,
              private modalService: NzModalService,
              private message: NzMessageService,
              private modal: Modal) { }
  
  formGroup = this.formBuilder.group({
    ruc: [''],
    businessName: [''],
    tradename: [''],
    startDate:[''],
    endDate:['']
  });


  ngOnInit() {
      this.search();
      this.getFiltro();
      this.getFiltroIdSuma(); 
      this.getOpcionesSelect();
      this.user = JSON.parse(localStorage.getItem('identity'));
      this.userid = JSON.parse(localStorage.getItem('user'));
      
      this.LisAnulacionMasiva = {
        preContractList: [],
        state: constants.STATE_PRE_CONTRACT.INACTIVE,
        updateUserId: this.userid.user_id,
        updateUserFullname: this.user.user_lastname + ' ' + this.user.user_mother_lastname + ' '+ this.user.user_names
      }

      this.objSendPrecontract = {
        sendPreContractList: [],
        state: constants.STATE_PRE_CONTRACT.INPROCESS,
        registerUserId: this.userid.user_id,
        registerFullname: this.user.user_lastname + ' ' + this.user.user_mother_lastname + ' '+ this.user.user_names
      }
  }

  getFiltro(){
      this.contractService.getPreContractSearch(constants.STATE.ACTIVE).subscribe((response:any)=>{
        
        var filter_ruc = response.filter(el => el.ruc != null); //Descarto los datos null
        // evito datos repetidos
        var ruc = {};
        var unico_ruc = filter_ruc.filter(function (e) { 
          return ruc[e.ruc] ? false : (ruc[e.ruc] = true);
        });

        this.DocumentIdList = _.orderBy(unico_ruc, ['ruc'], ['asc']);
        this.DocumentIdListFiltered = this.DocumentIdList.slice(0, 10);
        
        var filter_business_name = response.filter(el => el.business_name != null);
        var business_name = {};
        var unico_business_name = filter_business_name.filter(function (e) { 
          return business_name[e.business_name] ? false : (business_name[e.business_name] = true);
        });

        this.customerList = _.orderBy(unico_business_name, ['business_name'], ['asc']);
        this.customerListFiltered = this.customerList.slice(0, 10);

      })
  }
  
  getOpcionesSelect(){
    this.advanceService.getParameterDetail(constants.PARAMETER.TIPO_SELLER).subscribe((data:any)=>{
      this.ListOption = data;
    });
  }

  pageIndexChanged(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.searchContract();
  }

  pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.searchContract();
  }
  
  searchContract(){
    this.isLoading = true;
    var startDate;
    var endDate;

    if(this.formGroup.value.startDate != '' && this.formGroup.value.startDate != null)
       startDate = formatDate(this.formGroup.value.startDate, 'yyyyMMdd', 'en-US');

    if(this.formGroup.value.endDate != '' && this.formGroup.value.endDate != null)
       endDate = formatDate(this.formGroup.value.endDate, 'yyyyMMdd', 'en-US');
    

    this.contractService.getPreContratos(
                            this.pageIndex,
                            this.pageSize,
                            this.formGroup.value.ruc ?? "",
                            this.formGroup.value.businessName ?? "",
                            this.formGroup.value.tradename ?? "",
                            startDate ?? "",
                            endDate ?? "",
                            constants.STATE.ACTIVE).subscribe((response:any)=>{
      this.contractsTradenameList = response.item1;
      this.totalRows = response.item2;
      this.isLoading = false;
    })

    if(this.DocumentIdListFiltered.length == 0 ){
      this.getFiltro();
    }
    
    if(this.IdSumaListFiltered.length == 0){
      this.getFiltroIdSuma();
    }

  }
  
  getFiltroIdSuma():void{

    this.contractService.getPreContractTradenameSearch(constants.STATE.ACTIVE).subscribe((response:any) => {
      var filter_tradename = response.filter((el:any) => el.tradename != null); // evito los null

      // evito datos repetidos
      var tradename : any = {};
      var unico_tradename = filter_tradename.filter(function (e:any) { 
        return tradename[e.tradename] ? false : (tradename[e.tradename] = true);
      });

      this.IdSumaList = _.orderBy(unico_tradename, ['tradename'], ['asc']);
      this.IdSumaListFiltered = this.IdSumaList.slice(0, 10);

    });
}

  search(){
    this.pageIndex = constants.PAGINATION.PAGE_INDEX;
    this.pageSize = constants.PAGINATION.PAGE_SIZE;
    this.searchContract()
  }

  clear(param:string): void {
    
    this.formGroup.controls[param].setValue('');
  }

  onInputCustomer(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.customerListFiltered = this.customerList.filter(x => x.business_name.toLowerCase().indexOf(value.toLowerCase()) !== -1).slice(0, 10);

  }

  onInputRuc(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.DocumentIdListFiltered = this.DocumentIdList.filter(x => x.ruc.toLowerCase().indexOf(value.toLowerCase()) !== -1).slice(0, 10);

  }
  
  onInputIdSuma(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.IdSumaListFiltered = this.IdSumaList.filter(x => x.tradename.toLowerCase().indexOf(value.toLowerCase()) !== -1).slice(0, 10);
  }

  compareCustomer = (o1: any | string, o2: any) => {
    if (o1) return typeof o1 === 'string' ? o1 === o2.business_name : o1.value === o2.business_name;
    else return false;
  };

  compareRuc = (o1: any | string, o2: any) => {
    if (o1) return typeof o1 === 'string' ? o1 === o2.ruc : o1.value === o2.ruc;
    else return false;
  };

  compareIdSuma = (o1: any | string, o2: any) => {
    if (o1) return typeof o1 === 'string' ? o1 === o2.tradename : o1 === o2.tradename;
    else return false;
  };
  
  toggle(source:any) : void {
    var checkboxes = <any>document.getElementsByName('seller');

    for(var i=0, n=checkboxes.length;i<n;i++) {
      checkboxes[i].checked = source.checked;
    }
  
  }
  
  openFormModal(): void {
    
      const modal = this.modalService.create({
        nzWidth: 620,
        nzTitle: '',
         nzContent: CargaMasivaModalComponent,
         nzComponentParams: {
          ListOption: this.ListOption 
        }
      });

      modal.afterClose.subscribe((result:any) => {
        if (result?.refresh)
          this.searchContract();
      });
  }

  sendPrecontract(): void{
    
    this.objSendPrecontract.sendPreContractList = [];
    var checkbox = <any>document.getElementsByName('seller');

    for(var i =0; i<checkbox.length; i++){
      if(checkbox[i].checked){
        var datos = checkbox[i].value;
        datos = datos.split("$$$");

        var json ={
          "contract_id": datos[1],
          "contract_version": datos[2],
          "contract_modification": datos[3],
          "ruc" : datos[0]
        }

        this.objSendPrecontract.sendPreContractList.push(json);
      }
    }
      
    if(this.objSendPrecontract.sendPreContractList.length == 0){
      this.message.warning("Minimo debe seleccionar un contrato");
      return;
    }
      
    this.modal.confirm('¿ Estas seguro de realizar esta acción ?', () => {

      this.contractService.postPreContractSendPreContract(this.objSendPrecontract)
      .subscribe((response:any) => {

        if(response.codeStatus == 200){
          this.search();
          this.getFiltro();
          this.getFiltroIdSuma(); 
          this.modal.success(response.message);
        } 
        else{
          this.modal.error(response.message);
        }

        this.ClearCheckTotal();

      });
    });
  }
  
  AnulacionMasiva() : void {
    this.LisAnulacionMasiva.preContractList = [];
    
    var checkbox = <any>document.getElementsByName('seller');

    for(var i =0; i<checkbox.length; i++){
      if(checkbox[i].checked){
        var datos = checkbox[i].value;
        datos = datos.split("$$$");

        var json =     {
          "contractId": datos[1],
          "contractVersion": datos[2],
          "contractModification": datos[3]
        }
    
       this.LisAnulacionMasiva.preContractList.push(json);
      }
    }
      
    if(this.LisAnulacionMasiva.preContractList.length == 0){
      this.message.warning("Minimo debe seleccionar un contrato");
      return;
    }
      
    
    this.modal.confirm('¿ Estas seguro de realizar esta acción ?', () => {

      this.contractService.putPreContractUpdateMassiveState(this.LisAnulacionMasiva)
      .subscribe((response:any) => {

        if(response.codeStatus == 200){
          this.search();
          this.getFiltro();
          this.getFiltroIdSuma();
          this.modal.success(response.message);
        } 
        else{
          this.modal.error(response.message);
        }
        this.ClearCheckTotal();

      });
    });
  }

  ClearCheckTotal():void{
    var x = <any>document.getElementById('checkboxTotal');
    x.checked = false;
  }
}
