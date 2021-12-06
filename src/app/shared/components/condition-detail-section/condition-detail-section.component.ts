import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AdvanceService } from 'src/app/features/services/advanceServices/advance.service';
import { ContractService } from 'src/app/features/services/contractServices/contract.service';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { constants } from '../../utility/constants';

@Component({
  selector: 'app-condition-detail-section',
  templateUrl: './condition-detail-section.component.html',
  styleUrls: ['./condition-detail-section.component.scss']
})
export class ConditionDetailSectionComponent {

  @Input() contractTemplate: Array<any> = [];
  
  frmDetalleCondicion: FormGroup;
  contractTemplateId?: number;

  contractTemplateAddendumFound: Array<any> = [];
  motiveAddendumList: Array<any> = [];

  loadingSping: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private advanceService: AdvanceService,
    private dateFormatPipe: DateFormatPipe
  ) { }

  ngOnChanges(): void {
    this.initForm();
    if(this.contractTemplate[0] === undefined) return;
    this.setProperty();
    this.initList();
  }

  initForm(){
    this.frmDetalleCondicion = this.formBuilder.group({
      subcriptiondateaddendum: [{value: '', disabled: true}],
      validitydateaddendum: [{value: '', disabled: true}],
      addendumreason: [{value: '', disabled: true}],
      commercialobservation: [{value: '', disabled: true}],
      legalobservation: [{value: '', disabled: true}]
    });
  }

  setProperty(){
    this.contractTemplateId = this.contractTemplate[0].contPlantIcod;
  }

  initList(){
    this.loadingSping = true;
    forkJoin([
      this.contractService.getContractsTemplateAddendumSearch({cont_c_plant_icod: this.contractTemplateId}),
      this.advanceService.getParameterDetail(constants.PARAMETER.MOTIVE_ADDENDUM)
    ]).subscribe(result => {
      this.contractTemplateAddendumFound = result[0];
      this.motiveAddendumList = result[1];
    },
    (error: any) => {
      console.log(error);
      this.loadingSping = false;
    },
    () => {
      this.setDataDateAddendum();
      this.setDataObservation();
      this.loadingSping = false;
    });
  }

  setDataDateAddendum(){
    if(this.contractTemplateAddendumFound.length > 0){
      this.frmDetalleCondicion.get('subcriptiondateaddendum')!.setValue(this.dateFormatPipe.transform(this.contractTemplateAddendumFound[0].aden_fec_sup));

      let moviteAddendumFound = this.motiveAddendumList.find(x => Number(x.parameterDetailId) === Number(this.contractTemplateAddendumFound[0].aden_tipmot));
      if(moviteAddendumFound)
        this.frmDetalleCondicion.get('addendumreason').setValue(moviteAddendumFound.description);
      this.frmDetalleCondicion.get('validitydateaddendum')!.setValue(this.dateFormatPipe.transform(this.contractTemplateAddendumFound[0].aden_fec_evig));
    }
  }

  setDataObservation(){
    if(this.contractTemplateAddendumFound.length > 0){
      this.frmDetalleCondicion.get('commercialobservation')!.setValue(this.contractTemplateAddendumFound[0].aden_desc_tip_mot);
      this.frmDetalleCondicion.get('legalobservation')!.setValue(this.contractTemplate[0].contObsLeg);
    }
  }

}
