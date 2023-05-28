import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { MovieDetails } from 'src/app/modules/movies/interfaces/movies.interfaces';
import { SeriesDetails } from 'src/app/modules/series/interfaces/series.interface';
import { FavoriteRequest } from '../../interfaces/favorite.interface';
import { WatchlistRequest } from '../../interfaces/watchlist.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() isThumbnail = true;
  @Input('media') media$: BehaviorSubject<
    MovieDetails | SeriesDetails | undefined
  >;
  @Input() isQueryResult = false;
  @Input() mediaType: 'movie' | 'serie' | '' = '';
  @Output() afterViewInit = new EventEmitter<void>();
  @Output() onAddFavorite = new EventEmitter<FavoriteRequest>();
  @Output() onRate = new EventEmitter<{ rating: number; id: number }>();
  @Output() onAddToWatchlist = new EventEmitter<WatchlistRequest>();
  @Output() onMediaSelect = new EventEmitter<number>();

  ratingArray: string[] = [];
  url = '';
  tmbdBaseUrl = 'https://www.themoviedb.org/movie/';
  unsubscribe$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.media$.pipe(takeUntil(this.unsubscribe$)).subscribe((media) => {
      if (media) {
        this.setRating(this.media$.value?.rating);
        this.url = `url('${'https://image.tmdb.org/t/p/original'}${
          media.backdrop_path ? media.backdrop_path : media.poster_path
        }')`;
      }
    });

    if (this.router.url.includes('series') && this.mediaType === '') {
      this.mediaType = 'serie';
    } else {
      this.mediaType = 'movie';
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getMediaObservable(): Observable<MovieDetails | SeriesDetails> {
    return this.media$.asObservable() as Observable<
      MovieDetails | SeriesDetails
    >;
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
      media_id: this.media$.value?.id || 0,
      media_type: this.mediaType === 'serie' ? 'tv' : this.mediaType,
    };
    this.onAddFavorite.emit(favoriteRequest);
  }

  selectMedia(): void {
    if (!this.isThumbnail) return;
    this.onMediaSelect.emit(this.media$.value?.id);
  }

  addToWatchlist(currentStatus: boolean): void {
    const watchlistRequest: WatchlistRequest = {
      watchlist: !currentStatus,
      media_id: this.media$.value?.id || 0,
      media_type: this.mediaType === 'serie' ? 'tv' : 'movie',
    };

    this.onAddToWatchlist.emit(watchlistRequest);
  }

  onHoverRating(rating: number): void {
    this.setRating(rating);
  }

  onClickRating(rating: number): void {
    this.onRate.emit({ rating: rating, id: this.media$.value?.id ?? 0 });
    this.setRating(rating);
  }

  setRating(rating = this.media$.value?.rating || 0): void {
    this.ratingArray = this.generateStarArray(rating);
  }

  getMediaTitle(): string {
    let title = '';
    this.media$
      .asObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((media) => {
        if (media) {
          if ('title' in media) {
            title = media.title;
          } else {
            title = media.name;
          }
        }
      });
    return title;
  }

  getMediaReleaseDate(): string {
    let releaseDate = '';
    this.media$
      .asObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((media) => {
        if (media) {
          if ('release_date' in media) {
            releaseDate = media.release_date;
          } else {
            releaseDate = media.first_air_date;
          }
        }
      });
    return releaseDate;
  }
}
