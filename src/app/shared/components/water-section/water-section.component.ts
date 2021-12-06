import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ContractService } from 'src/app/features/services/contractServices/contract.service';
import { constants } from 'src/app/shared/utility/constants';
import { formatNumber, thousandsSeparator } from 'src/app/shared/utility/functions';

@Component({
  selector: 'app-water-section',
  templateUrl: './water-section.component.html',
  styleUrls: ['./water-section.component.scss']
})
export class WaterSectionComponent {

  @Input() contractTemplate: Array<any> = [];
  
  frmAgua: FormGroup;

  contractTemplateId: any;
  contractId: any;
  contractVersion: any;
  contractModification: any;
  contractServiceFound: Array<any> = [];
  contractTemplateServiceFound: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService
  ) { }

  ngOnChanges(): void {
    this.initForm();
    if(this.contractTemplate[0] === undefined) return;
    this.setProperty();
    this.getList();
  }

  initForm(){
    this.frmAgua = this.formBuilder.group({
      waterconsumptionprevious: [{value: '', disabled: true}],
      amountinvoicewaterprevious: [{value: '', disabled: true}],
      waterconsumption: [{value: '', disabled: true}],
      amountinvoicewater: [{value: '', disabled: true}]
    });
  }

  setProperty(){
    this.contractTemplateId = this.contractTemplate[0].contPlantIcod;
    this.contractId = this.contractTemplate[0].contCod;
    this.contractVersion = this.contractTemplate[0].contVer;
    this.contractModification = this.contractTemplate[0].contMod;
  }

  getList(){
    forkJoin([
      this.contractService.getContractsServiceSearch(this.contractId, this.contractVersion, this.contractModification),
      this.contractService.getContractTemplateServiceSearch({cont_c_plant_icod: this.contractTemplateId, conc_c_yid: constants.CONCEPT.WATER})
    ]).subscribe(result => {
      this.contractServiceFound = result[0];
      this.contractTemplateServiceFound = result[1];
    },
    (error: any) => {
      console.log(error);
    },
    () => {
      this.setDataWaterContract();
      this.setDataWater();
    });
  }

  setDataWaterContract(){
    this.frmAgua.get('waterconsumptionprevious').setValue('NO APLICA');
    this.frmAgua.get('amountinvoicewaterprevious').setValue('NO APLICA');

    if(this.contractServiceFound.length > 0){
      let found = this.contractServiceFound.find(x => Number(x.type) === constants.CONCEPT.WATER);
      if(found){
        if(Number(found.isFixed) === 1){
          this.frmAgua.get('waterconsumptionprevious').setValue('Fijo');
          this.frmAgua.get('amountinvoicewaterprevious').setValue(thousandsSeparator(found.amount));
        }else{
          this.frmAgua.get('waterconsumptionprevious').setValue('VARIABLE');
          this.frmAgua.get('amountinvoicewaterprevious').setValue(thousandsSeparator('SEGÚN CONSUMO'));
        }
      }
    }
  }

  setDataWater(){
    if(this.contractTemplateServiceFound.length > 0){
      let contractServiceWaterFound = this.contractTemplateServiceFound.find(x => Number(x.conc_c_yid) === constants.CONCEPT.WATER);
      if(contractServiceWaterFound){
        if(contractServiceWaterFound.conc_fijo_c_yid === 1){
          this.frmAgua.get('waterconsumption').setValue('Fijo');
          this.frmAgua.get('amountinvoicewater').setValue(formatNumber(contractServiceWaterFound.conc_c_emonto_fijo));
        }else{
          this.frmAgua.get('waterconsumption').setValue('VARIABLE');
          this.frmAgua.get('amountinvoicewater').setValue('SEGÚN CONSUMO');
        }
      }else{
        this.frmAgua.get('waterconsumption').setValue('NO APLICA');
        this.frmAgua.get('amountinvoicewater').setValue('NO APLICA');
      }
    }else{
      this.frmAgua.get('waterconsumption').setValue('NO APLICA');
      this.frmAgua.get('amountinvoicewater').setValue('NO APLICA');
    }
  }

}
