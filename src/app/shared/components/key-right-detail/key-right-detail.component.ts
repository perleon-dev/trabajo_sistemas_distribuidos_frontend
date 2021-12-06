import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { forkJoin } from 'rxjs';
import { AdvanceService } from 'src/app/features/services/advanceServices/advance.service';
import { ContractService } from 'src/app/features/services/contractServices/contract.service';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-key-right-detail',
  templateUrl: './key-right-detail.component.html',
  styleUrls: ['./key-right-detail.component.scss']
})
export class KeyRightDetailComponent implements OnInit {

  @Input() contractTemplateId?: number;
  frmDerechoLlaveDetalle: FormGroup;

  contractTemplateKeyRightList: Array<any> = [];
  contractTemplateFixedRentFound: Array<any> = [];
  currencyList: Array<any> = [];
  loadingTable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private modalRef: NzModalRef,
    private dateFormatPipe: DateFormatPipe,
    private advanceService: AdvanceService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initList();
  }

  initForm(){
    this.frmDerechoLlaveDetalle = this.formBuilder.group({

    });
  }

  initList(){
    this.loadingTable = true;
    forkJoin([
      this.contractService.getContractTemplateKeyRightSearch({cont_c_plant_icod: this.contractTemplateId }),
      this.contractService.getFixedRentValiditySearch({ContractTemplateId: this.contractTemplateId }),
      this.advanceService.getCurrencies(0)
    ]).subscribe(result => {
      this.contractTemplateKeyRightList = result[0];
      this.contractTemplateFixedRentFound = result[1];
      this.currencyList = result[2];
    },
    (error: any) => {
      console.log(error);
      this.loadingTable = false;
    },
    () => {
      this.setKeyRightData();
      this.loadingTable = false;
    });
  }

  setKeyRightData() {
    this.contractTemplateKeyRightList.forEach((keyRight, index) => {      
      this.formatKeyRight(keyRight);
      keyRight.state = true;
      keyRight.index = index + 1;
    });
  }

  formatKeyRight(keyRight: any){
    keyRight.moneda_c_name = this.currencyList.find(element => element.currencyId == keyRight.moneda_c_yid)?.currencyName;
    keyRight.cont_vig_fixed_rent_amount = this.contractTemplateFixedRentFound.find(element => element.contractValidityId == keyRight.cont_vig_c_iid)?.fixedRentSubAmountText;
    keyRight.cont_derllave_c_emonto_formatted = parseFloat(keyRight.cont_derllave_c_emonto).toFixed(2) + " + IGV";
    keyRight.cont_derllave_c_dfec_formatted = this.dateFormatPipe.transform(keyRight.cont_derllave_c_dfec); 
  } 

  onAccept(){
    this.modalRef.destroy();
  }

  onCancel(){
    this.modalRef.destroy();
  }

}
