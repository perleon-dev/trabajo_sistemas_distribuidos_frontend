import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ContractService } from 'src/app/features/services/contractServices/contract.service';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { formatNumber, thousandsSeparator } from 'src/app/shared/utility/functions';

@Component({
  selector: 'app-guarantee-section',
  templateUrl: './guarantee-section.component.html',
  styleUrls: ['./guarantee-section.component.scss']
})
export class GuaranteeSectionComponent {

  @Input() contractTemplate: Array<any> = [];
  
  frmGarantia: FormGroup;
  contractTemplateId: any;
  loadingSping: boolean = false;
  guaranteeTypeList: Array<any> = [];
  contractTemplateGuaranteeFound: Array<any> = [];
  contractVisaGuaranteeFound : Array<any> = [];
  contractGuaranteeFound: Array<any> = [];

  contractId: any;
  contractVersion: any;
  contractModification: any;

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private dateFormatPipe: DateFormatPipe
  ) { }

  ngOnChanges(): void {
    this.initForm();
    if(this.contractTemplate[0] === undefined) return;
    this.setProperty();
    this.getList();
  }

  initForm(){
    this.frmGarantia = this.formBuilder.group({
      rentnumberprevious: [{value: '', disabled: true}],
      guaranteetypeprevious: [{value: '', disabled: true}],
      guaranteeamountprevious: [{value: '', disabled: true}],
      additionalguaranteeprevious: [{value: '', disabled: true}],
      rentnumber: [{value: '', disabled: true}],
      guaranteetype: [{value: '', disabled: true}],
      guaranteeamount: [{value: '', disabled: true}],
      maximundeliverydate: [{value: '', disabled: true}],
      additionalguarantee: [{value: '', disabled: true}],
      guaranteestate: [{value: '', disabled: true}],
      rbtgguaranterestriction: [{value: '', disabled: true}]
    });
  }

  setProperty(){
    this.contractTemplateId = this.contractTemplate[0].contPlantIcod;
    this.contractId = this.contractTemplate[0].contCod;
    this.contractVersion = this.contractTemplate[0].contVer;
    this.contractModification = this.contractTemplate[0].contMod;
  }

  getList(){
    this.loadingSping = true;
    forkJoin([
      this.contractService.getGuaranteeTypePaymentTemplate({}),
      this.contractService.getContractsTemplateGuaranteeSearch({contractTemplateId: this.contractTemplateId}),
      this.contractService.getContractsVisaGuaranteeSearch({ContractTemplateId: this.contractTemplateId}),
      this.contractService.getContractsGuaranteeSearch({contractId: this.contractId, contractVersion: this.contractVersion, contractModification: this.contractModification})
    ]).subscribe(result => {
      this.guaranteeTypeList = result[0];
      this.contractTemplateGuaranteeFound = result[1];
      this.contractVisaGuaranteeFound = result[2];
      this.contractGuaranteeFound = result[3];
    },
    (error: any) => {
      console.log(error);
      this.loadingSping = false;
    },
    () => {
      this.setDataGuaranteeContract();
      this.setDataGuarantee();
      this.loadingSping = false;
    });
  }

  setDataGuaranteeContract(){
    this.frmGarantia.get('rentnumberprevious').setValue('NO APLICA');
    this.frmGarantia.get('guaranteetypeprevious').setValue('NO APLICA');
    this.frmGarantia.get('guaranteeamountprevious').setValue('NO APLICA');
    this.frmGarantia.get('additionalguaranteeprevious').setValue('NO APLICA');
    
    if(this.contractGuaranteeFound.length > 0){
      this.frmGarantia.get('rentnumberprevious').setValue(thousandsSeparator(this.contractGuaranteeFound[0].rentNumber));
      let guaranteeTypeFound = this.guaranteeTypeList.find(x => Number(x.guaranteeTypePaymentTemplateId) === Number(this.contractGuaranteeFound[0].guaranteeType));
      if(guaranteeTypeFound){
        this.frmGarantia.get('guaranteetypeprevious').setValue(guaranteeTypeFound.guaranteeTypePaymentTemplateName);
      }
      this.frmGarantia.get('guaranteeamountprevious').setValue(thousandsSeparator(this.contractGuaranteeFound[0].amount));
      this.frmGarantia.get('additionalguaranteeprevious').setValue(thousandsSeparator(this.contractGuaranteeFound[0].amount));
    }     
  }

  setDataGuarantee(){
    if(this.contractTemplateGuaranteeFound.length > 0){
      this.frmGarantia.get('rentnumber').setValue(this.contractTemplateGuaranteeFound[0].rentNumber);

      let guaranteeTypeFound = this.guaranteeTypeList.find(x => Number(x.guaranteeTypePaymentTemplateId) === Number(this.contractTemplateGuaranteeFound[0].guaranteeType));
      if(guaranteeTypeFound){
        this.frmGarantia.get('guaranteetype').setValue(guaranteeTypeFound.guaranteeTypePaymentTemplateName);
      }

      this.frmGarantia.get('guaranteeamount').setValue(thousandsSeparator(this.contractTemplateGuaranteeFound[0].amount));
      this.frmGarantia.get('maximundeliverydate').setValue(this.dateFormatPipe.transform(this.contractTemplateGuaranteeFound[0].maximunDate));
      this.frmGarantia.get('additionalguarantee').setValue('NO APLICA');

      if(this.contractTemplateGuaranteeFound[0].restriction){
        this.frmGarantia.get('rbtgguaranterestriction').setValue("1");
      }else{
        this.frmGarantia.get('rbtgguaranterestriction').setValue("0");
      }
    }else{
      this.frmGarantia.get('rentnumber').setValue('NO APLICA');
      this.frmGarantia.get('guaranteetype').setValue('NO APLICA');
      this.frmGarantia.get('guaranteeamount').setValue('NO APLICA');
      this.frmGarantia.get('maximundeliverydate').setValue('NO APLICA');
      this.frmGarantia.get('additionalguarantee').setValue('NO APLICA');
    }

    if(this.contractVisaGuaranteeFound.length > 0){
      this.frmGarantia.get('guaranteestate').setValue(this.contractVisaGuaranteeFound[0].visad_c_estado);
    }else{
      this.frmGarantia.get('guaranteestate').setValue('Sin Asignar');
    }

  }

}
