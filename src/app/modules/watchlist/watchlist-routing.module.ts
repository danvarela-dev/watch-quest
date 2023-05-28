import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WathchlistDashboardComponent } from './watchlist-dashboard/watchlist-dashboard.component';

const routes: Routes = [
  { path: '', component: WathchlistDashboardComponent },
  { path: '**', redirectTo: 'watchlist' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchlistRoutingModule {}
