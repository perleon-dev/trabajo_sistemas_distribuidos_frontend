import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdvanceService } from 'src/app/features/services/advanceServices/advance.service';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-property-section',
  templateUrl: './property-section.component.html',
  styleUrls: ['./property-section.component.scss']
})
export class PropertySectionComponent {

  @Input() contractTemplate: Array<any> = [];
  
  frmInmueble: FormGroup;
  loadingSpin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private advanceService: AdvanceService,
    private dateFormatPipe: DateFormatPipe
  ) { }

  ngOnChanges(): void {
    this.initForm();
    if(this.contractTemplate[0] !== undefined) this.getDataProperty();
  }

  initForm(){
    this.frmInmueble = this.formBuilder.group({
      propertyname: [{value: '', disabled: true}],
      startdateoperation: [{value: '', disabled: true}],
      propertyaddress: [{value: '', disabled: true}]
    });
  }

  getDataProperty(){
    this.loadingSpin = true;
    this.advanceService.getMallbyId(this.contractTemplate[0].inmCod)
                       .subscribe((response: any) => {
                         this.frmInmueble.get('propertyname').setValue(response.name);
                         this.frmInmueble.get('startdateoperation').setValue(this.dateFormatPipe.transform(response.openingDate));   
                         this.frmInmueble.get('propertyaddress').setValue(response.address);
                         this.loadingSpin = false;                  
                       },
                       (error: any) => {
                         this.loadingSpin = false;
                       })
  }

}
