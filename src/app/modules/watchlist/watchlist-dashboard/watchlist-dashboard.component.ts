import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { MovieDetails } from '../../movies/interfaces/movies.interfaces';
import { MoviesActions } from '../../movies/store/movies.actions';
import { selectWatchlistMovies } from '../../movies/store/movies.selectors';
import { SeriesDetails } from '../../series/interfaces/series.interface';
import { SeriesActions } from '../../series/store/series.actions';
import { selectWatchlistSeries } from '../../series/store/series.selectors';
import { FavoriteRequest } from '../../shared/interfaces/favorite.interface';
import { WatchlistRequest } from '../../shared/interfaces/watchlist.interface';

@Component({
  selector: 'app-watchlist-dashboard',
  templateUrl: './watchlist-dashboard.component.html',
  styleUrls: ['./watchlist-dashboard.component.scss'],
})
export class WatchlistDashboardComponent implements OnInit {
  watchlistMovies$: Observable<(MovieDetails | undefined)[]>;
  watchlistSeries$: Observable<(SeriesDetails | undefined)[]>;

  currentWatchlistMoviesPage = 1;
  currentWatchlistSeriesPage = 1;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.watchlistMovies$ = this.store.select(selectWatchlistMovies);
    this.watchlistSeries$ = this.store.select(selectWatchlistSeries);
  }

  openDetails(id: number, mediaType: string): void {
    if (mediaType === 'movie') {
      this.store.dispatch(
        MoviesActions.loadMovieDetails({ id, category: 'popular' })
      );
    } else {
      this.store.dispatch(
        SeriesActions.loadSerieDetails({ id, category: 'popular' })
      );
      this.store.dispatch(SeriesActions.loadSerieProviders({ id }));
    }
    this.router.navigate([`/cms/${mediaType}`, id]);
  }

  rate(
    rating: { rating: number; id: number },
    mediaType: 'movie' | 'serie'
  ): void {
    if (mediaType === 'movie') {
      this.store.dispatch(MoviesActions.rateMovie(rating));
    } else {
      this.store.dispatch(SeriesActions.rateSerie(rating));
    }
  }

  addToWatchlist(
    watchlistRequest: WatchlistRequest,
    mediaType: 'movie' | 'serie'
  ): void {
    if (mediaType === 'movie') {
      this.store.dispatch(
        MoviesActions.addToWatchlist({
          data: { request: { ...watchlistRequest, media_type: 'movie' } },
        })
      );

      if (!watchlistRequest.watchlist) {
        this.store.dispatch(
          MoviesActions.removeFromWatchlist({ id: watchlistRequest.media_id })
        );
      }
    } else {
      this.store.dispatch(
        SeriesActions.addToWatchlist({
          data: { request: { ...watchlistRequest, media_type: 'tv' } },
        })
      );

      if (!watchlistRequest.watchlist) {
        this.store.dispatch(
          SeriesActions.removeFromWatchlist({ id: watchlistRequest.media_id })
        );
      }
    }
  }

  addFavorite(
    favoriteRequest: FavoriteRequest,
    mediaType: 'movie' | 'serie'
  ): void {
    if (mediaType === 'movie') {
      this.store.dispatch(
        MoviesActions.addFavorite({
          data: { request: { ...favoriteRequest, media_type: 'movie' } },
        })
      );

      if (!favoriteRequest.favorite) {
        this.store.dispatch(
          MoviesActions.removeFavorite({ id: favoriteRequest.media_id })
        );
      }
    } else {
      this.store.dispatch(
        SeriesActions.addFavorite({
          data: { request: { ...favoriteRequest, media_type: 'tv' } },
        })
      );

      if (!favoriteRequest.favorite) {
        this.store.dispatch(
          SeriesActions.removeFavorite({ id: favoriteRequest.media_id })
        );
      }
    }
  }
}
