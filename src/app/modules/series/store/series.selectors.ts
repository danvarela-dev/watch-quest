import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSeries from './series.reducer';
import { SeriesDetails } from '../interfaces/series.interface';

export const selectSeriesState = createFeatureSelector<fromSeries.SeriesState>(
  fromSeries.seriesFeatureKey
);

export const selectOnTheAirSeries = createSelector(
  selectSeriesState,
  (state) => {
    const { ids, entities } = state.onTheAir.series;
    return ids
      .map((id) => entities[id])
      .filter((series): series is SeriesDetails => series !== undefined);
  }
);

export const selectPopularSeries = createSelector(
  selectSeriesState,
  (state) => {
    const { ids, entities } = state.popular.series;
    return ids
      .map((id) => entities[id])
      .filter((series): series is SeriesDetails => series !== undefined);
  }
);

export const selectTopRatedSeries = createSelector(
  selectSeriesState,
  (state) => {
    const { ids, entities } = state.topRated.series;
    return ids
      .map((id) => entities[id])
      .filter((series): series is SeriesDetails => series !== undefined);
  }
);

export const selectAiringTodaySeries = createSelector(
  selectSeriesState,
  (state) => {
    const { ids, entities } = state.airingToday.series;
    return ids
      .map((id) => entities[id])
      .filter((series): series is SeriesDetails => series !== undefined);
  }
);

export const selectFavoriteSeries = createSelector(
  selectSeriesState,
  (state) => {
    const { ids, entities } = state.favorites.series;
    return ids.map((id) => entities[id]);
  }
);

export const selectWatchlistSeries = createSelector(
  selectSeriesState,
  (state) => {
    const { ids, entities } = state.watchlist.series;
    return ids.map((id) => entities[id]);
  }
);

export const selectOnTheAirCurrentPage = createSelector(
  selectSeriesState,
  (state) => state.onTheAir.currentPage
);

export const selectPopularCurrentPage = createSelector(
  selectSeriesState,
  (state) => state.popular.currentPage
);

export const selectTopRatedCurrentPage = createSelector(
  selectSeriesState,
  (state) => state.topRated.currentPage
);

export const selectAiringTodayCurrentPage = createSelector(
  selectSeriesState,
  (state) => state.airingToday.currentPage
);

export const selectSerieById = (id: number) => {
  return createSelector(selectSeriesState, (state) => {
    const allSeries = {
      ...state.onTheAir.series.entities,
      ...state.popular.series.entities,
      ...state.topRated.series.entities,
      ...state.airingToday.series.entities,
    };
    return allSeries[id];
  });
};
