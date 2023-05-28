import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMovies from './movies.reducer';
import { MovieDetails } from '../interfaces/movies.interfaces';

export const selectMoviesState = createFeatureSelector<fromMovies.MoviesState>(
  fromMovies.moviesFeatureKey
);

export const selectNowPlayingMovies = createSelector(
  selectMoviesState,
  (state) => {
    const { ids, entities } = state.nowPlaying.movies;
    return ids
      .map((id) => entities[id])
      .filter(
        (movie): movie is MovieDetails => movie !== undefined || movie !== null
      );
  }
);

export const selectPopularMovies = createSelector(
  selectMoviesState,
  (state) => {
    const { ids, entities } = state.popular.movies;
    return ids
      .map((id) => entities[id])
      .filter(
        (movie): movie is MovieDetails => movie !== undefined || movie !== null
      );
  }
);

export const selectTopRatedMovies = createSelector(
  selectMoviesState,
  (state) => {
    const { ids, entities } = state.topRated.movies;
    return ids
      .map((id) => entities[id])
      .filter(
        (movie): movie is MovieDetails => movie !== undefined || movie !== null
      );
  }
);

export const selectUpcomingMovies = createSelector(
  selectMoviesState,
  (state) => {
    const { ids, entities } = state.upcoming.movies;
    return ids
      .map((id) => entities[id])
      .filter(
        (movie): movie is MovieDetails => movie !== undefined || movie !== null
      );
  }
);

export const selectFavoritesMovies = createSelector(
  selectMoviesState,
  (state) => {
    const { ids, entities } = state.favorites.movies;
    return ids.map((id) => entities[id]);
  }
);

export const selectWatchlistMovies = createSelector(
  selectMoviesState,
  (state) => {
    const { ids, entities } = state.watchlist.movies;
    return ids
      .map((id) => entities[id])
      .filter(
        (movie): movie is MovieDetails => movie !== undefined || movie !== null
      );
  }
);

export const selectNowPlayingCurrentPage = createSelector(
  selectMoviesState,
  (state) => state.nowPlaying.currentPage
);

export const selectPopularCurrentPage = createSelector(
  selectMoviesState,
  (state) => state.popular.currentPage
);

export const selectTopRatedCurrentPage = createSelector(
  selectMoviesState,
  (state) => state.topRated.currentPage
);

export const selectUpcomingCurrentPage = createSelector(
  selectMoviesState,
  (state) => state.upcoming.currentPage
);

export const selectMovieByID = (id: number) => {
  return createSelector(selectMoviesState, (state) => {
    const allMovies = {
      ...state.nowPlaying.movies.entities,
      ...state.popular.movies.entities,
      ...state.topRated.movies.entities,
      ...state.upcoming.movies.entities,
    };
    return allMovies[id];
  });
};
