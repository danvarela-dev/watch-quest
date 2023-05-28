import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesDashboardComponent } from './favorites-dashboard/favorites-dashboard.component';
import { PreFetchResolver } from '../shared/resolvers/pre-fetch.resolver';

const routes: Routes = [
  {
    path: '',
    component: FavoritesDashboardComponent,
    resolve: { prefetch: PreFetchResolver },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesRoutingModule {}
