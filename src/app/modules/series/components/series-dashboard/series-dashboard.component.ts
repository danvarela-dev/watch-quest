import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { FavoriteRequest } from 'src/app/modules/shared/interfaces/favorite.interface';
import { WatchlistRequest } from 'src/app/modules/shared/interfaces/watchlist.interface';
import { AppState } from 'src/app/store/app.store';
import { SeriesDetails } from '../../interfaces/series.interface';
import { SeriesActions } from '../../store/series.actions';
import {
  selectAiringTodayCurrentPage,
  selectAiringTodaySeries,
  selectOnTheAirCurrentPage,
  selectOnTheAirSeries,
  selectPopularCurrentPage,
  selectPopularSeries,
  selectTopRatedCurrentPage,
  selectTopRatedSeries,
} from '../../store/series.selectors';

@Component({
  selector: 'app-series-dashboard',
  templateUrl: './series-dashboard.component.html',
  styleUrls: ['./series-dashboard.component.scss'],
})
export class SeriesDashboardComponent implements OnInit {
  onTheAir$ = new Observable<SeriesDetails[]>();
  popular$ = new Observable<SeriesDetails[]>();
  topRated$ = new Observable<SeriesDetails[]>();
  airingToday$ = new Observable<SeriesDetails[]>();

  currentOnTheAirPage = 1;
  currentPopularPage = 1;
  currentTopRatedPage = 1;
  currentAiringTodayPage = 1;

  constructor(private store: Store<AppState>, private route: Router) {}

  ngOnInit(): void {
    this.store.dispatch(
      SeriesActions.loadSeries({ category: 'onTheAir', page: 1 })
    );
    this.store.dispatch(
      SeriesActions.loadSeries({ category: 'popular', page: 1 })
    );
    this.store.dispatch(
      SeriesActions.loadSeries({ category: 'topRated', page: 1 })
    );
    this.store.dispatch(
      SeriesActions.loadSeries({ category: 'airingToday', page: 1 })
    );

    this.onTheAir$ = this.store.select(selectOnTheAirSeries);
    this.popular$ = this.store.select(selectPopularSeries);
    this.topRated$ = this.store.select(selectTopRatedSeries);
    this.airingToday$ = this.store.select(selectAiringTodaySeries);
  }

  openSeriesDetails(id: number, category: string) {
    this.store.dispatch(SeriesActions.loadSerieDetails({ id, category }));
    this.store.dispatch(SeriesActions.loadSerieProviders({ id }));
    this.store.dispatch(SeriesActions.loadSerieCast({ id }));
    this.route.navigate(['/cms/series', category, id]);
  }

  getNextPage(category: string, curentSlidePage: number): void {
    let selector;

    switch (category) {
      case 'onTheAir':
        this.currentAiringTodayPage = curentSlidePage;
        selector = selectOnTheAirCurrentPage;
        break;
      case 'popular':
        this.currentPopularPage = curentSlidePage;
        selector = selectPopularCurrentPage;
        break;
      case 'topRated':
        this.currentTopRatedPage = curentSlidePage;
        selector = selectTopRatedCurrentPage;
        break;
      case 'airingToday':
        this.currentAiringTodayPage = curentSlidePage;
        selector = selectAiringTodayCurrentPage;
        break;
      default:
        break;
    }

    if (selector) {
      this.store
        .select(selector)
        .pipe(
          take(1),
          map((page: number) => page + 1)
        )
        .subscribe((page) => {
          this.store.dispatch(SeriesActions.loadSeries({ category, page }));
          this.store.dispatch(SeriesActions.loadFavoriteSeries());
          this.store.dispatch(SeriesActions.loadWatchlistSeries());
          this.store.dispatch(SeriesActions.loadRatedSeries());
        });
    }
  }

  rateSerie(rating: { rating: number; id: number }): void {
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
