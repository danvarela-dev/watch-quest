import * as fromMovies from './movies.reducer';
import { selectMoviesState } from './movies.selectors';

describe('Movies Selectors', () => {
  it('should select the feature state', () => {
    const result = selectMoviesState({
      [fromMovies.moviesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
