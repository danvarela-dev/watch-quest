import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { SeriesDashboardComponent } from './components/series-dashboard/series-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SeriesDashboardComponent,
  },
  {
    path: ':id',
    component: SeriesDetailsComponent,
  },
  {
    path: ':category/:id',
    component: SeriesDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeriesRoutingModule {}
