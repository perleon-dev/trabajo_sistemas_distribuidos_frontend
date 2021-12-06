import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricPowerSectionComponent } from './electric-power-section.component';

describe('ElectricPowerSectionComponent', () => {
  let component: ElectricPowerSectionComponent;
  let fixture: ComponentFixture<ElectricPowerSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricPowerSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricPowerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
