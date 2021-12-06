import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaMasivaModalComponent } from './carga-masiva-modal.component';

describe('CargaMasivaModalComponent', () => {
  let component: CargaMasivaModalComponent;
  let fixture: ComponentFixture<CargaMasivaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaMasivaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaMasivaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
