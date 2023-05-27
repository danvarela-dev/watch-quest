import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MoviesRoutingModule } from '../movies/movies-routing.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { TrafficInterceptor } from '../shared/interceptors/traffic/traffic.interceptor';

const components = [MainLayoutComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, MoviesRoutingModule, AuthenticationModule],
  exports: [...components]
})
export class MainLayoutModule {}
