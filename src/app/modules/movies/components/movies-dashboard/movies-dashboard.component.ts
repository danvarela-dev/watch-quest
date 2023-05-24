import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesState } from '../../store/movies.reducer';
import { Store } from '@ngrx/store';
import { MoviesActions } from '../../store/movies.actions';

@Component({
  selector: 'app-movies-dashboard',
  templateUrl: './movies-dashboard.component.html',
  styleUrls: ['./movies-dashboard.component.scss'],
})
export class MoviesDashboardComponent implements OnInit, OnDestroy {
  constructor(private store: Store<MoviesState>) {}

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
  }

  ngOnDestroy(): void {}
}
