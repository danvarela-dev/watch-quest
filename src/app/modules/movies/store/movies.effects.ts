import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { finalize, map, mergeMap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.store';
import { Response } from '../../shared/interfaces/response.interface';
import { MoviesService } from '../services/movies/movies.service';
import { MoviesActions } from './movies.actions';

@Injectable()
export class MoviesEffects {
  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesActions.loadMovies),
      mergeMap(({ page, category }) => {
        switch (category) {
          case 'nowPlaying':
            return this.moviesService.getNowPlaying(page).pipe(
              map((data) => {
                return MoviesActions.loadMoviesSuccess({
                  movies: data,
                  category: category,
                });
              })
            );
          case 'popular':
            return this.moviesService.getPopular(page).pipe(
              map((data) => {
                return MoviesActions.loadMoviesSuccess({
                  movies: data,
                  category: category,
                });
              })
            );
          case 'topRated':
            return this.moviesService.getTopRated(page).pipe(
              map((data) =>
                MoviesActions.loadMoviesSuccess({
                  movies: data,
                  category: category,
                })
              )
            );
          case 'upcoming':
            return this.moviesService.getUpcoming(page).pipe(
              map((data) =>
                MoviesActions.loadMoviesSuccess({
                  movies: data,
                  category: category,
                })
              )
            );
          default:
            return this.moviesService.getUpcoming(page).pipe(
              map((data) =>
                MoviesActions.loadMoviesSuccess({
                  movies: data,
                  category: category,
                })
              )
            );
        }
      })
    );
  });

  addFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesActions.addFavorite),
      mergeMap(({ data: { request } }) => {
        return this.moviesService.addFavorite(request).pipe(
          finalize(() =>
            this.store.dispatch(MoviesActions.loadFavoriteMovies())
          ),
          map((response: Response) =>
            MoviesActions.addFavoriteSuccess({
              data: { response: { ...response, media_id: request?.media_id } },
            })
          )
        );
      })
    );
  });

  loadFavoriteMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesActions.loadFavoriteMovies),
      mergeMap(() => {
        return this.moviesService.getFavoriteMovies().pipe(
          map((data) => {
            data.results = [
              ...data.results.map((movie) => {
                return { ...movie, is_favorite: true };
              }),
            ];
            return MoviesActions.loadFavoriteMoviesSuccess({
              data: { movies: data.results },
            });
          })
        );
      })
    );
  });

  addToWatchlist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesActions.addToWatchlist),
      mergeMap(({ data: { request } }) => {
        return this.moviesService.addToWatchlist(request).pipe(
          finalize(() =>
            this.store.dispatch(MoviesActions.loadWatchlistMovies())
          ),
          map((response: Response) =>
            MoviesActions.addToWatchlistSuccess({
              data: { response: { ...response, media_id: request?.media_id } },
            })
          )
        );
      })
    );
  });

  loadWatchlistMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesActions.loadWatchlistMovies),
      mergeMap(() => {
        return this.moviesService.getWatchlistMovies().pipe(
          map((data) => {
            data.results = [
              ...data.results.map((movie) => {
                return { ...movie, is_watchlist: true };
              }),
            ];
            return MoviesActions.loadWatchlistMoviesSuccess({
              data: { movies: data.results },
            });
          })
        );
      })
    );
  });

  rateMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesActions.rateMovie),
      mergeMap(({ rating, id }) => {
        return this.moviesService.rateMovie(id, rating).pipe(
          map(() => {
            return MoviesActions.rateMovieSuccess({
              id,
              rating,
            });
          })
        );
      })
    );
  });

  loadRatedMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesActions.loadRatedMovies),
      mergeMap(() => {
        return this.moviesService.getRatedMovies().pipe(
          map((data) => {
            return MoviesActions.loadRatedMoviesSuccess({
              data: { movies: data.results },
            });
          })
        );
      })
    );
  });

  loadMovieDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesActions.loadMovieDetails),
      mergeMap(({ id, category }) => {
        return this.moviesService.getMovieDetails(id).pipe(
          finalize(() => {
            this.store.dispatch(MoviesActions.loadFavoriteMovies());
            this.store.dispatch(MoviesActions.loadWatchlistMovies());
            this.store.dispatch(MoviesActions.loadRatedMovies());
          }),
          map((movie) => {
            return MoviesActions.loadMovieDetailsSuccess({
              data: { movie, category },
            });
          })
        );
      })
    );
  });

  loadMovieProviders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesActions.loadMovieProviders),
      mergeMap(({ id }) => {
        return this.moviesService.getProviders(id).pipe(
          map((providers) => {
            return MoviesActions.loadMovieProvidersSuccess({
              data: { providers },
            });
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private store: Store<AppState>
  ) {}
}
