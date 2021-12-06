import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherConceptSectionComponent } from './other-concept-section.component';

describe('OtherConceptSectionComponent', () => {
  let component: OtherConceptSectionComponent;
  let fixture: ComponentFixture<OtherConceptSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherConceptSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherConceptSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
