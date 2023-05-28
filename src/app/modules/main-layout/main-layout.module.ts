import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthenticationModule } from '../authentication/authentication.module';
import { MoviesRoutingModule } from '../movies/movies.routing.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesService } from '../movies/services/movies/movies.service';
import { SharedModule } from '../shared/shared.module';

const components = [MainLayoutComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    AuthenticationModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [...components],
  providers: [MoviesService],
})
export class MainLayoutModule {}
