import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of, pipe } from 'rxjs';
import { MoviesActions } from './movies.actions';
import { MoviesService } from '../services/movies/movies.service';

@Injectable()
export class MoviesEffects {
  loadNowPlayingMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesActions.loadMovies),
      mergeMap(({ page, category }) => {
        switch (category) {
          case 'nowPlaying':
            return this.moviesService.getNowPlaying(page).pipe(
              map((data) =>
                MoviesActions.loadMoviesSuccess({
                  movies: data,
                  category: category,
                })
              ),
              catchError((error) =>
                of(MoviesActions.loadMoviesFailure({ error }))
              )
            );
          case 'popular':
            return this.moviesService.getPopular(page).pipe(
              map((data) =>
                MoviesActions.loadMoviesSuccess({
                  movies: data,
                  category: category,
                })
              ),
              catchError((error) =>
                of(MoviesActions.loadMoviesFailure({ error }))
              )
            );
          case 'topRated':
            return this.moviesService.getTopRated(page).pipe(
              map((data) =>
                MoviesActions.loadMoviesSuccess({
                  movies: data,
                  category: category,
                })
              ),
              catchError((error) =>
                of(MoviesActions.loadMoviesFailure({ error }))
              )
            );
          case 'upcoming':
            return this.moviesService.getUpcoming(page).pipe(
              map((data) =>
                MoviesActions.loadMoviesSuccess({
                  movies: data,
                  category: category,
                })
              ),
              catchError((error) =>
                of(MoviesActions.loadMoviesFailure({ error }))
              )
            );
          default:
            return EMPTY;
        }
      })
    );
  });

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}
