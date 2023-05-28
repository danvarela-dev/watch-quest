import { Component } from '@angular/core';
import { MovieDetails } from '../../movies/interfaces/movies.interfaces';
import { SeriesDetails } from '../../series/interfaces/series.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { MoviesActions } from '../../movies/store/movies.actions';
import { SeriesActions } from '../../series/store/series.actions';
import { selectWatchlistMovies } from '../../movies/store/movies.selectors';
import { selectWatchlistSeries } from '../../series/store/series.selectors';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-watchlist-dashboard',
  templateUrl: './watchlist-dashboard.component.html',
  styleUrls: ['./watchlist-dashboard.component.scss'],
})
export class WathchlistDashboardComponent {
  watchlistMovies$: Observable<(MovieDetails | undefined)[]>;
  watchlistSeries$: Observable<(SeriesDetails | undefined)[]>;

  currentWatchlistMoviesPage = 1;
  currentWatchlistSeriesPage = 1;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(MoviesActions.loadWatchlistMovies());
    this.store.dispatch(SeriesActions.loadWatchlistSeries());
    this.watchlistMovies$ = this.store.select(selectWatchlistMovies);
    this.watchlistSeries$ = this.store.select(selectWatchlistSeries);
  }

  convertToBehaviorSubject(
    media: MovieDetails | SeriesDetails | undefined
  ): BehaviorSubject<MovieDetails | SeriesDetails | undefined> {
    return new BehaviorSubject<MovieDetails | SeriesDetails | undefined>(media);
  }
}
