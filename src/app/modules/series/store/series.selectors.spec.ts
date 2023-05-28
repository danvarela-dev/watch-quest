import * as fromSeries from './series.reducer';
import { selectSeriesState } from './series.selectors';

describe('Series Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSeriesState({
      [fromSeries.seriesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
