import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { forkJoin } from 'rxjs';
import { ContractService } from 'src/app/features/services/contractServices/contract.service';
import { constants } from '../../utility/constants';
import { Modal } from '../../utility/modal';
import { AddGuaranteeModalComponent } from '../add-guarantee-modal/add-guarantee-modal.component';

@Component({
  selector: 'app-add-guarantee-section',
  templateUrl: './add-guarantee-section.component.html',
  styleUrls: ['./add-guarantee-section.component.scss']
})
export class AddGuaranteeSectionComponent {

  @Input() contractTemplate: Array<any> = [];
  
  frmAgregarGarantia: FormGroup;
  contractTemplateId?: number;

  contractTemplateGuarranteList: Array<any> = [];
  contractTemplateFixedRentList: Array<any> = [];
  contractTemplateFixedRentView: Array<any> = [];
  guaranteeTypePaymentList: Array<any> = [];
  loadingSubmit: boolean = false;
  loadingApproved: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private modalMessage: Modal,
    private modalService: NzModalService
  ) { }

  ngOnChanges(): void {
    this.initForm();
    if(this.contractTemplate[0] === undefined) return;
    this.setProperty();
    this.initList();
  }

  initForm(){
    this.frmAgregarGarantia = this.formBuilder.group({

    });
  }

  setProperty(){
    this.contractTemplateId = this.contractTemplate[0].contPlantIcod;
  }

  initList(){
    forkJoin([
      this.contractService.getContractsTemplateGuaranteeSearch({contractTemplateId: this.contractTemplateId}),
      this.contractService.getFixedRentValiditySearch({ContractTemplateId: this.contractTemplateId }),
      this.contractService.getGuaranteeTypePaymentTemplate({})
    ]).subscribe(result => {
      this.contractTemplateGuarranteList = result[0];
      this.contractTemplateFixedRentList = result[1];
      this.guaranteeTypePaymentList = result[2];
    },
    (error: any) => {
      console.log(error);
    },
    () => {
      this.setMapperContractTemplateGuarantee();
    });
  }

  setMapperContractTemplateGuarantee(){
    this.contractTemplateGuarranteList.forEach(item => {
      let found = this.contractTemplateFixedRentList.find(x => Number(x.contractValidityId) === Number(item.contractValidityId));
      if(found) item.fixedRentSubAmountText = found.fixedRentSubAmountText;
      else item.fixedRentSubAmountText = '';

      found = this.guaranteeTypePaymentList.find(x => Number(x.guaranteeTypePaymentTemplateId) === Number(item.guaranteeType));
      if(found) item.guaranteeTypePaymentTemplateName = found.guaranteeTypePaymentTemplateName;
      else item.guaranteeTypePaymentTemplateName = '';
      item.index = Math.random();
    });
  }

  updateRestriction(check: any, index: any){
    let found = this.contractTemplateGuarranteList.find(x => x.index === index);
    if(found) found.restriction = check;
  }

  onDeleteGuarantee(index: any){
    this.modalMessage.confirm(
      constants.MESSAGE.CONFIRM_QUESTION,
      () => {
        let indexFound = this.contractTemplateGuarranteList.findIndex(x => x.index == index);
        if(indexFound !== -1){
          this.contractTemplateGuarranteList.splice(indexFound, 1);
        }
      }
    );
  }

  openAddGuaranteeModal(index?: any){  
    let modal = this.modalService.create({
      nzTitle: constants.MODAL_TITLE.ADD_GUARANTEE_MODAL,
      nzWidth: '600',
      nzContent: AddGuaranteeModalComponent,
      nzComponentParams: {
        contractTemplateId: this.contractTemplateId,
        contractTemplateGuaranteeList: this.contractTemplateGuarranteList,
        index: index
      }
    });

    modal.afterClose.subscribe(result => {
      if(result !== undefined){
        this.contractTemplateGuarranteList = [];
        this.contractTemplateGuarranteList = result.contractTemplateGuaranteeList;
      }
    });
  }

  setCommand(): Array<any>{
    let command: Array<any> = [];
    let array: any;
    this.contractTemplateGuarranteList.forEach((item: any) => {
      array= {
        contractTemplateId: this.contractTemplateId,
        amount: item.amount,
        contractValidityId: item.contractValidityId,
        maximunDate: item.maximunDate,
        rentNumber: item.rentNumber,
        guaranteeType: item.guaranteeType,
        previousBalance: item.previousBalance,
        renovationType: item.renovationType,
        restriction: item.restriction
      };
      command.push(array);
    });

    return command;
  }

  onSubmit(){
    this.modalMessage.confirm(
      constants.MESSAGE.CONFIRM_QUESTION,
      () => {
        this.loadingSubmit = true;
        let params = "{ contractTemplateGuarantee : " + JSON.stringify(this.setCommand()) + "}";
        this.contractService.postContractsTemplateGuaranteeUnified(params)
                            .subscribe(() => {
                              this.initList();
                              this.loadingSubmit = false;
                              this.modalMessage.success(constants.MESSAGE.SUCCESS_SAVE);
                            },
                            (error: any) => {
                              this.loadingSubmit = false;
                              this.modalMessage.error(constants.MESSAGE.ERROR);
                            });
      }
    );
  }

}
