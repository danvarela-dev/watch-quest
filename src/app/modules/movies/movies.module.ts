import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesDashboardComponent } from './movies-dashboard/movies-dashboard.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const components = [MoviesDashboardComponent, MovieDetailsComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, MoviesRoutingModule],
  exports: [...components],
})
export class MoviesModule {}
