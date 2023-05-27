import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavoriteRequest } from 'src/app/modules/shared/interfaces/favorite.interface';
import { Response } from 'src/app/modules/shared/interfaces/response.interface';
import { WatchlistRequest } from 'src/app/modules/shared/interfaces/watchlist.interface';
import { environment } from 'src/environments/environment';
import {
  SeriesDetails,
  SeriesResponse,
} from '../../interfaces/series.interface';

@Injectable()
export class SeriesService {
  constructor(private http: HttpClient) {}

  seriesService(page = 1): Observable<SeriesResponse> {
    return this.http.get<SeriesResponse>(
      `${environment.tmdbApiHost}/tv/airing_today?page=${page}`
    );
  }

  getOnTheAir(page = 1): Observable<SeriesResponse> {
    return this.http.get<SeriesResponse>(
      `${environment.tmdbApiHost}/tv/on_the_air?page=${page}`
    );
  }

  getPopular(page = 1): Observable<SeriesResponse> {
    return this.http.get<SeriesResponse>(
      `${environment.tmdbApiHost}/tv/popular?page=${page}`
    );
  }

  getTopRated(page = 1): Observable<SeriesResponse> {
    return this.http.get<SeriesResponse>(
      `${environment.tmdbApiHost}/tv/top_rated?page=${page}`
    );
  }

  getUpcoming(page = 1): Observable<SeriesResponse> {
    return this.http.get<SeriesResponse>(
      `${environment.tmdbApiHost}/tv/upcoming?page=${page}`
    );
  }

  rateSeries(seriesId: number, rating: number): Observable<Response> {
    return this.http.post<Response>(
      `${environment.tmdbApiHost}/tv/${seriesId}/rating`,
      {
        value: rating,
      }
    );
  }

  getRatedSeries(): Observable<SeriesResponse> {
    return this.http.get<SeriesResponse>(
      `${environment.tmdbApiHost}/account/account_id/rated/series`
    );
  }

  addFavorite(favoriteRequest: FavoriteRequest): Observable<Response> {
    return this.http.post<Response>(
      `${environment.tmdbApiHost}/account/account_id/favorite`,
      favoriteRequest
    );
  }

  getFavoriteSeries(): Observable<SeriesResponse> {
    return this.http.get<SeriesResponse>(
      `${environment.tmdbApiHost}/account/account_id/favorite/series`
    );
  }

  addToWatchlist(watchlistRequest: WatchlistRequest): Observable<Response> {
    return this.http.post<Response>(
      `${environment.tmdbApiHost}/account/account_id/watchlist`,
      watchlistRequest
    );
  }

  getWatchlistSeries(): Observable<SeriesResponse> {
    return this.http.get<SeriesResponse>(
      `${environment.tmdbApiHost}/account/account_id/watchlist/series`
    );
  }

  getSeriesDetails(id: number): Observable<SeriesDetails> {
    return this.http.get<SeriesDetails>(`${environment.tmdbApiHost}/tv/${id}`);
  }
}