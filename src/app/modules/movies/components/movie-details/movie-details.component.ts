import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject, finalize, skip, takeUntil, tap } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { Movie, MovieDetails } from '../../interfaces/movies.interfaces';
import { MoviesActions } from '../../store/movies.actions';
import { selectMovieByID } from '../../store/movies.selectors';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  movie$ = new BehaviorSubject<MovieDetails | undefined>(undefined);
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
      });

    this.store
      .select(selectMovieByID(this.categoryIdPair$.getValue().id))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((movie) => {
        if (!movie) {
          this.store.dispatch(
            MoviesActions.loadMovieDetails({
              ...this.categoryIdPair$.getValue(),
            })
          );
        }
        this.movie$.next(movie);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.categoryIdPair$.complete();
    this.movie$.complete();
  }
}
