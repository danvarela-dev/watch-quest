import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { selectFavoritesMovies } from '../../movies/store/movies.selectors';
import { MoviesActions } from '../../movies/store/movies.actions';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieDetails } from '../../movies/interfaces/movies.interfaces';
import { SeriesDetails } from '../../series/interfaces/series.interface';
import { selectFavoriteSeries } from '../../series/store/series.selectors';
import { SeriesActions } from '../../series/store/series.actions';
import { Router } from '@angular/router';
import { WatchlistRequest } from '../../shared/interfaces/watchlist.interface';
import { FavoriteRequest } from '../../shared/interfaces/favorite.interface';

@Component({
  selector: 'app-favorites-dashboard',
  templateUrl: './favorites-dashboard.component.html',
  styleUrls: ['./favorites-dashboard.component.scss'],
})
export class FavoritesDashboardComponent implements OnInit {
  favoriteMovies$: Observable<(MovieDetails | undefined)[]>;
  favoriteSeries$: Observable<(SeriesDetails | undefined)[]>;

  currentFavoriteMoviesPage = 1;
  currentFavoriteSeriesPage = 1;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.favoriteMovies$ = this.store.select(selectFavoritesMovies);
    this.favoriteSeries$ = this.store.select(selectFavoriteSeries);
  }

  openDetails(id: number, mediaType: string): void {
    this.store.dispatch(
      MoviesActions.loadMovieDetails({ id, category: 'popular' })
    );
    this.store.dispatch(MoviesActions.loadMovieProviders({ id }));
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
        MoviesActions.addToWatchlist({ data: { request: watchlistRequest } })
      );

      if (!watchlistRequest.watchlist) {
        this.store.dispatch(
          MoviesActions.removeFromWatchlist({ id: watchlistRequest.media_id })
        );
      }
    } else {
      this.store.dispatch(
        SeriesActions.addToWatchlist({ data: { request: watchlistRequest } })
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
        MoviesActions.addFavorite({ data: { request: favoriteRequest } })
      );

      if (!favoriteRequest.favorite) {
        this.store.dispatch(
          MoviesActions.removeFavorite({ id: favoriteRequest.media_id })
        );
      }
    } else {
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
}
