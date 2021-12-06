import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuaranteeSectionComponent } from './add-guarantee-section.component';

describe('AddGuaranteeSectionComponent', () => {
  let component: AddGuaranteeSectionComponent;
  let fixture: ComponentFixture<AddGuaranteeSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGuaranteeSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGuaranteeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
