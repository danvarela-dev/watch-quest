import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesDashboardComponent } from './favorites-dashboard/favorites-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { MoviesEffects } from '../movies/store/movies.effects';
import { MoviesService } from '../movies/services/movies/movies.service';
import { SeriesEffects } from '../series/store/series.effects';
import { SeriesService } from '../series/services/series/series.service';

@NgModule({
  declarations: [FavoritesDashboardComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule,
    EffectsModule.forFeature([MoviesEffects, SeriesEffects]),
  ],
  providers: [MoviesService, SeriesService],
})
export class FavoritesModule {}
