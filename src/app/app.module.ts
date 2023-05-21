import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainLayoutModule } from './modules/main-layout/main-layout.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { AuthInterceptor } from './modules/shared/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggedGuard } from './modules/shared/guards/login/logged.guard';
import { NotLoggedGuard } from './modules/shared/guards/not-logged-guard/login.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [RouterModule, BrowserModule, AppRoutingModule, MainLayoutModule],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    LoggedGuard,
    NotLoggedGuard,
  ],
})
export class AppModule {}
