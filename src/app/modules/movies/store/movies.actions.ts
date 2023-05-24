import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MoviesResponse } from '../interfaces/movies.interfaces';

export const MoviesActions = createActionGroup({
  source: 'Movies',
  events: {
    'Load Movies': props<{ category: string; page: number }>(),
    'Load Movies Success': props<{
      category: string;
      movies: MoviesResponse;
    }>(),

    'Load Movies Failure': props<{ error: unknown }>(),
  },
});
