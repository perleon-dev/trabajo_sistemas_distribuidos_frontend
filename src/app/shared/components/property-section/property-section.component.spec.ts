import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySectionComponent } from './property-section.component';

describe('PropertySectionComponent', () => {
  let component: PropertySectionComponent;
  let fixture: ComponentFixture<PropertySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
