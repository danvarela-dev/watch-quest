import { TestBed } from '@angular/core/testing';

import { TrafficInterceptor } from './traffic.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [TrafficInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: TrafficInterceptor = TestBed.inject(TrafficInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
