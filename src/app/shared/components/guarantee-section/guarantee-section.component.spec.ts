import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeSectionComponent } from './guarantee-section.component';

describe('GuaranteeSectionComponent', () => {
  let component: GuaranteeSectionComponent;
  let fixture: ComponentFixture<GuaranteeSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuaranteeSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
