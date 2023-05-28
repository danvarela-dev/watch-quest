import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { MovieDetails } from 'src/app/modules/movies/interfaces/movies.interfaces';
import { AppState } from 'src/app/store/app.store';
import { SeriesDetails } from '../../interfaces/series.interface';
import { SeriesActions } from '../../store/series.actions';
import { selectSerieById } from '../../store/series.selectors';
import { WatchlistRequest } from 'src/app/modules/shared/interfaces/watchlist.interface';
import { FavoriteRequest } from 'src/app/modules/shared/interfaces/favorite.interface';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.scss'],
})
export class SeriesDetailsComponent implements OnInit {
  unsubscribe$ = new Subject<void>();
  serie$ = new BehaviorSubject<MovieDetails | SeriesDetails | undefined>(
    undefined
  );
  categoryIdPair$ = new BehaviorSubject<{ id: number; category: string }>({
    id: 0,
    category: '',
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ id, category }) => {
        this.categoryIdPair$.next({
          id,
          category,
        });

        this.store.dispatch(
          SeriesActions.loadSerieDetails({
            id,
            category: category ?? 'popular',
          })
        );
        this.store.dispatch(SeriesActions.loadSerieProviders({ id }));
        this.store.dispatch(SeriesActions.loadSerieCast({ id }));
      });

    this.store
      .select(selectSerieById(this.categoryIdPair$.getValue().id))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((movie) => {
        if (!movie) {
          this.store.dispatch(
            SeriesActions.loadSerieDetails({
              ...this.categoryIdPair$.getValue(),
            })
          );
          this.store.dispatch(
            SeriesActions.loadSerieProviders({
              id: this.categoryIdPair$.getValue().id,
            })
          );
        }
        this.serie$.next(movie);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.categoryIdPair$.complete();
    this.serie$.complete();
  }

  rateMovie(rating: { rating: number; id: number }): void {
    this.store.dispatch(
      SeriesActions.rateSerie({ rating: rating.rating, id: rating.id })
    );
  }

  addToWatchlist(watchlistRequest: WatchlistRequest): void {
    this.store.dispatch(
      SeriesActions.addToWatchlist({ data: { request: watchlistRequest } })
    );

    if (!watchlistRequest.watchlist) {
      this.store.dispatch(
        SeriesActions.removeFromWatchlist({ id: watchlistRequest.media_id })
      );
    }
  }

  addFavorite(favoriteRequest: FavoriteRequest): void {
    this.store.dispatch(
      SeriesActions.addFavorite({ data: { request: favoriteRequest } })
    );

    if (!favoriteRequest.favorite) {
      this.store.dispatch(
        SeriesActions.removeFavorite({ id: favoriteRequest.media_id })
      );
    }
  }
}
