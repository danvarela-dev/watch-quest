import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MoviesResponse } from '../../interfaces/movies.interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient) {}

  getNowPlaying(page = 1): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(
      `${environment.tmdbApiHost}/movie/now_playing`,
      { params: { page } }
    );
  }

  getPopular(page = 1): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(
      `${environment.tmdbApiHost}/movie/popular`,
      {
        params: { page },
      }
    );
  }

  getTopRated(page = 1): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(
      `${environment.tmdbApiHost}/movie/top_rated`,
      { params: { page } }
    );
  }

  getUpcoming(page = 1): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(
      `${environment.tmdbApiHost}/movie/upcoming`,
      { params: { page } }
    );
  }
}
