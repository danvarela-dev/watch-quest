import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAccount from './account.reducer';
import { of } from 'rxjs';

export const selectAccountState =
  createFeatureSelector<fromAccount.AccountState>(
    fromAccount.accountFeatureKey
  );

export const selectAccount = createSelector(
  selectAccountState,
  (state: fromAccount.AccountState) => of(state)
);
