import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionDetailSectionComponent } from './condition-detail-section.component';

describe('ConditionDetailSectionComponent', () => {
  let component: ConditionDetailSectionComponent;
  let fixture: ComponentFixture<ConditionDetailSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionDetailSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionDetailSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
