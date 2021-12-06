import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { collectionTypesMock } from 'src/app/core/mocks/collection-type.mock';
import { conceptsMock } from 'src/app/core/mocks/concepts.mock';
import { AdvanceService } from 'src/app/features/services/advanceServices/advance.service';
import { ContractService } from 'src/app/features/services/contractServices/contract.service';
import { constants } from 'src/app/shared/utility/constants';

@Component({
  selector: 'app-discount-section',
  templateUrl: './discount-section.component.html',
  styleUrls: ['./discount-section.component.scss']
})
export class DiscountSectionComponent {

  @Input() contractTemplate: Array<any> = [];
  
  frmDescuento: FormGroup;

  contractTemplateExceptionList: Array<any> = [];
  contractTemplateDiscount: Array<any> = [];
  contractTemplateAddendumList: Array<any> = [];
  currencyList: Array<any> = [];
  motiveAddendumList: Array<any> = [];
  conceptList: Array<any> = conceptsMock;
  collectionTypeList: Array<any>  = collectionTypesMock;
  typeList: Array<any> = [];

  loadingTableContractTemplateDiscount: boolean = false;

  contractTemplateId: any;

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private advanceService: AdvanceService
  ) { }

  ngOnChanges(): void {
    this.initForm();
    if(this.contractTemplate[0] === undefined) return;
    this.setProperty();
    this.getList();
  }

  initForm(){
    this.frmDescuento = this.formBuilder.group({

    });
  }

  setProperty(){
    this.contractTemplateId = this.contractTemplate[0].contPlantIcod;
  }

  getList(){
    this.loadingTableContractTemplateDiscount = true;
    forkJoin([
      this.advanceService.getCurrencies(0),
      this.advanceService.getParameterDetail(constants.PARAMETER.MOTIVE_ADDENDUM),
      this.contractService.getContractsTemplateExceptionSearchIntegrator(Number(this.contractTemplateId)),
      this.contractService.getContractsTemplateAddendumSearch({cont_c_plant_icod: this.contractTemplateId})
    ]).subscribe(result => {
      this.currencyList = result[0];
      this.motiveAddendumList = result[1];
      this.contractTemplateExceptionList = result[2];
      this.contractTemplateAddendumList = result[3];
    },
    (error: any) => {
      console.log(error);
    },
    () => {
      this.typeList.push({
        id: this.collectionTypeList[2].id,
        description: this.collectionTypeList[2].description
      });
      this.setMapperContractTemplateException();
      this.loadingTableContractTemplateDiscount = false;
    });
  }

  setMapperContractTemplateException(){
    this.contractTemplateDiscount = [];
    if(this.contractTemplateExceptionList.length > 0){
      let array: any;
      this.contractTemplateExceptionList.forEach(item => {
        array = {
          conceptId: item.details[0].cont_exsub_icod,
          conceptName: this.conceptList.find(x => Number(x.id) === Number(item.details[0].cont_exsub_icod)).description,
          motiveId: item.aden_tipmot,
          motiveName: this.motiveAddendumList.find(x => Number(x.parameterDetailId) === Number(item.aden_tipmot)).description,
          currencyId: item.details[0].moneda_c_yid,
          currencyName: this.currencyList.find(x => Number(x.currencyId) === Number(item.details[0].moneda_c_yid)).currencyName,
          typeId: item.details[0].cont_exsub_c_btipo,
          typeName: this.typeList.find(x => Number(x.id) === Number(item.details[0].cont_exsub_c_btipo)).description,
          discount: item.details[0].cont_exsub_c_emonto,
          discountEmit: item.details[0].cont_exsub_c_pcont,
          startValidity: item.cont_ex_c_dfec_ini,
          endValidity: item.cont_ex_c_dfec_fin,
          identifier: Math.random(),
          exceptionId: item.cont_ex_c_iid,
          value: ''
        };
        this.contractTemplateDiscount.push(array);
      });
    }
  }

}
