import { BehaviorSubject } from 'rxjs';
import { MovieDetails } from '../../movies/interfaces/movies.interfaces';
import { SeriesDetails } from '../../series/interfaces/series.interface';

export function convertToBehaviorSubject(
  media: MovieDetails | SeriesDetails | undefined
): BehaviorSubject<MovieDetails | SeriesDetails | undefined> {
  return new BehaviorSubject<MovieDetails | SeriesDetails | undefined>(media);
}
