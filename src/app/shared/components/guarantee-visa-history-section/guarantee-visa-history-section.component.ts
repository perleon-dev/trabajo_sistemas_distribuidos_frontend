import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ContractService } from 'src/app/features/services/contractServices/contract.service';

@Component({
  selector: 'app-guarantee-visa-history-section',
  templateUrl: './guarantee-visa-history-section.component.html',
  styleUrls: ['./guarantee-visa-history-section.component.scss']
})
export class GuaranteeVisaHistorySectionComponent {

  @Input() contractTemplate: Array<any> = [];
  
  frmHistorialVisadoGarantia: FormGroup;

  contractTemplateId?: number;
  contractVisaGuaranteeList: Array<any> = [];
  loadingTable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService
  ) { }

  ngOnChanges(): void {
    this.initForm();
    if(this.contractTemplate[0] === undefined) return;
    this.setProperty();
    this.initList();
  }

  initForm(){
    this.frmHistorialVisadoGarantia = this.formBuilder.group({

    });
  }

  setProperty(){
    this.contractTemplateId = this.contractTemplate[0].contPlantIcod;
  }

  initList(){
    this.loadingTable = true;
    forkJoin([
      this.contractService.getContractsTemplateGuaranteeSearchIntegrator(this.contractTemplateId)
    ]).subscribe(result => {
      this.contractVisaGuaranteeList = result[0].contractVisaGuarantees;
    },
    (error: any) => {
      this.loadingTable = false;
      console.log(error);
    },
    () => {
      this.loadingTable = false;
    })
  }

}
