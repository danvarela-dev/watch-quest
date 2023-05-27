import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesDashboardComponent } from './components/movies-dashboard/movies-dashboard.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesService } from './services/movies/movies.service';
import { MoviesEffects } from './store/movies.effects';
import * as fromMovies from './store/movies.reducer';

const components = [MoviesDashboardComponent, MovieDetailsComponent];
const services = [MoviesService];
const modules = [
  CommonModule,
  MoviesRoutingModule,
  SharedModule,
  StoreModule.forFeature(fromMovies.moviesFeatureKey, fromMovies.moviesReducer),
  EffectsModule.forFeature([MoviesEffects]),
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
  providers: [...services],
})
export class MoviesModule {}
