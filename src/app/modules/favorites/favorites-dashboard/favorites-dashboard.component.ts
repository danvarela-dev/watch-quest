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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(MoviesActions.loadFavoriteMovies());
    this.store.dispatch(SeriesActions.loadFavoriteSeries());
    this.favoriteMovies$ = this.store.select(selectFavoritesMovies);
    this.favoriteSeries$ = this.store.select(selectFavoriteSeries);
  }

  convertToBehaviorSubject(
    media: MovieDetails | SeriesDetails | undefined
  ): BehaviorSubject<MovieDetails | SeriesDetails | undefined> {
    return new BehaviorSubject<MovieDetails | SeriesDetails | undefined>(media);
  }
}
