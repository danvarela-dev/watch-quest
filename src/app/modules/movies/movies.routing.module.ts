import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesDashboardComponent } from './components/movies-dashboard/movies-dashboard.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { PreFetchResolver } from '../shared/resolvers/pre-fetch.resolver';

const routes: Routes = [
  {
    path: '',
    component: MoviesDashboardComponent,
    resolve: { prefetch: PreFetchResolver },
  },
  {
    path: ':id',
    component: MovieDetailsComponent,
    resolve: { prefetch: PreFetchResolver },
  },
  {
    path: ':category/:id',
    component: MovieDetailsComponent,
    resolve: { prefetch: PreFetchResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
