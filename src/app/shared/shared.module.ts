import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RouterModule } from '@angular/router'
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { LoadingComponent } from './components/loading/loading.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { AmoutFormatPipe } from './pipes/amout-format.pipe'
import { HeaderSectionComponent } from './components/header-section/header-section.component'
import { ApplicationDateSectionComponent } from './components/application-date-section/application-date-section.component'
import { DateDeadlineSectionComponent } from './components/date-deadline-section/date-deadline-section.component'
import { DiscountSectionComponent } from './components/discount-section/discount-section.component'
import { WaterSectionComponent } from './components/water-section/water-section.component'
import { SpaceCommercialSectionComponent } from './components/space-commercial-section/space-commercial-section.component'
import { PropertySectionComponent } from './components/property-section/property-section.component'
import { EconomicConditionSectionComponent } from './components/economic-condition-section/economic-condition-section.component'
import { ElectricPowerSectionComponent } from './components/electric-power-section/electric-power-section.component'
import { GuaranteeSectionComponent } from './components/guarantee-section/guarantee-section.component'
import { KeyRightDetailComponent } from './components/key-right-detail/key-right-detail.component'
import { OtherConceptSectionComponent } from './components/other-concept-section/other-concept-section.component';
import { ConditionDetailSectionComponent } from './components/condition-detail-section/condition-detail-section.component';
import { UploadDocumentVisaGuaranteeSectionComponent } from './components/upload-document-visa-guarantee-section/upload-document-visa-guarantee-section.component';
import { GuaranteeVisaHistorySectionComponent } from './components/guarantee-visa-history-section/guarantee-visa-history-section.component';
import { AddGuaranteeSectionComponent } from './components/add-guarantee-section/add-guarantee-section.component';
import { AddGuaranteeModalComponent } from './components/add-guarantee-modal/add-guarantee-modal.component'

const MODULES = [CommonModule, RouterModule, NgZorroAntdModule,ReactiveFormsModule,FormsModule]
const COMPONENT = [LoadingComponent, HeaderSectionComponent, ApplicationDateSectionComponent, DateDeadlineSectionComponent, DiscountSectionComponent,
                   WaterSectionComponent, SpaceCommercialSectionComponent, PropertySectionComponent, PropertySectionComponent, EconomicConditionSectionComponent,
                   ElectricPowerSectionComponent, GuaranteeSectionComponent, KeyRightDetailComponent, OtherConceptSectionComponent, ConditionDetailSectionComponent,
                   UploadDocumentVisaGuaranteeSectionComponent, GuaranteeVisaHistorySectionComponent, AddGuaranteeSectionComponent, AddGuaranteeModalComponent]
const PIPES = [DateFormatPipe, AmoutFormatPipe]

@NgModule({
  declarations: [...COMPONENT,...PIPES],
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENT,...PIPES],
  providers: [PIPES]
})
export class SharedModule {}
