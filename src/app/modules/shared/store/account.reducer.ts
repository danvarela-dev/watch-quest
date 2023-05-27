import { createFeature, createReducer, on } from '@ngrx/store';
import { AccountActions } from './account.actions';
import { Account } from '../interfaces/account.interface';

export const accountFeatureKey = 'account';

export interface AccountState extends Account {}

export const initialState: AccountState = {
  avatar: {
    gravatar: {
      hash: '',
    },
    tmdb: {
      avatar_path: '',
    },
  },
  id: 0,
  iso_639_1: '',
  iso_3166_1: '',
  name: '',
  include_adult: false,
  username: '',
};

export const accountReducer = createReducer(
  initialState,
  on(AccountActions.loadAccount, (state) => state),
  on(AccountActions.loadAccountsSuccess, (state, action) => {
    return { ...state, ...action.data.user };
  })
);

export const accountFeature = createFeature({
  name: accountFeatureKey,
  reducer: accountReducer,
});
