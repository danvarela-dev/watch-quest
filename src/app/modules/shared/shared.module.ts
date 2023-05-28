import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CardComponent } from './components/card/card.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CircleComponent } from './components/circle/circle.component';
import { LoggedGuard } from './guards/login/logged.guard';
import { TrafficInterceptor } from './interceptors/traffic/traffic.interceptor';
import { AccountService } from './services/account/account.service';
import { AccountEffects } from './store/account.effects';
import * as fromAccount from './store/account.reducer';
import { NotLoggedGuard } from './guards/not-logged/not-logged.guard';
import { NgCircleProgressModule } from 'ng-circle-progress';

const interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: TrafficInterceptor, multi: true },
];

const guards = [LoggedGuard, NotLoggedGuard];
const providers = [AccountService];
const components = [CardComponent, CircleComponent, CarouselComponent];
const modules = [
  CommonModule,
  HttpClientModule,
  StoreModule.forFeature(
    fromAccount.accountFeatureKey,
    fromAccount.accountReducer
  ),
  EffectsModule.forFeature([AccountEffects]),
  NgCircleProgressModule.forRoot({
    radius: 100,
    outerStrokeWidth: 10,
    innerStrokeWidth: 6,
    outerStrokeColor: '#78C000',
    innerStrokeColor: '#C7E596',
    animationDuration: 300,
  }),
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [...interceptors, ...guards, ...providers],
  exports: [...components],
})
export class SharedModule {}
