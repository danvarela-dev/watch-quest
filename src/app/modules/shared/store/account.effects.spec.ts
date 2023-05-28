import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AccountEffects } from './account.effects';
import { Action } from '@ngrx/store';

describe('AccountEffects', () => {
  let actions$: Observable<Action>;
  let effects: AccountEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(AccountEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
