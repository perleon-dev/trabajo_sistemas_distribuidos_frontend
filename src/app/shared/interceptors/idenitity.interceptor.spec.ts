import { TestBed } from '@angular/core/testing';

import { IdenitityInterceptor } from './idenitity.interceptor';

describe('IdenitityInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      IdenitityInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: IdenitityInterceptor = TestBed.inject(IdenitityInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
