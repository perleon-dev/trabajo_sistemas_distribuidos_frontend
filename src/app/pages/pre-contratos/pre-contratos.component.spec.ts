import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreContratosComponent } from './pre-contratos.component';

describe('PreContratosComponent', () => {
  let component: PreContratosComponent;
  let fixture: ComponentFixture<PreContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreContratosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
