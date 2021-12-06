import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDateSectionComponent } from './application-date-section.component';

describe('ApplicationDateSectionComponent', () => {
  let component: ApplicationDateSectionComponent;
  let fixture: ComponentFixture<ApplicationDateSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationDateSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDateSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
