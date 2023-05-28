import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './modules/main-layout/components/main-layout/main-layout.component';
import { LoggedGuard } from './modules/shared/guards/login/logged.guard';
import { NotLoggedGuard } from './modules/shared/guards/not-logged/not-logged.guard';
import { resolve } from 'dns';
import { PreFetchResolver } from './modules/shared/resolvers/pre-fetch.resolver';

const routes: Routes = [
  {
    path: 'cms',
    component: MainLayoutComponent,
    canActivate: [LoggedGuard],
    resolve: { prefetch: PreFetchResolver },
    children: [
      {
        path: 'movies',
        loadChildren: () =>
          import('./modules/movies/movies.module').then((m) => m.MoviesModule),
      },
      {
        path: 'series',
        loadChildren: () =>
          import('./modules/series/series.module').then((m) => m.SeriesModule),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./modules/favorites/favorites.module').then(
            (m) => m.FavoritesModule
          ),
      },
      {
        path: 'watchlist',
        loadChildren: () =>
          import('./modules/watchlist/watchlist.module').then(
            (m) => m.WatchlistModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    canActivate: [NotLoggedGuard],
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
