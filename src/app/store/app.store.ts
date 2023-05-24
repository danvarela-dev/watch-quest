import { ActionReducerMap } from '@ngrx/store';
import {
  MoviesState,
  moviesReducer,
} from '../modules/movies/store/movies.reducer';

export interface AppState {
  movies: MoviesState;
}

export const reducers: ActionReducerMap<AppState> = {
  movies: moviesReducer,
};
