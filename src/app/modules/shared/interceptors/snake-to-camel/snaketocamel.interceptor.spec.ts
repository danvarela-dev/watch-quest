import { TestBed } from '@angular/core/testing';

import { SnakeToCamelInterceptor } from './snaketocamel.interceptor';

describe('SnaketocamelInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [SnakeToCamelInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: SnakeToCamelInterceptor = TestBed.inject(
      SnakeToCamelInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
