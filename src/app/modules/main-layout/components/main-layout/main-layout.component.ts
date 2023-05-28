import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  filter,
  switchMap,
  takeUntil,
} from 'rxjs';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import {
  MovieDetails,
  MoviesResponse,
} from 'src/app/modules/movies/interfaces/movies.interfaces';
import { MoviesService } from 'src/app/modules/movies/services/movies/movies.service';
import {
  SeriesDetails,
  SeriesResponse,
} from 'src/app/modules/series/interfaces/series.interface';
import { Account } from 'src/app/modules/shared/interfaces/account.interface';
import { AccountActions } from 'src/app/modules/shared/store/account.actions';
import { selectAccountState } from 'src/app/modules/shared/store/account.selectors';
import { convertToBehaviorSubject } from 'src/app/modules/shared/utils/helper.functions';
import { AppState } from 'src/app/store/app.store';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  account$: Observable<Account>;
  unsubscribe$ = new Subject<void>();
  queryResults: MoviesResponse | SeriesResponse | undefined;

  searchForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private authService: AuthenticationService,
    private movieService: MoviesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AccountActions.loadAccount());
    this.account$ = this.store.select(selectAccountState);

    this.searchForm = this.formBuilder.group({
      searchField: new FormControl(''),
      searchBy: new FormControl(''),
    });

    this.searchForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500),
        filter((value) => value !== ''),
        switchMap((value) =>
          this.movieService.search(value.searchField, value.searchBy || 'movie')
        )
      )
      .subscribe(
        (results: MoviesResponse | SeriesResponse) => {
          this.queryResults = results;
          if (this.queryResults.results.length === 0) {
            this.toastr.warning('No results found');
          }
        },
        (error) => {
          this.toastr.error(error.error.status_message);
        }
      );
  }

  getFieldValue(field: string): 'movie' | 'serie' {
    return this.searchForm.get(field)?.value === 'tv' ? 'serie' : 'movie';
  }

  getResults(): (MovieDetails | SeriesDetails | undefined)[] {
    return this.queryResults?.results || [];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logOut(): void {
    this.authService.logOut().subscribe(() => {
      localStorage.removeItem('session_id');
      localStorage.removeItem('auth');
      this.router.navigate(['/auth/log-in']);
    });
  }

  convertToBehaviorSubject(
    media: MovieDetails | SeriesDetails | undefined
  ): BehaviorSubject<MovieDetails | SeriesDetails | undefined> {
    return convertToBehaviorSubject(media);
  }

  goToMedia(number: number): void {
    this.queryResults = undefined;
    if (this.getFieldValue('searchBy') === 'serie') {
      this.router.navigate(['/cms/series', number]);
    } else {
      this.router.navigate(['/cms/movies', number]);
    }
  }
}
