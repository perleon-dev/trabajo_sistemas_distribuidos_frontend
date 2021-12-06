import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateDeadlineSectionComponent } from './date-deadline-section.component';

describe('DateDeadlineSectionComponent', () => {
  let component: DateDeadlineSectionComponent;
  let fixture: ComponentFixture<DateDeadlineSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateDeadlineSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateDeadlineSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
