import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocumentVisaGuaranteeSectionComponent } from './upload-document-visa-guarantee-section.component';

describe('UploadDocumentVisaGuaranteeSectionComponent', () => {
  let component: UploadDocumentVisaGuaranteeSectionComponent;
  let fixture: ComponentFixture<UploadDocumentVisaGuaranteeSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDocumentVisaGuaranteeSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDocumentVisaGuaranteeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
