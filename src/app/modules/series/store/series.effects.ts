import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { finalize, map, mergeMap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.store';
import { Response } from '../../shared/interfaces/response.interface';
import { SeriesService } from '../services/series/series.service';
import { SeriesActions } from './series.actions';

@Injectable()
export class SeriesEffects {
  loadSeries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SeriesActions.loadSeries),
      mergeMap(({ page, category }) => {
        switch (category) {
          case 'onTheAir':
            return this.seriesService.seriesService(page).pipe(
              map((data) => {
                return SeriesActions.loadSeriesSuccess({
                  series: data,
                  category: category,
                });
              })
            );
          case 'popular':
            return this.seriesService.getPopular(page).pipe(
              map((data) => {
                return SeriesActions.loadSeriesSuccess({
                  series: data,
                  category: category,
                });
              })
            );
          case 'topRated':
            return this.seriesService.getTopRated(page).pipe(
              map((data) =>
                SeriesActions.loadSeriesSuccess({
                  series: data,
                  category: category,
                })
              )
            );
          case 'upcoming':
            return this.seriesService.getUpcoming(page).pipe(
              map((data) =>
                SeriesActions.loadSeriesSuccess({
                  series: data,
                  category: category,
                })
              )
            );
          default:
            return EMPTY;
        }
      })
    );
  });

  addFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SeriesActions.addFavorite),
      mergeMap(({ data: { request } }) => {
        return this.seriesService.addFavorite(request).pipe(
          finalize(() =>
            this.store.dispatch(SeriesActions.loadFavoriteSeries())
          ),
          map((response: Response) =>
            SeriesActions.addFavoriteSuccess({
              data: { response: { ...response, media_id: request?.media_id } },
            })
          )
        );
      })
    );
  });

  loadFavoriteMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SeriesActions.loadFavoriteSeries),
      mergeMap(() => {
        return this.seriesService.getFavoriteSeries().pipe(
          map((data) => {
            data.results = [
              ...data.results.map((movie) => {
                return { ...movie, is_favorite: true };
              }),
            ];
            return SeriesActions.loadFavoriteSeriesSuccess({
              data: { series: data.results },
            });
          })
        );
      })
    );
  });

  addToWatchlist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SeriesActions.addToWatchlist),
      mergeMap(({ data: { request } }) => {
        return this.seriesService.addToWatchlist(request).pipe(
          finalize(() =>
            this.store.dispatch(SeriesActions.loadWatchlistSeries())
          ),
          map((response: Response) =>
            SeriesActions.addToWatchlistSuccess({
              data: { response: { ...response, media_id: request?.media_id } },
            })
          )
        );
      })
    );
  });

  loadWatchlistSeries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SeriesActions.loadWatchlistSeries),
      mergeMap(() => {
        return this.seriesService.getWatchlistSeries().pipe(
          map((data) => {
            data.results = [
              ...data.results.map((movie) => {
                return { ...movie, is_watchlist: true };
              }),
            ];
            return SeriesActions.loadWatchlistSeriesSuccess({
              data: { series: data.results },
            });
          })
        );
      })
    );
  });

  rateSerie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SeriesActions.rateMovie),
      mergeMap(({ rating, id }) => {
        return this.seriesService.rateSeries(id, rating).pipe(
          map(() => {
            return SeriesActions.rateMovieSuccess({
              id,
              rating,
            });
          })
        );
      })
    );
  });

  loadRatedSeries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SeriesActions.loadRatedSeries),
      mergeMap(() => {
        return this.seriesService.getRatedSeries().pipe(
          map((data) => {
            return SeriesActions.loadRatedSeriesSuccess({
              data: { series: data.results },
            });
          })
        );
      })
    );
  });

  loadSeriesDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SeriesActions.loadSerieDetails),
      mergeMap(({ id, category }) => {
        return this.seriesService.getSeriesDetails(id).pipe(
          finalize(() => {
            this.store.dispatch(SeriesActions.loadFavoriteSeries());
            this.store.dispatch(SeriesActions.loadWatchlistSeries());
            this.store.dispatch(SeriesActions.loadRatedSeries());
          }),
          map((serie) => {
            return SeriesActions.loadSerieDetailsSuccess({
              data: { serie, category },
            });
          })
        );
      })
    );
  });

  loadSerieProviders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SeriesActions.loadSerieProviders),
      mergeMap(({ id }) => {
        return this.seriesService.getSeriesProviders(id).pipe(
          map((providers) => {
            return SeriesActions.loadSerieProvidersSuccess({
              data: { providers },
            });
          })
        );
      })
    );
  });
  constructor(
    private actions$: Actions,
    private seriesService: SeriesService,
    private store: Store<AppState>
  ) {}
}
