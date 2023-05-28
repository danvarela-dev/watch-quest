import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { MoviesActions } from '../../movies/store/movies.actions';
import { SeriesActions } from '../../series/store/series.actions';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PreFetchResolver implements Resolve<boolean> {
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const movieActions = [
      MoviesActions.loadRatedMovies(),
      MoviesActions.loadFavoriteMovies(),
      MoviesActions.loadWatchlistMovies(),
    ];

    const seriesActions = [
      SeriesActions.loadRatedSeries(),
      SeriesActions.loadWatchlistSeries(),
      SeriesActions.loadFavoriteSeries(),
    ];

    const allActions = [...movieActions, ...seriesActions];

    return forkJoin(
      allActions.map((action) => this.store.dispatch(action))
    ).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
