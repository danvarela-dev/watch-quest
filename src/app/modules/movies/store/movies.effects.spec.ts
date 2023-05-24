import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MoviesEffects } from './movies.effects';

describe('MoviesEffects', () => {
  let actions$: Observable<any>;
  let effects: MoviesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MoviesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MoviesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
