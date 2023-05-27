import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { MovieDetails } from 'src/app/modules/movies/interfaces/movies.interfaces';
import { FavoriteRequest } from '../../interfaces/favorite.interface';
import { WatchlistRequest } from '../../interfaces/watchlist.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() isThumbnail = true;
  @Input('movie') movie$: BehaviorSubject<MovieDetails | undefined>;
  @Output() afterViewInit = new EventEmitter<void>();
  @Output() onAddFavorite = new EventEmitter<FavoriteRequest>();
  @Output() onRate = new EventEmitter<{ rating: number; id: number }>();
  @Output() onAddToWatchlist = new EventEmitter<WatchlistRequest>();
  @Output() onMovieSelect = new EventEmitter<number>();

  ratingArray: string[] = [];
  url = '';
  tmbdBaseUrl = 'https://www.themoviedb.org/movie/';
  unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.movie$.pipe(takeUntil(this.unsubscribe$)).subscribe((movie) => {
      if (movie) {
        this.setRating(this.movie$.value?.rating);
        this.url = `url('${'https://image.tmdb.org/t/p/original'}${
          movie.backdrop_path
        }')`;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getMovieObservable(): Observable<MovieDetails> {
    return this.movie$.asObservable() as Observable<MovieDetails>;
  }

  generateStarArray(rating: number): string[] {
    const starArray: string[] = [];

    const fullStars: number = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
      starArray.push('fullstar');
    }

    for (let i = starArray.length; i < 5; i++) {
      starArray.push('emptystar');
    }

    return starArray;
  }

  addFavorite(currentStatus: boolean): void {
    const favoriteRequest: FavoriteRequest = {
      favorite: !currentStatus,
      media_id: this.movie$.value?.id || 0,
      media_type: 'movie',
    };

    this.onAddFavorite.emit(favoriteRequest);
  }

  selectMovie(): void {
    this.onMovieSelect.emit(this.movie$.value?.id);
  }

  addToWatchlist(currentStatus: boolean): void {
    const watchlistRequest: WatchlistRequest = {
      watchlist: !currentStatus,
      media_id: this.movie$.value?.id || 0,
      media_type: 'movie',
    };

    this.onAddToWatchlist.emit(watchlistRequest);
  }

  onHoverRating(rating: number): void {
    this.setRating(rating);
  }

  onClickRating(rating: number): void {
    this.onRate.emit({ rating: rating, id: this.movie$.value?.id ?? 0 });
    this.setRating(rating);
  }

  setRating(rating = this.movie$.value?.rating || 0): void {
    this.ratingArray = this.generateStarArray(rating);
  }
}
