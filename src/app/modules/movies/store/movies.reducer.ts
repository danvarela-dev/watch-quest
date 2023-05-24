import { createFeature, createReducer, on } from '@ngrx/store';
import { MoviesActions } from './movies.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Movie, MoviesResponse } from '../interfaces/movies.interfaces';
import { act } from '@ngrx/effects';

export const moviesFeatureKey = 'movies';

export interface MoviesState {
  nowPlaying: EntityState<Movie>;
  popular: EntityState<Movie>;
  topRated: EntityState<Movie>;
  upcoming: EntityState<Movie>;
}

export const moviesAdapter = createEntityAdapter<Movie>();

export const initialState: MoviesState = moviesAdapter.getInitialState({
  nowPlaying: moviesAdapter.getInitialState(),
  popular: moviesAdapter.getInitialState(),
  topRated: moviesAdapter.getInitialState(),
  upcoming: moviesAdapter.getInitialState(),
});

export const moviesReducer = createReducer(
  initialState,
  on(MoviesActions.loadMovies, (state) => state),
  on(MoviesActions.loadMoviesSuccess, (state, { movies, category }) => {
    switch (category) {
      case 'nowPlaying':
        return {
          ...state,
          nowPlaying: moviesAdapter.upsertMany(
            movies.results,
            state.nowPlaying
          ),
        };

      case 'popular':
        return {
          ...state,
          popular: moviesAdapter.setAll(movies.results, state.popular),
        };
      case 'topRated':
        return {
          ...state,
          topRated: moviesAdapter.upsertMany(movies.results, state.topRated),
        };

      case 'upcoming':
        return {
          ...state,
          upcoming: moviesAdapter.upsertMany(movies.results, state.upcoming),
        };
      default:
        return state;
    }
  })
);

export const moviesFeature = createFeature({
  name: moviesFeatureKey,
  reducer: moviesReducer,
});
