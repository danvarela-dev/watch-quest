import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeriesResponse } from 'src/app/modules/series/interfaces/series.interface';
import { FavoriteRequest } from 'src/app/modules/shared/interfaces/favorite.interface';
import { ProviderResponse } from 'src/app/modules/shared/interfaces/provider.interface';
import { Response } from 'src/app/modules/shared/interfaces/response.interface';
import { WatchlistRequest } from 'src/app/modules/shared/interfaces/watchlist.interface';
import { environment } from 'src/environments/environment';
import {
  MovieDetails,
  MoviesResponse
} from '../../interfaces/movies.interfaces';

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient) {}

  getNowPlaying(page = 1): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(
      `${environment.tmdbApiHost}/movie/now_playing?page=${page}`
    );
  }

  getPopular(page = 1): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(
      `${environment.tmdbApiHost}/movie/popular?page=${page}`
    );
  }

  getTopRated(page = 1): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(
      `${environment.tmdbApiHost}/movie/top_rated?page=${page}`
    );
  }

  getUpcoming(page = 1): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(
      `${environment.tmdbApiHost}/movie/upcoming?page=${page}`
    );
  }

  rateMovie(movieId: number, rating: number): Observable<Response> {
    return this.http.post<Response>(
      `${environment.tmdbApiHost}/movie/${movieId}/rating`,
      {
        value: rating,
      }
    );
  }
  getRatedMovies(): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(
      `${environment.tmdbApiHost}/account/account_id/rated/movies`
    );
  }

  addFavorite(favoriteRequest: FavoriteRequest): Observable<Response> {
    return this.http.post<Response>(
      `${environment.tmdbApiHost}/account/account_id/favorite`,
      favoriteRequest
    );
  }

  getFavoriteMovies(): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(
      `${environment.tmdbApiHost}/account/account_id/favorite/movies`
    );
  }

  addToWatchlist(watchListRequest: WatchlistRequest): Observable<Response> {
    return this.http.post<Response>(
      `${environment.tmdbApiHost}/account/account_id/watchlist`,
      watchListRequest
    );
  }

  getWatchlistMovies(): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(
      `${environment.tmdbApiHost}/account/account_id/watchlist/movies`
    );
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${environment.tmdbApiHost}/movie/${id}?append_to_response=videos,credits`
    );
  }

  getProviders(id: number): Observable<ProviderResponse> {
    return this.http.get<ProviderResponse>(
      `${environment.tmdbApiHost}/movie/${id}/watch/providers`
    );
  }

  search(
    query: string,
    searchBy: string
  ): Observable<MoviesResponse | SeriesResponse> {
    return this.http.get<MoviesResponse | SeriesResponse>(
      `${environment.tmdbApiHost}/search/${searchBy}?query=${query}`
    );
  }
}
