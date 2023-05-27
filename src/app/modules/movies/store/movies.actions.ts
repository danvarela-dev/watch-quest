import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FavoriteRequest } from '../../shared/interfaces/favorite.interface';
import { WatchlistRequest } from '../../shared/interfaces/watchlist.interface';
import {
  Movie,
  MovieDetails,
  MoviesResponse,
} from '../interfaces/movies.interfaces';
import { Response } from '../../shared/interfaces/response.interface';

export const MoviesActions = createActionGroup({
  source: 'Movies',
  events: {
    'Load Movies': props<{ category: string; page: number }>(),
    'Load Movies Success': props<{
      category: string;
      movies: MoviesResponse;
    }>(),
    'Load Favorite Movies': emptyProps(),
    'Load Favorite Movies Success': props<{
      data: { movies: Movie[] };
    }>(),
    'Rate Movie': props<{ rating: number; id: number }>(),
    'Rate Movie Success': props<{ rating: number; id: number }>(),
    'Load Rated Movies': emptyProps(),
    'Load Rated Movies Success': props<{ data: { movies: MovieDetails[] } }>(),
    'Add Favorite': props<{ data: { request: FavoriteRequest } }>(),
    'Remove Favorite': props<{ id: number }>(),
    'Add Favorite Success': props<{ data: { response: Response } }>(),
    'Add to Watchlist': props<{ data: { request: WatchlistRequest } }>(),
    'Remove From Watchlist': props<{ id: number }>(),
    'Add to Watchlist Success': props<{
      data: { response: Response };
    }>(),
    'Load Watchlist Movies': emptyProps(),
    'Load Watchlist Movies Success': props<{
      data: { movies: MovieDetails[] };
    }>(),
    'Load Movie Details': props<{ id: number; category: string }>(),
    'Load Movie Details Success': props<{
      data: { movie: MovieDetails; category: string };
    }>(),
  },
});
