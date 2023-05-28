import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromSeries from './store/series.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SeriesEffects } from './store/series.effects';
import { SeriesDashboardComponent } from './components/series-dashboard/series-dashboard.component';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { SeriesService } from './services/series/series.service';
import { HttpClientModule } from '@angular/common/http';
import { SeriesRoutingModule } from './series.routing.module';
import { SharedModule } from '../shared/shared.module';

const modules = [
  CommonModule,
  SeriesRoutingModule,
  SharedModule,
  StoreModule.forFeature(fromSeries.seriesFeatureKey, fromSeries.seriesReducer),
  EffectsModule.forFeature([SeriesEffects]),
  HttpClientModule,
];
const components = [SeriesDashboardComponent, SeriesDetailsComponent];

const services = [SeriesService];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [...services],
})
export class SeriesModule {}
