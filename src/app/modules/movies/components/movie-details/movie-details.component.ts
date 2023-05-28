import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject, filter, takeUntil } from 'rxjs';
import { SeriesDetails } from 'src/app/modules/series/interfaces/series.interface';
import { FavoriteRequest } from 'src/app/modules/shared/interfaces/favorite.interface';
import { WatchlistRequest } from 'src/app/modules/shared/interfaces/watchlist.interface';
import { AppState } from 'src/app/store/app.store';
import { MovieDetails } from '../../interfaces/movies.interfaces';
import { MoviesActions } from '../../store/movies.actions';
import { selectMovieByID } from '../../store/movies.selectors';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  movie$ = new BehaviorSubject<MovieDetails | SeriesDetails | undefined>(
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
        this.store.dispatch(MoviesActions.loadMovies({ category, page: 1 }));
        this.store.dispatch(MoviesActions.loadMovieProviders({ id }));
        this.store.dispatch(
          MoviesActions.loadMovieDetails({
            id,
            category: category ?? 'popular',
          })
        );
      });

    this.store
      .select(selectMovieByID(this.categoryIdPair$.getValue().id))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((movie) => {
        this.movie$.next(movie);
      });

    this.movie$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((movie) => movie !== undefined)
      )
      .subscribe((movie) => {
        if (!movie) {
          this.store.dispatch(
            MoviesActions.loadMovieDetails({
              ...this.categoryIdPair$.getValue(),
            })
          );
          this.store.dispatch(
            MoviesActions.loadMovieProviders({
              id: this.categoryIdPair$.getValue().id,
            })
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.categoryIdPair$.complete();
    this.movie$.complete();
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
