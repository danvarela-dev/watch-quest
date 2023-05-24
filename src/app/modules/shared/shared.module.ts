import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedGuard } from './guards/login/logged.guard';
import { NotLoggedGuard } from './guards/not-logged/not-logged.guard';
import { SnakeToCamelInterceptor } from './interceptors/snake-to-camel/snaketocamel.interceptor';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { CircleComponent } from './components/circle/circle.component';
const interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SnakeToCamelInterceptor,
    multi: true,
  },
];

const guards = [LoggedGuard, NotLoggedGuard];
const components = [CardComponent, CircleComponent];
const modules = [CommonModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [...interceptors, ...guards],
  exports: [...components],
})
export class SharedModule {}
