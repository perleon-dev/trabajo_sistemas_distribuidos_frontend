import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuaranteeModalComponent } from './add-guarantee-modal.component';

describe('AddGuaranteeModalComponent', () => {
  let component: AddGuaranteeModalComponent;
  let fixture: ComponentFixture<AddGuaranteeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGuaranteeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGuaranteeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
