import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContractService } from 'src/app/features/services/contractServices/contract.service';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-date-deadline-section',
  templateUrl: './date-deadline-section.component.html',
  styleUrls: ['./date-deadline-section.component.scss']
})
export class DateDeadlineSectionComponent {

  @Input() contractTemplate: Array<any> = [];
  
  frmFechaPlazo: FormGroup;
  contractTemplateId: any;
  contractId: any;
  contractVersion: any;
  contractModification: any;
  contractList: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private dateFormatPipe: DateFormatPipe,
    private contractService: ContractService
  ) { }

  ngOnChanges(): void {
    this.initForm();
    if(this.contractTemplate[0] === undefined) return;
    this.setProperties();
    this.setDataDateDeadLine();
    this.setDataDateDeadLineContract();
  }

  initForm(){
    this.frmFechaPlazo = this.formBuilder.group({
      contractsubscriptiondateprevious: [{value: '', disabled: true}],
      startdateoperationprevious: [{value: '', disabled: true}],
      localdeliverydateprevious: [{value: '', disabled: true}],
      contractenddateprevious: [{value: '', disabled: true}],
      projectdeliverydateprevious: [{value: '', disabled: true}],
      contractsubscriptiondate: [{value: '', disabled: true}],
      startdateoperation: [{value: '', disabled: true}],
      localdeliverydate: [{value: '', disabled: true}],
      contractenddate: [{value: '', disabled: true}],
      projectdeliverydate: [{value: '', disabled: true}]
    });
  }

  setProperties(){
    this.contractTemplateId = this.contractTemplate[0].contPlantIcod;
    this.contractId = this.contractTemplate[0].contCod;
    this.contractVersion = this.contractTemplate[0].contVer;
    this.contractModification = this.contractTemplate[0].contMod;
  }

  setDataDateDeadLine(){
    this.frmFechaPlazo.get('contractsubscriptiondate')!.setValue(this.dateFormatPipe.transform(this.contractTemplate[0].contFecFirma));
    this.frmFechaPlazo.get('localdeliverydate')!.setValue(this.dateFormatPipe.transform(this.contractTemplate[0].contFecEntrega));
    this.frmFechaPlazo.get('startdateoperation')!.setValue(this.dateFormatPipe.transform(this.contractTemplate[0].contFecIniFact));
    this.frmFechaPlazo.get('contractenddate')!.setValue(this.dateFormatPipe.transform(this.contractTemplate[0].contFecFin));
    this.frmFechaPlazo.get('projectdeliverydate')!.setValue(this.dateFormatPipe.transform(this.contractTemplate[0].contFecEntregaProy));
  }

  setDataDateDeadLineContract(){
    this.contractService.getContracts({ ContractId: this.contractId, ContractVersion: this.contractVersion, ContractModification: this.contractModification })
        .subscribe((response: any) => {
          this.frmFechaPlazo.get('contractsubscriptiondateprevious')!.setValue(this.dateFormatPipe.transform(response[0].signatureDate));
          this.frmFechaPlazo.get('localdeliverydateprevious')!.setValue(this.dateFormatPipe.transform(response[0].deliveryDate));
          this.frmFechaPlazo.get('startdateoperationprevious')!.setValue(this.dateFormatPipe.transform(response[0].billingStartDate));
          this.frmFechaPlazo.get('contractenddateprevious')!.setValue(this.dateFormatPipe.transform(response[0].endDate));
          this.frmFechaPlazo.get('projectdeliverydateprevious')!.setValue(this.dateFormatPipe.transform(response[0].projectDeliveryDate));
        });
  }

}
