import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { forkJoin } from 'rxjs';
import { ContractService } from 'src/app/features/services/contractServices/contract.service';
import { constants } from '../../utility/constants';
import { thousandsSeparator, validForm } from '../../utility/functions';
import { Modal } from '../../utility/modal';

@Component({
  selector: 'app-add-guarantee-modal',
  templateUrl: './add-guarantee-modal.component.html',
  styleUrls: ['./add-guarantee-modal.component.scss']
})
export class AddGuaranteeModalComponent implements OnInit {

  @Input() index?: any;
  @Input() contractTemplateId?: number;
  @Input() contractTemplateGuaranteeList: Array<any> = [];

  frmAgregarGarantiaModal: FormGroup;
  dateFormat = 'dd/MM/yyyy';
  guaranteeTypeList: Array<any> = [];
  contractTemplateFixedRentList: Array<any> = [];

  constructor(
    private modalRef: NzModalRef,
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private messageService: NzMessageService,
    private modalMessage: Modal
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initList();
  }

  initForm(){
    this.frmAgregarGarantiaModal = this.formBuilder.group({
      ddlguarantetype: [null, [Validators.required]],
      ddlfixedrentvalidityamount: [null, [Validators.required]],
      rentnumber: [null, [Validators.required]],
      guaranteeamount: [{value: '', disabled: true}],
      datemaximumdelivery: [null, [Validators.required]]
    });
  }

  initList(){
    forkJoin([
      this.contractService.getFixedRentValiditySearch({ContractTemplateId: this.contractTemplateId }),
      this.contractService.getGuaranteeTypePaymentTemplate({})
    ]).subscribe(result => {
      this.contractTemplateFixedRentList = result[0];
      this.guaranteeTypeList = result[1];
    },
    (error: any) => {
      this.messageService.error(constants.MESSAGE.ERROR_GET_DATA);
    },
    () => {
      if(this.index !== undefined){
        this.setDataContractTemplateGuarantee();
      }
    });
  }

  setDataContractTemplateGuarantee(){
    let found = this.contractTemplateGuaranteeList.find(x => x.index == this.index);
    this.frmAgregarGarantiaModal.get('ddlguarantetype').setValue(found.guaranteeType);
    this.frmAgregarGarantiaModal.get('ddlfixedrentvalidityamount').setValue(found.contractValidityId);
    this.frmAgregarGarantiaModal.get('rentnumber').setValue(found.rentNumber);
    this.frmAgregarGarantiaModal.get('guaranteeamount').setValue(thousandsSeparator(found.amount));
    this.frmAgregarGarantiaModal.get('datemaximumdelivery').setValue(found.maximunDate);
  }

  changeFixedRentValidityAmount(valitityId: any) {
    this.changeKeyRightAmount(valitityId, this.frmAgregarGarantiaModal.value.rentnumber);
  }

  changeRentalsNumber(rentalsNumber: any) {
    this.changeKeyRightAmount(this.frmAgregarGarantiaModal.value.ddlfixedrentvalidityamount, rentalsNumber);
  }

  changeKeyRightAmount(validityId: any, rentalsNumber: any) {
    if (rentalsNumber > 0 && validityId > 0) {
      var fixedRentAmount = parseFloat(this.contractTemplateFixedRentList.find(element => element.contractValidityId == validityId)?.fixedRentSubAmount);
      var keyRightAmount = parseFloat(fixedRentAmount.toFixed(2)) * rentalsNumber;
      keyRightAmount = parseFloat(keyRightAmount.toFixed(3));
      keyRightAmount = keyRightAmount * constants.PARAMETER.IGV;
      this.frmAgregarGarantiaModal.get('guaranteeamount').setValue(thousandsSeparator(keyRightAmount));
    } else {
      this.frmAgregarGarantiaModal.get('guaranteeamount').setValue('');
    }
  }

  onSubmit(){
    if(validForm(this.frmAgregarGarantiaModal)){
      this.modalMessage.confirm(
        constants.MESSAGE.CONFIRM_QUESTION,
        () => {
          if(this.index === undefined){
            this.contractTemplateGuaranteeList.push({            
              contractTemplateId: this.contractTemplateId,
              amount: parseFloat(this.frmAgregarGarantiaModal.controls['guaranteeamount'].value.toString().replace(',', '')),            
              contractValidityId: this.frmAgregarGarantiaModal.value.ddlfixedrentvalidityamount,            
              fixedRentSubAmountText: this.contractTemplateFixedRentList.find(x => Number(x.contractValidityId) === Number(this.frmAgregarGarantiaModal.value.ddlfixedrentvalidityamount)).fixedRentSubAmountText,
              guaranteeType: this.frmAgregarGarantiaModal.value.ddlguarantetype,
              guaranteeTypePaymentTemplateName: this.guaranteeTypeList.find(x => Number(x.guaranteeTypePaymentTemplateId) === Number(this.frmAgregarGarantiaModal.value.ddlguarantetype)).guaranteeTypePaymentTemplateName,
              index: Math.random(),
              maximunDate: this.frmAgregarGarantiaModal.value.datemaximumdelivery,
              rentNumber: this.frmAgregarGarantiaModal.value.rentnumber,            
              previousBalance: 0,
              renovationType: 0,
              restriction: null,
              templateGuaranteeId: 0,
            });
          }else{
            let found = this.contractTemplateGuaranteeList.find(x => x.index == this.index);
            found.amount = parseFloat(this.frmAgregarGarantiaModal.controls['guaranteeamount'].value.toString().replace(',', ''));
            found.contractValidityId = this.frmAgregarGarantiaModal.value.ddlfixedrentvalidityamount;
            found.fixedRentSubAmountText = this.contractTemplateFixedRentList.find(x => Number(x.contractValidityId) === Number(this.frmAgregarGarantiaModal.value.ddlfixedrentvalidityamount)).fixedRentSubAmountText;
            found.guaranteeType = this.frmAgregarGarantiaModal.value.ddlguarantetype;
            found.guaranteeTypePaymentTemplateName = this.guaranteeTypeList.find(x => Number(x.guaranteeTypePaymentTemplateId) === Number(this.frmAgregarGarantiaModal.value.ddlguarantetype)).guaranteeTypePaymentTemplateName;
            found.maximunDate = this.frmAgregarGarantiaModal.value.datemaximumdelivery;
            found.rentNumber = this.frmAgregarGarantiaModal.value.rentnumber;
          }
          
          this.modalRef.destroy({
            contractTemplateGuaranteeList: this.contractTemplateGuaranteeList
          });
        }
      );
    }else
      this.messageService.warning(constants.MESSAGE.COMPLETE_FORM);
  }

  onCancel(){
    this.modalRef.destroy();
  }

}
