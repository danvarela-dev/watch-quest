import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MoviesEffects } from '../movies/store/movies.effects';
import { SharedModule } from '../shared/shared.module';
import { SeriesDashboardComponent } from './components/series-dashboard/series-dashboard.component';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { SeriesRoutingModule } from './series.routing.module';
import { SeriesService } from './services/series/series.service';
import { SeriesEffects } from './store/series.effects';
import * as fromSeries from './store/series.reducer';
import { MoviesService } from '../movies/services/movies/movies.service';

const modules = [
  CommonModule,
  SeriesRoutingModule,
  SharedModule,
  StoreModule.forFeature(fromSeries.seriesFeatureKey, fromSeries.seriesReducer),
  EffectsModule.forFeature([MoviesEffects, SeriesEffects]),

  HttpClientModule,
];
const components = [SeriesDashboardComponent, SeriesDetailsComponent];

const services = [SeriesService, MoviesService];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [...services],
})
export class SeriesModule {}
