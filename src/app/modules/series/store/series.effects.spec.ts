import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SeriesEffects } from './series.effects';

describe('SeriesEffects', () => {
  let actions$: Observable<any>;
  let effects: SeriesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SeriesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SeriesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
