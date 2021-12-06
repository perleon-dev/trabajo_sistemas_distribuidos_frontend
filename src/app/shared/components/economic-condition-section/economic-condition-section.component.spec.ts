import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicConditionSectionComponent } from './economic-condition-section.component';

describe('EconomicConditionSectionComponent', () => {
  let component: EconomicConditionSectionComponent;
  let fixture: ComponentFixture<EconomicConditionSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomicConditionSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomicConditionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
