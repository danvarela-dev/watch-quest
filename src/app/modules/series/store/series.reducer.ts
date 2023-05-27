import { createFeature, createReducer, on } from '@ngrx/store';
import { SeriesActions } from './series.actions';

export const seriesFeatureKey = 'series';

export interface State {}

export const initialState: State = {};

export const reducer = createReducer(
  initialState
  // on(SeriesActions.loadSeriess, state => state),
  // on(SeriesActions.loadSeriessSuccess, (state, action) => state),
  // on(SeriesActions.loadSeriessFailure, (state, action) => state),
);

export const seriesFeature = createFeature({
  name: seriesFeatureKey,
  reducer,
});
