import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { SeriesDashboardComponent } from './components/series-dashboard/series-dashboard.component';
import { PreFetchResolver } from '../shared/resolvers/pre-fetch.resolver';

const routes: Routes = [
  {
    path: '',
    component: SeriesDashboardComponent,
    resolve: { prefetch: PreFetchResolver },
  },
  {
    path: ':id',
    component: SeriesDetailsComponent,
    resolve: { prefetch: PreFetchResolver },
  },
  {
    path: ':category/:id',
    component: SeriesDetailsComponent,
    resolve: { prefetch: PreFetchResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeriesRoutingModule {}
