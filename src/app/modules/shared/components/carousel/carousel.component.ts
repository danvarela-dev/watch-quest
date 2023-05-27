import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, takeUntil } from 'rxjs';
import {
  Movie,
  MovieDetails,
} from 'src/app/modules/movies/interfaces/movies.interfaces';
import { FavoriteRequest } from '../../interfaces/favorite.interface';
import { WatchlistRequest } from '../../interfaces/watchlist.interface';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':decrement', [
        style({ transform: 'translateX(-100%)' }),
        animate('800ms', style({ transform: 'translateX(0)' })),
      ]),
      transition(':increment', [
        style({ transform: 'translateX(100%)' }),
        animate('800ms', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() slidesPagePair: {
    currentSlidePage: number;
    slides: Observable<(MovieDetails | undefined)[]>;
  };
  @Output() getNewSlides = new EventEmitter<number>();
  @Output() onAddFavorite = new EventEmitter<FavoriteRequest>();
  @Output() onAddToWatchlist = new EventEmitter<WatchlistRequest>();
  @Output() onRate = new EventEmitter<{ rating: number; id: number }>();
  @Output() onMovieSelect = new EventEmitter<number>();

  paginatedSlides: (MovieDetails | undefined)[][];
  animationState = 0;

  currentPage = 0;

  unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.slidesPagePair.slides
      .pipe(
        filter((slides) => slides.length > 0),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((slides) => {
        this.paginatedSlides = this.paginateSlides(slides);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectMovie(id: number): void {
    this.onMovieSelect.emit(id);
  }

  convertToBehaviorSubject(
    movie: MovieDetails | undefined
  ): BehaviorSubject<MovieDetails | undefined> {
    return new BehaviorSubject<MovieDetails | undefined>(movie);
  }

  paginateSlides(
    slides: (MovieDetails | undefined)[]
  ): (MovieDetails | undefined)[][] {
    if (!this.slidesPagePair) return [[]];

    let result = [];

    for (var i = 0; i < slides.length; i += 3) {
      result.push(slides.slice(i, i + 3));
    }
    return result;
  }

  nextSlide(): void {
    if (this.currentPage < this.paginatedSlides.length - 1) {
      this.currentPage++;
      this.animationState++;
    }

    if (this.currentPage === this.paginatedSlides.length - 1) {
      this.getNewSlides.emit(this.currentPage);
    }
  }

  previousSlide(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.animationState--;
    }
  }

  addFavorite(favoriteRequest: FavoriteRequest): void {
    this.onAddFavorite.emit(favoriteRequest);
  }

  rateMovie($event: { rating: number; id: number }): void {
    this.onRate.emit($event);
  }

  addToWatchlist(movie: WatchlistRequest): void {
    this.onAddToWatchlist.emit(movie);
  }
}
