import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreFetchResolver } from '../shared/resolvers/pre-fetch.resolver';
import { WathchlistDashboardComponent } from './watchlist-dashboard/watchlist-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: WathchlistDashboardComponent,
    resolve: { prefetch: PreFetchResolver },
  },
  { path: '**', redirectTo: 'watchlist' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchlistRoutingModule {}
