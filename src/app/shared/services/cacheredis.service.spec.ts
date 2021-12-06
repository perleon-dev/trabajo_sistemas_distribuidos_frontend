import { TestBed } from '@angular/core/testing';

import { CacheredisService } from './cacheredis.service';

describe('CacheredisService', () => {
  let service: CacheredisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheredisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
