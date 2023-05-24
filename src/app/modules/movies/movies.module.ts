import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesDashboardComponent } from './components/movies-dashboard/movies-dashboard.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { SharedModule } from '../shared/shared.module';
import { MoviesService } from './services/movies/movies.service';
import { HttpClientModule } from '@angular/common/http';

const components = [MoviesDashboardComponent, MovieDetailsComponent];
const services = [MoviesService];
const modules = [CommonModule, MoviesRoutingModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
  providers: [...services],
})
export class MoviesModule {}
