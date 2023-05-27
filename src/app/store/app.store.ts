import { ActionReducerMap } from '@ngrx/store';
import {
  MoviesState,
  moviesReducer,
} from '../modules/movies/store/movies.reducer';
import {
  AccountState,
  accountReducer,
} from '../modules/shared/store/account.reducer';
import {
  SeriesState,
  seriesReducer,
} from '../modules/series/store/series.reducer';

export interface AppState {
  movies: MoviesState;
  account: AccountState;
  series: SeriesState;
}

export const reducers: ActionReducerMap<AppState> = {
  movies: moviesReducer,
  account: accountReducer,
  series: seriesReducer,
};
