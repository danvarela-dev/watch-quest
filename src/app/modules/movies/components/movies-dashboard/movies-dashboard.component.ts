import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { FavoriteRequest } from 'src/app/modules/shared/interfaces/favorite.interface';
import { WatchlistRequest } from 'src/app/modules/shared/interfaces/watchlist.interface';
import { AppState } from 'src/app/store/app.store';
import { MovieDetails } from '../../interfaces/movies.interfaces';
import { MoviesActions } from '../../store/movies.actions';
import {
  selectNowPlayingCurrentPage,
  selectNowPlayingMovies,
  selectPopularCurrentPage,
  selectPopularMovies,
  selectTopRatedCurrentPage,
  selectTopRatedMovies,
  selectUpcomingCurrentPage,
  selectUpcomingMovies,
} from '../../store/movies.selectors';

@Component({
  selector: 'app-movies-dashboard',
  templateUrl: './movies-dashboard.component.html',
  styleUrls: ['./movies-dashboard.component.scss'],
})
export class MoviesDashboardComponent implements OnInit {
  nowPlaying$ = new Observable<MovieDetails[]>();
  popular$ = new Observable<MovieDetails[]>();
  topRated$ = new Observable<MovieDetails[]>();
  upcoming$ = new Observable<MovieDetails[]>();

  currentNowPlayingPage = 1;
  currentPopularPage = 1;
  currentTopRatedPage = 1;
  currentUpcomingPage = 1;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(
      MoviesActions.loadMovies({ category: 'nowPlaying', page: 1 })
    );
    this.store.dispatch(
      MoviesActions.loadMovies({ category: 'popular', page: 1 })
    );
    this.store.dispatch(
      MoviesActions.loadMovies({ category: 'topRated', page: 1 })
    );
    this.store.dispatch(
      MoviesActions.loadMovies({ category: 'upcoming', page: 1 })
    );

    this.nowPlaying$ = this.store.select(selectNowPlayingMovies);
    this.popular$ = this.store.select(selectPopularMovies);
    this.topRated$ = this.store.select(selectTopRatedMovies);
    this.upcoming$ = this.store.select(selectUpcomingMovies);
  }

  openMovieDetails(id: number, category: string): void {
    this.store.dispatch(MoviesActions.loadMovieDetails({ id, category }));
    this.store.dispatch(MoviesActions.loadMovieProviders({ id }));
    this.router.navigate(['/cms/movies', category, id]);
  }

  getNextPage(category: string, currentSlidePage: number): void {
    let selector;

    switch (category) {
      case 'nowPlaying':
        this.currentNowPlayingPage = currentSlidePage;
        selector = selectNowPlayingCurrentPage;
        break;
      case 'popular':
        this.currentPopularPage = currentSlidePage;
        selector = selectPopularCurrentPage;
        break;
      case 'topRated':
        this.currentTopRatedPage = currentSlidePage;
        selector = selectTopRatedCurrentPage;
        break;
      case 'upcoming':
        this.currentUpcomingPage = currentSlidePage;
        selector = selectUpcomingCurrentPage;
        break;
      default:
        return;
    }

    if (selector) {
      this.store
        .select(selector)
        .pipe(
          take(1),
          map((page: number) => page + 1)
        )
        .subscribe((page) => {
          this.store.dispatch(MoviesActions.loadMovies({ category, page }));
          this.store.dispatch(MoviesActions.loadFavoriteMovies());
          this.store.dispatch(MoviesActions.loadWatchlistMovies());
          this.store.dispatch(MoviesActions.loadRatedMovies());
        });
    }
  }

  rateMovie(rating: { rating: number; id: number }): void {
    this.store.dispatch(
      MoviesActions.rateMovie({ rating: rating.rating, id: rating.id })
    );
  }

  addToWatchlist(watchlistRequest: WatchlistRequest): void {
    this.store.dispatch(
      MoviesActions.addToWatchlist({ data: { request: watchlistRequest } })
    );

    if (!watchlistRequest.watchlist) {
      this.store.dispatch(
        MoviesActions.removeFromWatchlist({ id: watchlistRequest.media_id })
      );
    }
  }

  addFavorite(favoriteRequest: FavoriteRequest): void {
    this.store.dispatch(
      MoviesActions.addFavorite({ data: { request: favoriteRequest } })
    );

    if (!favoriteRequest.favorite) {
      this.store.dispatch(
        MoviesActions.removeFavorite({ id: favoriteRequest.media_id })
      );
    }
  }
}
