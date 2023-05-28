import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { WatchlistRoutingModule } from './watchlist-routing.module';
import { WatchlistDashboardComponent } from './watchlist-dashboard/watchlist-dashboard.component';
import { SeriesEffects } from '../series/store/series.effects';
import { MoviesEffects } from '../movies/store/movies.effects';
import { EffectsModule } from '@ngrx/effects';
import { SeriesService } from '../series/services/series/series.service';
import { MoviesService } from '../movies/services/movies/movies.service';

@NgModule({
  declarations: [WatchlistDashboardComponent],
  imports: [
    CommonModule,
    WatchlistRoutingModule,
    SharedModule,
    EffectsModule.forFeature([MoviesEffects, SeriesEffects]),
  ],
  providers: [MoviesService, SeriesService],
})
export class WatchlistModule {}
