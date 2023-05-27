import { ActionReducerMap } from '@ngrx/store';
import {
  MoviesState,
  moviesReducer,
} from '../modules/movies/store/movies.reducer';
import {
  AccountState,
  accountReducer,
} from '../modules/shared/store/account.reducer';

export interface AppState {
  movies: MoviesState;
  account: AccountState;
}

export const reducers: ActionReducerMap<AppState> = {
  movies: moviesReducer,
  account: accountReducer,
};
