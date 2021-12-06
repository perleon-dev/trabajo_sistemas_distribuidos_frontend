import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceCommercialSectionComponent } from './space-commercial-section.component';

describe('SpaceCommercialSectionComponent', () => {
  let component: SpaceCommercialSectionComponent;
  let fixture: ComponentFixture<SpaceCommercialSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceCommercialSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceCommercialSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
