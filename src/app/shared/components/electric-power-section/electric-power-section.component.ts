import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ContractService } from 'src/app/features/services/contractServices/contract.service';
import { formatNumber, thousandsSeparator } from 'src/app/shared/utility/functions';

@Component({
  selector: 'app-electric-power-section',
  templateUrl: './electric-power-section.component.html',
  styleUrls: ['./electric-power-section.component.scss']
})
export class ElectricPowerSectionComponent {

  @Input() contractTemplate: Array<any> = [];
  
  frmEnerciaElectrica: FormGroup;

  contractTemplateId: any;
  itemId: any;
  contractItemId: any;
  subItemId: any;
  contractId: any;
  contractVersion: any;
  contractModification: any;
  contractElectricPowerFound: Array<any> = [];
  contractTemplateConsumptionFound: Array<any> = [];
  regularTypeLoadsList: Array<any> = [];
  contractList: Array<any> = [];
  contractItemDetailFound: Array<any> = [];
  contractConsumptionFound: any;

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
    this.frmEnerciaElectrica = this.formBuilder.group({
      chargeelectricalenergyprevious: [{value: '', disabled: true}],
      amountinvoiceprevious: [{value: '', disabled: true}],
      electricalenergyconsumptionprevious: [{value: '', disabled: true}],
      chargeelectricalenergy: [{value: '', disabled: true}],
      amountinvoice: [{value: '', disabled: true}],
      electricalenergyconsumption: [{value: '', disabled: true}]
    });
  }

  setProperty(){
    this.contractTemplateId = this.contractTemplate[0].contPlantIcod;
    this.itemId = this.contractTemplate[0].rubroId;
    this.subItemId = (this.contractTemplate[0].rubroSubId === null) ? 0: this.contractTemplate[0].rubroSubId;
    this.contractId = this.contractTemplate[0].contCod;
    this.contractVersion = this.contractTemplate[0].contVer;
    this.contractModification = this.contractTemplate[0].contMod;
  }

  getList(){
    forkJoin([
      this.contractService.getItemDetailSearch({ rubro_c_yid: this.itemId }),
      this.contractService.getContractTemplateConsumptionSearch({ cont_c_plant_icod: this.contractTemplateId }),
      this.contractService.getItemSubtypeLoadSearch({ rubro_sub_c_iid: this.subItemId, par_det_c_iid_clase_carga: 115 })
    ]).subscribe(result => {
      this.contractElectricPowerFound = result[0];
      this.contractTemplateConsumptionFound = result[1];
      this.regularTypeLoadsList = result[2];
    },
    (error: any) => {
      console.log(error);
    },
    () => {
      this.setDataElectricPower();
      this.setDataElectricPowerContract();
    })
  }

  setDataElectricPowerContract(){
    forkJoin([
      this.contractService.getContracts({ ContractId: this.contractId, ContractVersion: this.contractVersion, ContractModification: this.contractModification }),
      this.contractService.getContractsConsumptionSearchIntegrator({cont_c_icod: this.contractId, cont_c_yver: this.contractVersion, cont_c_ymod: this.contractModification})
    ]).subscribe(result => {
      this.contractList = result[0];
      this.contractConsumptionFound = result[1];
    },
    (error: any) => {
      console.log(error);
    },
    () => {
      this.frmEnerciaElectrica.get('chargeelectricalenergyprevious').setValue('NO APLICA');
      this.frmEnerciaElectrica.get('amountinvoiceprevious').setValue('NO APLICA');
      this.frmEnerciaElectrica.get('electricalenergyconsumptionprevious').setValue('NO APLICA');
      this.contractService.getItemDetailSearch({ rubro_c_yid: this.contractList[0].activityId })
                .subscribe((result: any) => {
                  if(result.length > 0){
                    let found = result.find((x: any) => Number(x.rubro_det_c_iid) === Number(this.contractTemplate[0].rubroDetId));
                    if(found) this.frmEnerciaElectrica.get('chargeelectricalenergyprevious').setValue(found.rubro_det_c_ewatts_text);
                  }
                });
      if(this.contractConsumptionFound === null) return;
      this.frmEnerciaElectrica.get('amountinvoiceprevious')!.setValue(this.contractConsumptionFound.det_reg_com_tipo_car_det_c_vnom);
      this.frmEnerciaElectrica.get('electricalenergyconsumptionprevious')!.setValue(this.contractConsumptionFound.cab_reg_com_tipo_car_c_vnom);
    });
  }

  setDataElectricPower(){
    if(this.contractElectricPowerFound.length > 0){
      let found = this.contractElectricPowerFound.find(x => Number(x.rubro_det_c_iid) === Number(this.contractTemplate[0].rubroDetId));
      if(found){
        this.frmEnerciaElectrica.get('chargeelectricalenergy').setValue(found.rubro_det_c_ewatts_text);
      }else{
        this.frmEnerciaElectrica.get('chargeelectricalenergy').setValue('NO APLICA');
      }
    }else{
      this.frmEnerciaElectrica.get('chargeelectricalenergy').setValue('NO APLICA');
    }
    if(this.contractTemplateConsumptionFound.length > 0){
      this.frmEnerciaElectrica.get('amountinvoice').setValue(this.contractTemplateConsumptionFound[0].det_reg_com_tipo_car_det_c_vnom);
    }
    if(this.regularTypeLoadsList.length > 0){
      let found = this.regularTypeLoadsList.find(x => Number(x.com_tipo_car_c_iid) === 2)
      this.frmEnerciaElectrica.get('electricalenergyconsumption').setValue(found.com_tipo_car_c_vnom);
    }
    
  }

}
