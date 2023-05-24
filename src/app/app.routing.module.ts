import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './modules/main-layout/components/main-layout/main-layout.component';
import { LoggedGuard } from './modules/shared/guards/login/logged.guard';
import { NotLoggedGuard } from './modules/shared/guards/not-logged/not-logged.guard';

const routes: Routes = [
  {
    path: 'cms',
    component: MainLayoutComponent,
    canActivate: [LoggedGuard],
    children: [
      {
        path: 'movies',
        loadChildren: () =>
          import('./modules/movies/movies.module').then((m) => m.MoviesModule),
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