import { createFeature, createReducer, on } from '@ngrx/store';
import { SeriesActions } from './series.actions';
import { EntityState, Update, createEntityAdapter } from '@ngrx/entity';
import { Series, SeriesDetails } from '../interfaces/series.interface';
import { Provider } from '../../shared/interfaces/provider.interface';

export const seriesFeatureKey = 'series';

export interface SeriesState {
  onTheAir: { currentPage: number; series: EntityState<SeriesDetails> };
  popular: { currentPage: number; series: EntityState<SeriesDetails> };
  topRated: { currentPage: number; series: EntityState<SeriesDetails> };
  airingToday: { currentPage: number; series: EntityState<SeriesDetails> };
  favorites: { currentPage: number; series: EntityState<SeriesDetails> };
  watchlist: { currentPage: number; series: EntityState<SeriesDetails> };
}

export const seriesAdapter = createEntityAdapter<SeriesDetails>();

export const initialState: SeriesState = seriesAdapter.getInitialState({
  onTheAir: { currentPage: 1, series: seriesAdapter.getInitialState() },
  popular: { currentPage: 1, series: seriesAdapter.getInitialState() },
  topRated: { currentPage: 1, series: seriesAdapter.getInitialState() },
  airingToday: { currentPage: 1, series: seriesAdapter.getInitialState() },
  favorites: { currentPage: 1, series: seriesAdapter.getInitialState() },
  watchlist: { currentPage: 1, series: seriesAdapter.getInitialState() },
});

