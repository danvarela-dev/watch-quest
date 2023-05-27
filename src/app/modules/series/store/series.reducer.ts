import { createFeature, createReducer, on } from '@ngrx/store';
import { SeriesActions } from './series.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { SeriesDetails } from '../interfaces/series.interface';

export const seriesFeatureKey = 'series';

export interface SeriesState {
  onTheAir: { currentPage: number; series: EntityState<SeriesDetails> };
  popular: { currentPage: number; series: EntityState<SeriesDetails> };
  topRated: { currentPage: number; series: EntityState<SeriesDetails> };
  upcoming: { currentPage: number; series: EntityState<SeriesDetails> };
}

export const seriesAdapter = createEntityAdapter<SeriesDetails>();

export const initialState: SeriesState = seriesAdapter.getInitialState({
  onTheAir: { currentPage: 1, series: seriesAdapter.getInitialState() },
  popular: { currentPage: 1, series: seriesAdapter.getInitialState() },
  topRated: { currentPage: 1, series: seriesAdapter.getInitialState() },
  upcoming: { currentPage: 1, series: seriesAdapter.getInitialState() },
});

export const seriesReducer = createReducer(
  initialState,
  on(SeriesActions.loadSeries, (state) => state),
  on(SeriesActions.loadSeriesSuccess, (state, action) => state)
);

export const seriesFeature = createFeature({
  name: seriesFeatureKey,
  reducer: seriesReducer,
});
