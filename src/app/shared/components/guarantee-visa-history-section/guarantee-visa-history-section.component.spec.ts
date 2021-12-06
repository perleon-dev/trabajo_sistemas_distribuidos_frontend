import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeVisaHistorySectionComponent } from './guarantee-visa-history-section.component';

describe('GuaranteeVisaHistorySectionComponent', () => {
  let component: GuaranteeVisaHistorySectionComponent;
  let fixture: ComponentFixture<GuaranteeVisaHistorySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuaranteeVisaHistorySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeVisaHistorySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
