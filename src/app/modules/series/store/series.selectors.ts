import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSeries from './series.reducer';

export const selectSeriesState = createFeatureSelector<fromSeries.State>(
  fromSeries.seriesFeatureKey
);
