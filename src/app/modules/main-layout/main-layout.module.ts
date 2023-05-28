import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthenticationModule } from '../authentication/authentication.module';
import { MoviesRoutingModule } from '../movies/movies.routing.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

const components = [MainLayoutComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    AuthenticationModule,
    PortalModule,
    OverlayModule,
  ],
  exports: [...components],
})
export class MainLayoutModule {}
