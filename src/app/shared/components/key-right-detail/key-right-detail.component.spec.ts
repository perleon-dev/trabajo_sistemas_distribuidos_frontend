import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyRightDetailComponent } from './key-right-detail.component';

describe('KeyRightDetailComponent', () => {
  let component: KeyRightDetailComponent;
  let fixture: ComponentFixture<KeyRightDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyRightDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyRightDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
