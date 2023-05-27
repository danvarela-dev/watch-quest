import { createFeature, createReducer, on } from '@ngrx/store';
import { MoviesActions } from './movies.actions';
import { EntityState, Update, createEntityAdapter } from '@ngrx/entity';
import {
  Movie,
  MovieDetails,
  MoviesResponse,
  PaginatedMovie,
} from '../interfaces/movies.interfaces';

export const moviesFeatureKey = 'movies';

export interface MoviesState {
  nowPlaying: { currentPage: number; movies: EntityState<MovieDetails> };
  popular: { currentPage: number; movies: EntityState<MovieDetails> };
  topRated: { currentPage: number; movies: EntityState<MovieDetails> };
  upcoming: { currentPage: number; movies: EntityState<MovieDetails> };
}

export const moviesAdapter = createEntityAdapter<MovieDetails>();

export const initialState: MoviesState = moviesAdapter.getInitialState({
  nowPlaying: { currentPage: 1, movies: moviesAdapter.getInitialState() },
  popular: { currentPage: 1, movies: moviesAdapter.getInitialState() },
  topRated: { currentPage: 1, movies: moviesAdapter.getInitialState() },
  upcoming: { currentPage: 1, movies: moviesAdapter.getInitialState() },
});

export const moviesReducer = createReducer(
  initialState,
  on(MoviesActions.loadMovies, (state) => state),
  on(MoviesActions.loadMoviesSuccess, (state, { movies, category }) => {
    switch (category) {
      case 'nowPlaying':
        return {
          ...state,
          nowPlaying: {
            currentPage: movies.page,
            movies: moviesAdapter.upsertMany(
              movies.results,
              state.nowPlaying.movies
            ),
          },
        };

      case 'popular':
        return {
          ...state,
          popular: {
            currentPage: movies.page,
            movies: moviesAdapter.upsertMany(
              movies.results,
              state.popular.movies
            ),
          },
        };
      case 'topRated':
        return {
          ...state,
          topRated: {
            currentPage: movies.page,
            movies: moviesAdapter.upsertMany(
              movies.results,
              state.topRated.movies
            ),
          },
        };

      case 'upcoming':
        return {
          ...state,
          upcoming: {
            currentPage: movies.page,
            movies: moviesAdapter.upsertMany(
              movies.results,
              state.upcoming.movies
            ),
          },
        };
      default:
        return state;
    }
  }),
  on(MoviesActions.loadFavoriteMovies, (state) => state),
  on(MoviesActions.loadFavoriteMoviesSuccess, (state, { data: { movies } }) => {
    const changes: Update<Movie>[] = movies.map((movie) => {
      return {
        id: movie.id,
        changes: {
          is_favorite: movie.is_favorite,
        },
      };
    });

    const newState = {
      ...state,
      nowPlaying: {
        ...state.nowPlaying,
        movies: moviesAdapter.updateMany(changes, state.nowPlaying.movies),
      },
      popular: {
        ...state.popular,
        movies: moviesAdapter.updateMany(changes, state.popular.movies),
      },
      topRated: {
        ...state.topRated,
        movies: moviesAdapter.updateMany(changes, state.topRated.movies),
      },
      upcoming: {
        ...state.upcoming,
        movies: moviesAdapter.updateMany(changes, state.upcoming.movies),
      },
    };
    return newState;
  }),
  on(MoviesActions.rateMovieSuccess, (state, { id, rating }) => {
    return {
      ...state,
      nowPlaying: {
        ...state.nowPlaying,
        movies: moviesAdapter.upsertOne(
          {
            ...state.nowPlaying.movies.entities[id],
            rating,
          } as MovieDetails,
          state.nowPlaying.movies
        ),
      },
      popular: {
        ...state.popular,
        movies: moviesAdapter.upsertOne(
          {
            ...state.popular.movies.entities[id],
            rating,
          } as MovieDetails,
          state.popular.movies
        ),
      },
      topRated: {
        ...state.topRated,
        movies: moviesAdapter.upsertOne(
          {
            ...state.topRated.movies.entities[id],
            rating,
          } as MovieDetails,
          state.topRated.movies
        ),
      },
      upcoming: {
        ...state.upcoming,
        movies: moviesAdapter.upsertOne(
          {
            ...state.upcoming.movies.entities[id],
            rating,
          } as MovieDetails,
          state.upcoming.movies
        ),
      },
    };
  }),
  on(MoviesActions.loadRatedMoviesSuccess, (state, action) => {
    const changes: Update<Movie>[] = action.data.movies.map((movie) => {
      return {
        id: movie.id,
        changes: {
          rating: movie?.rating,
        },
      };
    });

    return {
      ...state,
      nowPlaying: {
        ...state.nowPlaying,
        movies: moviesAdapter.updateMany(changes, state.nowPlaying.movies),
      },
      popular: {
        ...state.popular,
        movies: moviesAdapter.updateMany(changes, state.popular.movies),
      },
      topRated: {
        ...state.topRated,
        movies: moviesAdapter.updateMany(changes, state.topRated.movies),
      },
      upcoming: {
        ...state.upcoming,
        movies: moviesAdapter.updateMany(changes, state.upcoming.movies),
      },
    };
  }),
  on(MoviesActions.loadWatchlistMoviesSuccess, (state, action) => {
    const changes: Update<Movie>[] = action.data.movies.map((movie) => {
      return {
        id: movie.id,
        changes: {
          is_watchlist: movie.is_watchlist,
        },
      };
    });

    return {
      ...state,
      nowPlaying: {
        ...state.nowPlaying,
        movies: moviesAdapter.updateMany(changes, state.nowPlaying.movies),
      },
      popular: {
        ...state.popular,
        movies: moviesAdapter.updateMany(changes, state.popular.movies),
      },
      topRated: {
        ...state.topRated,
        movies: moviesAdapter.updateMany(changes, state.topRated.movies),
      },
      upcoming: {
        ...state.upcoming,
        movies: moviesAdapter.updateMany(changes, state.upcoming.movies),
      },
    };
  }),
  on(MoviesActions.removeFavorite, (state, action) => {
    return {
      ...state,
      nowPlaying: {
        ...state.nowPlaying,
        movies: moviesAdapter.upsertOne(
          {
            ...state.nowPlaying.movies.entities[action.id],
            is_favorite: false,
          } as MovieDetails,
          state.nowPlaying.movies
        ),
      },
      popular: {
        ...state.popular,
        movies: moviesAdapter.upsertOne(
          {
            ...state.popular.movies.entities[action.id],
            is_favorite: false,
          } as MovieDetails,
          state.popular.movies
        ),
      },
      topRated: {
        ...state.topRated,
        movies: moviesAdapter.upsertOne(
          {
            ...state.topRated.movies.entities[action.id],
            is_favorite: false,
          } as MovieDetails,
          state.topRated.movies
        ),
      },
      upcoming: {
        ...state.upcoming,
        movies: moviesAdapter.upsertOne(
          {
            ...state.upcoming.movies.entities[action.id],
            is_favorite: false,
          } as MovieDetails,
          state.upcoming.movies
        ),
      },
    };
  }),
  on(MoviesActions.removeFromWatchlist, (state, action) => {
    return {
      ...state,
      nowPlaying: {
        ...state.nowPlaying,
        movies: moviesAdapter.upsertOne(
          {
            ...state.nowPlaying.movies.entities[action.id],
            is_watchlist: false,
          } as MovieDetails,
          state.nowPlaying.movies
        ),
      },
      popular: {
        ...state.popular,
        movies: moviesAdapter.upsertOne(
          {
            ...state.popular.movies.entities[action.id],
            is_watchlist: false,
          } as MovieDetails,
          state.popular.movies
        ),
      },
      topRated: {
        ...state.topRated,
        movies: moviesAdapter.upsertOne(
          {
            ...state.topRated.movies.entities[action.id],
            is_watchlist: false,
          } as MovieDetails,
          state.topRated.movies
        ),
      },
      upcoming: {
        ...state.upcoming,
        movies: moviesAdapter.upsertOne(
          {
            ...state.upcoming.movies.entities[action.id],
            is_watchlist: false,
          } as MovieDetails,
          state.upcoming.movies
        ),
      },
    };
  }),
  on(
    MoviesActions.loadMovieDetailsSuccess,
    (state, { data: { movie, category } }) => {
      switch (category) {
        case 'nowPlaying':
          return {
            ...state,
            nowPlaying: {
              ...state.nowPlaying,
              movies: moviesAdapter.upsertOne(movie, state.nowPlaying.movies),
            },
          };

        case 'popular':
          return {
            ...state,
            popular: {
              ...state.popular,
              movies: moviesAdapter.upsertOne(movie, state.popular.movies),
            },
          };
        case 'topRated':
          return {
            ...state,
            topRated: {
              ...state.topRated,
              movies: moviesAdapter.upsertOne(movie, state.topRated.movies),
            },
          };

        case 'upcoming':
          return {
            ...state,
            upcoming: {
              ...state.upcoming,
              movies: moviesAdapter.upsertOne(movie, state.upcoming.movies),
            },
          };
        default:
          return state;
      }
    }
  )
);

export const moviesFeature = createFeature({
  name: moviesFeatureKey,
  reducer: moviesReducer,
});