export const seriesReducer = createReducer(
  initialState,
  on(SeriesActions.loadSeries, (state) => state),
  on(SeriesActions.loadSeriesSuccess, (state, { category, series }) => {
    switch (category) {
      case 'onTheAir':
        return {
          ...state,
          onTheAir: {
            currentPage: series.page,
            series: seriesAdapter.upsertMany(
              series.results.filter((serie) => serie !== null),
              state.onTheAir.series
            ),
          },
        };

      case 'popular':
        return {
          ...state,
          popular: {
            currentPage: series.page,
            series: seriesAdapter.upsertMany(
              series.results.filter((serie) => serie !== null),
              state.popular.series
            ),
          },
        };
      case 'topRated':
        return {
          ...state,
          topRated: {
            currentPage: series.page,
            series: seriesAdapter.upsertMany(
              series.results.filter((serie) => serie !== null),
              state.topRated.series
            ),
          },
        };

      case 'airingToday':
        return {
          ...state,
          airingToday: {
            currentPage: series.page,
            series: seriesAdapter.upsertMany(
              series.results.filter((serie) => serie !== null),
              state.airingToday.series
            ),
          },
        };
      default:
        return state;
    }
  }),
  on(SeriesActions.loadFavoriteSeries, (state) => state),
  on(SeriesActions.loadFavoriteSeriesSuccess, (state, { data: { series } }) => {
    const changes: Update<Series>[] = series.map((serie) => {
      return {
        id: serie.id,
        changes: {
          is_favorite: serie.is_favorite,
        },
      };
    });

    const newState = {
      ...state,
      favorites: {
        ...state.favorites,
        series: seriesAdapter.upsertMany(
          series as SeriesDetails[],
          state.favorites.series
        ),
      },
      airingToday: {
        ...state.airingToday,
        series: seriesAdapter.updateMany(changes, state.airingToday.series),
      },
      popular: {
        ...state.popular,
        series: seriesAdapter.updateMany(changes, state.popular.series),
      },
      topRated: {
        ...state.topRated,
        series: seriesAdapter.updateMany(changes, state.topRated.series),
      },
      onTheAir: {
        ...state.onTheAir,
        series: seriesAdapter.updateMany(changes, state.onTheAir.series),
      },
    };
    return newState;
  }),
  on(SeriesActions.rateSerieSuccess, (state, { id, rating }) => {
    return {
      ...state,
      airingToday: {
        ...state.airingToday,
        series: seriesAdapter.upsertOne(
          {
            ...state.airingToday.series.entities[id],
            rating,
          } as SeriesDetails,
          state.airingToday.series
        ),
      },
      popular: {
        ...state.popular,
        series: seriesAdapter.upsertOne(
          {
            ...state.popular.series.entities[id],
            rating,
          } as SeriesDetails,
          state.popular.series
        ),
      },
      topRated: {
        ...state.topRated,
        series: seriesAdapter.upsertOne(
          {
            ...state.topRated.series.entities[id],
            rating,
          } as SeriesDetails,
          state.topRated.series
        ),
      },
      onTheAir: {
        ...state.onTheAir,
        series: seriesAdapter.upsertOne(
          {
            ...state.onTheAir.series.entities[id],
            rating,
          } as SeriesDetails,
          state.onTheAir.series
        ),
      },
    };
  }),
  on(SeriesActions.loadRatedSeriesSuccess, (state, action) => {
    const changes: Update<Series>[] = action.data.series.map((serie) => {
      return {
        id: serie.id,
        changes: {
          rating: serie?.rating,
        },
      };
    });

    return {
      ...state,
      airingToday: {
        ...state.airingToday,
        series: seriesAdapter.updateMany(changes, state.airingToday.series),
      },
      popular: {
        ...state.popular,
        series: seriesAdapter.updateMany(changes, state.popular.series),
      },
      topRated: {
        ...state.topRated,
        series: seriesAdapter.updateMany(changes, state.topRated.series),
      },
      onTheAir: {
        ...state.onTheAir,
        series: seriesAdapter.updateMany(changes, state.onTheAir.series),
      },
    };
  }),
  on(
    SeriesActions.loadWatchlistSeriesSuccess,
    (state, { data: { series } }) => {
      const changes: Update<Series>[] = series.map((serie) => {
        return {
          id: serie.id,
          changes: {
            is_watchlist: serie.is_watchlist,
          },
        };
      });

      return {
        ...state,
        watchlist: {
          ...state.watchlist,
          series: seriesAdapter.upsertMany(series, state.watchlist.series),
        },
        airingToday: {
          ...state.airingToday,
          series: seriesAdapter.updateMany(changes, state.airingToday.series),
        },
        popular: {
          ...state.popular,
          series: seriesAdapter.updateMany(changes, state.popular.series),
        },
        topRated: {
          ...state.topRated,
          series: seriesAdapter.updateMany(changes, state.topRated.series),
        },
        onTheAir: {
          ...state.onTheAir,
          series: seriesAdapter.updateMany(changes, state.onTheAir.series),
        },
      };
    }
  ),
  on(SeriesActions.removeFavorite, (state, action) => {
    return {
      ...state,
      airingToday: {
        ...state.airingToday,
        series: seriesAdapter.upsertOne(
          {
            ...state.airingToday.series.entities[action.id],
            is_favorite: false,
          } as SeriesDetails,
          state.airingToday.series
        ),
      },
      popular: {
        ...state.popular,
        series: seriesAdapter.upsertOne(
          {
            ...state.popular.series.entities[action.id],
            is_favorite: false,
          } as SeriesDetails,
          state.popular.series
        ),
      },
      topRated: {
        ...state.topRated,
        series: seriesAdapter.upsertOne(
          {
            ...state.topRated.series.entities[action.id],
            is_favorite: false,
          } as SeriesDetails,
          state.topRated.series
        ),
      },
      onTheAir: {
        ...state.onTheAir,
        series: seriesAdapter.upsertOne(
          {
            ...state.onTheAir.series.entities[action.id],
            is_favorite: false,
          } as SeriesDetails,
          state.onTheAir.series
        ),
      },
    };
  }),
  on(SeriesActions.removeFromWatchlist, (state, action) => {
    return {
      ...state,
      airingToday: {
        ...state.airingToday,
        series: seriesAdapter.upsertOne(
          {
            ...state.airingToday.series.entities[action.id],
            is_watchlist: false,
          } as SeriesDetails,
          state.airingToday.series
        ),
      },
      popular: {
        ...state.popular,
        series: seriesAdapter.upsertOne(
          {
            ...state.popular.series.entities[action.id],
            is_watchlist: false,
          } as SeriesDetails,
          state.popular.series
        ),
      },
      topRated: {
        ...state.topRated,
        series: seriesAdapter.upsertOne(
          {
            ...state.topRated.series.entities[action.id],
            is_watchlist: false,
          } as SeriesDetails,
          state.topRated.series
        ),
      },
      onTheAir: {
        ...state.onTheAir,
        series: seriesAdapter.upsertOne(
          {
            ...state.onTheAir.series.entities[action.id],
            is_watchlist: false,
          } as SeriesDetails,
          state.onTheAir.series
        ),
      },
    };
  }),
  on(
    SeriesActions.loadSerieDetailsSuccess,
    (state, { data: { serie, category } }) => {
      switch (category) {
        case 'onTheAir':
          return {
            ...state,
            onTheAir: {
              ...state.onTheAir,
              series: seriesAdapter.upsertOne(serie, state.onTheAir.series),
            },
          };

        case 'popular':
          return {
            ...state,
            popular: {
              ...state.popular,
              series: seriesAdapter.upsertOne(serie, state.popular.series),
            },
          };
        case 'topRated':
          return {
            ...state,
            topRated: {
              ...state.topRated,
              series: seriesAdapter.upsertOne(serie, state.topRated.series),
            },
          };

        case 'upcoming':
          return {
            ...state,
            airingToday: {
              ...state.airingToday,
              series: seriesAdapter.upsertOne(serie, state.airingToday.series),
            },
          };
        default:
          return state;
      }
    }
  ),
  on(
    SeriesActions.loadSerieProvidersSuccess,
    (state, { data: { providers } }) => {
      const newProviders = [
        ...(providers.results.US?.flatrate || []),
        ...(providers.results.US?.buy || []),
        ...(providers.results.US?.free || []),
      ].filter((provider, index, self) => {
        return (
          index ===
          self.findIndex((t) => t.provider_name === provider.provider_name)
        );
      });

      return {
        ...state,
        airingToday: {
          ...state.airingToday,
          series: seriesAdapter.upsertOne(
            {
              ...state.airingToday.series.entities[providers.id],
              providers: newProviders,
            } as SeriesDetails,
            state.airingToday.series
          ),
        },
        popular: {
          ...state.popular,
          series: seriesAdapter.upsertOne(
            {
              ...state.popular.series.entities[providers.id],
              providers: newProviders,
            } as SeriesDetails,
            state.popular.series
          ),
        },
        topRated: {
          ...state.topRated,
          series: seriesAdapter.upsertOne(
            {
              ...state.topRated.series.entities[providers.id],
              providers: newProviders,
            } as SeriesDetails,
            state.topRated.series
          ),
        },
        onTheAir: {
          ...state.onTheAir,
          series: seriesAdapter.upsertOne(
            {
              ...state.onTheAir.series.entities[providers.id],
              providers: newProviders,
            } as SeriesDetails,
            state.onTheAir.series
          ),
        },
      };
    }
  ),
  on(SeriesActions.loadSerieCastSuccess, (state, { data: { id, credits } }) => {
    return {
      ...state,
      airingToday: {
        ...state.airingToday,
        series: seriesAdapter.upsertOne(
          {
            ...state.airingToday.series.entities[id],
            credits,
          } as SeriesDetails,
          state.airingToday.series
        ),
      },
      popular: {
        ...state.popular,
        series: seriesAdapter.upsertOne(
          {
            ...state.popular.series.entities[id],
            credits,
          } as SeriesDetails,
          state.popular.series
        ),
      },
      topRated: {
        ...state.topRated,
        series: seriesAdapter.upsertOne(
          {
            ...state.topRated.series.entities[id],
            credits,
          } as SeriesDetails,
          state.topRated.series
        ),
      },
      onTheAir: {
        ...state.onTheAir,
        series: seriesAdapter.upsertOne(
          {
            ...state.onTheAir.series.entities[id],
            credits,
          } as SeriesDetails,
          state.onTheAir.series
        ),
      },
    };
  })
);

export const seriesFeature = createFeature({
  name: seriesFeatureKey,
  reducer: seriesReducer,
});
