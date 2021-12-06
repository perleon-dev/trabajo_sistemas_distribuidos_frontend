import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ContractService } from 'src/app/features/services/contractServices/contract.service';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-application-date-section',
  templateUrl: './application-date-section.component.html',
  styleUrls: ['./application-date-section.component.scss']
})
export class ApplicationDateSectionComponent {

  @Input() contractTemplate: Array<any> = [];
  
  frmFechaAplication: FormGroup;
  contractTemplateId: any;
  contractId: any;
  contractVersion: any;
  contractModification: any;
  loadingSping: boolean = false;

  contractTemplateFixedRentFound: Array<any> = [];
  contractTemplateCommonExpenseFound: Array<any> = [];
  contractTemplatePromotionExpenseFound: Array<any> = [];
  contractFixedRentFound: any;
  contractCommonExpenseFound: any;
  contractPromotionExpense: any;

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private dateFormatPipe: DateFormatPipe
  ) { }

  ngOnChanges(): void {
    this.initForm();
    if(this.contractTemplate[0] === undefined) return;
    this.setProperty();
    this.getListApplicationDate();
  }

  initForm(){
    this.frmFechaAplication = this.formBuilder.group({
      fixedrentipcprevious: [{value: '', disabled: true}],
      commonexpenseipcprevious: [{value: '', disabled: true}],
      promotionexpenseipcprevious: [{value: '', disabled: true}],
      projectexpenseipcprevious: [{value: '', disabled: true}],
      fixedrentipc: [{value: '', disabled: true}],
      commonexpenseipc: [{value: '', disabled: true}],
      promotionexpenseipc: [{value: '', disabled: true}],
      projectexpenseipc: [{value: '', disabled: true}]
    });
  }

  setProperty(){
    this.contractTemplateId = this.contractTemplate[0].contPlantIcod;
    this.contractId = this.contractTemplate[0].contCod;
    this.contractVersion = this.contractTemplate[0].contVer;
    this.contractModification = this.contractTemplate[0].contMod;
  }

  getListApplicationDate(){
    this.loadingSping = true;
    forkJoin([
      this.contractService.getContractsTemplateFixedRentSearch({ContractTemplateId: this.contractTemplateId}),
      this.contractService.getContractsTemplateCommonExpenseSearch({contractTemplateId: this.contractTemplateId}),
      this.contractService.getContractsTemplatePromotionExpenseSearch({contractTemplateId: this.contractTemplateId}),
      this.contractService.getContractsFixedRentSearchIntegrator({ContractId: this.contractId, ContractVersion: this.contractVersion, ContractModification: this.contractModification}),
      this.contractService.getContractsCommonExpenseSearchIntegrator({ContractId: this.contractId, ContractVersion: this.contractVersion, ContractModification: this.contractModification}),
      this.contractService.getContractsPromotionExpenseSearchIntegrator({ContractId: this.contractId, ContractVersion: this.contractVersion, ContractModification: this.contractModification})
    ]).subscribe(result => {
      this.contractTemplateFixedRentFound = result[0];
      this.contractTemplateCommonExpenseFound = result[1];
      this.contractTemplatePromotionExpenseFound = result[2];
      this.contractFixedRentFound = result[3].fixedRent;
      this.contractCommonExpenseFound = result[4].commonExpense;
      this.contractPromotionExpense = result[5].promotionFund;
    },
    (error: any) => {
      console.log(error);
      this.loadingSping = false;
    },
    () => {
      this.setDataApplicationDate();
      this.setDataApplicationDateContract();
    });
  }

  setDataApplicationDateContract(){
    let contractFixedRentId: Number;
    this.frmFechaAplication.get('fixedrentipcprevious').setValue('NO APLICA');
    this.frmFechaAplication.get('projectexpenseipcprevious').setValue('NO APLICA');
    if(this.contractFixedRentFound !== undefined){
      contractFixedRentId = this.contractFixedRentFound.contractFixedRentId;
      if(this.contractFixedRentFound.contractFixedRentIpcDate !== null){
        this.frmFechaAplication.get('fixedrentipcprevious').setValue(this.dateFormatPipe.transform(this.contractFixedRentFound.contractFixedRentIpcDate));
      }

      if(this.contractFixedRentFound.contractFixedRentDetails.length > 0){
        if(this.contractFixedRentFound.contractFixedRentDetails[0].startDate !== null){
          this.frmFechaAplication.get('projectexpenseipcprevious').setValue(this.dateFormatPipe.transform(this.contractFixedRentFound.contractFixedRentDetails[0].startDate));
        }
      }

    }

    this.frmFechaAplication.get('commonexpenseipcprevious').setValue('NO APLICA');
    if(this.contractCommonExpenseFound !== undefined){
      if(this.contractCommonExpenseFound.contractCommonExpenseIpcDate !== null){
        this.frmFechaAplication.get('commonexpenseipcprevious').setValue(this.dateFormatPipe.transform(this.contractCommonExpenseFound.contractCommonExpenseIpcDate));
      }
    }

    this.frmFechaAplication.get('promotionexpenseipcprevious').setValue('NO APLICA');
    if(this.contractPromotionExpense !== undefined){
      if(this.contractPromotionExpense.contractPromotionFundIpcDate !== null){
        this.frmFechaAplication.get('promotionexpenseipcprevious').setValue(this.dateFormatPipe.transform(this.contractPromotionExpense.contractPromotionFundIpcDate));
      }
    }
  }

  setDataApplicationDate(){
    let contractTemplateFixedRentId: any;
    if(this.contractTemplateFixedRentFound.length > 0){
      contractTemplateFixedRentId = this.contractTemplateFixedRentFound[0].contractTemplateFixedRentId;
      if(this.contractTemplateFixedRentFound[0].contractFixedRentIpcDate === null){
        this.frmFechaAplication.get('fixedrentipc').setValue('NO APLICA');
      }else{
        this.frmFechaAplication.get('fixedrentipc').setValue(this.dateFormatPipe.transform(this.contractTemplateFixedRentFound[0].contractFixedRentIpcDate));
      }   
    }else{
      this.frmFechaAplication.get('fixedrentipc').setValue('NO APLICA');
    }

    if(this.contractTemplateCommonExpenseFound.length > 0){
      if(this.contractTemplateCommonExpenseFound[0].ipcDate === null){
        this.frmFechaAplication.get('commonexpenseipc').setValue('NO APLICA');
      }else{
        this.frmFechaAplication.get('commonexpenseipc').setValue(this.dateFormatPipe.transform(this.contractTemplateCommonExpenseFound[0].ipcDate));
      }
    }else{
      this.frmFechaAplication.get('commonexpenseipc').setValue('NO APLICA');
    }

    if(this.contractTemplatePromotionExpenseFound.length > 0){
      if(this.contractTemplatePromotionExpenseFound[0].ipcDate === null){
        this.frmFechaAplication.get('promotionexpenseipc').setValue('NO APLICA');
      }else{
        this.frmFechaAplication.get('promotionexpenseipc').setValue(this.dateFormatPipe.transform(this.contractTemplatePromotionExpenseFound[0].ipcDate));
      }      
    }else{
      this.frmFechaAplication.get('promotionexpenseipc').setValue('NO APLICA');
    }

    this.contractService.getContractsTemplateFixedRentDetailSearch({ContractFixedRentId: contractTemplateFixedRentId})
                        .subscribe((response: any) => {
                            if(response.length > 0){
                              if(response[0].startDate === null){
                                this.frmFechaAplication.get('projectexpenseipc').setValue('NO APLICA');
                              }else{
                                this.frmFechaAplication.get('projectexpenseipc').setValue(this.dateFormatPipe.transform(response[0].startDate));
                              }
                              this.loadingSping = false;
                            }
                        },
                        (error: any) => {
                          this.loadingSping = false;
                        });

  }

}
