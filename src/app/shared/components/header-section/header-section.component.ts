import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdvanceService } from 'src/app/features/services/advanceServices/advance.service';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss']
})
export class HeaderSectionComponent {

  @Input() contractTemplate: Array<any> = [];
  frmSeccionCabecera: FormGroup;
  loadingSpin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dateFormatPipe: DateFormatPipe,
    private advanceService: AdvanceService
  ) { }

  ngOnChanges(): void {
    this.initForm();
    if(this.contractTemplate[0] !== undefined) this.setDataHeaderSection();
  }

  initForm(){
    this.frmSeccionCabecera = this.formBuilder.group({
      contracttemplateid: [{value: '', disabled: true}],
      commercialexecutive: [{value: '', disabled: true}],
      generationdate: [{value: '', disabled: true}],
      contractid: [{value: '', disabled: true}]
    });
  }

  setDataHeaderSection(){
    this.loadingSpin = true;
    this.frmSeccionCabecera.get('contracttemplateid').setValue(this.contractTemplate[0].contPlantIcod);
    this.frmSeccionCabecera.get('generationdate').setValue(this.dateFormatPipe.transform(this.contractTemplate[0].contFecReg));
    this.frmSeccionCabecera.get('contractid').setValue(this.contractTemplate[0].contCod);
    this.getColaborator(this.contractTemplate[0].contUsuaDocAsig);
  }

  getColaborator(documentNumber: string){
    this.advanceService.getColaboratorByDocument(documentNumber)
                       .subscribe((response: any) => {
                         this.frmSeccionCabecera.get('commercialexecutive').setValue(response.name + ' ' + response.lastName + ' ' + response.secondLastName);
                         this.loadingSpin = false;
                       },
                       (error: any) => {
                         this.loadingSpin = false;
                       });
  }

}
