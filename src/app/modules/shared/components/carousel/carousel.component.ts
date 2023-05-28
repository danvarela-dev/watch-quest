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
import { MovieDetails } from 'src/app/modules/movies/interfaces/movies.interfaces';
import { SeriesDetails } from 'src/app/modules/series/interfaces/series.interface';
import { FavoriteRequest } from '../../interfaces/favorite.interface';
import { WatchlistRequest } from '../../interfaces/watchlist.interface';
import { convertToBehaviorSubject } from '../../utils/helper.functions';
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
    slides: Observable<(MovieDetails | SeriesDetails | undefined)[]>;
  };
  @Input() mediaType: 'movie' | 'serie' = 'movie';
  @Output() getNewSlides = new EventEmitter<number>();
  @Output() onAddFavorite = new EventEmitter<FavoriteRequest>();
  @Output() onAddToWatchlist = new EventEmitter<WatchlistRequest>();
  @Output() onRate = new EventEmitter<{ rating: number; id: number }>();
  @Output() onMediaSelect = new EventEmitter<number>();

  paginatedSlides: (MovieDetails | SeriesDetails | undefined)[][];
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

  selectMedia(id: number): void {
    this.onMediaSelect.emit(id);
  }

  convertToBehaviorSubject(
    media: MovieDetails | SeriesDetails | undefined
  ): BehaviorSubject<MovieDetails | SeriesDetails | undefined> {
    return convertToBehaviorSubject(media);
  }

  paginateSlides(
    slides: (MovieDetails | SeriesDetails | undefined)[]
  ): (MovieDetails | SeriesDetails | undefined)[][] {
    if (!this.slidesPagePair) return [[]];

    const result = [];

    for (let i = 0; i < slides.length; i += 3) {
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

  rateMedia($event: { rating: number; id: number }): void {
    this.onRate.emit($event);
  }

  addToWatchlist(media: WatchlistRequest): void {
    this.onAddToWatchlist.emit(media);
  }
}
