import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { MainLayoutModule } from './modules/main-layout/main-layout.module';
import { SharedModule } from './modules/shared/shared.module';
import { reducers } from './store/app.store';

const components = [AppComponent];
const modules = [
  RouterModule,
  BrowserModule,
  AppRoutingModule,
  MainLayoutModule,
  BrowserAnimationsModule,
  SharedModule,
  StoreModule.forRoot(reducers),
  StoreDevtoolsModule.instrument(),
  EffectsModule.forRoot([]),
  ToastrModule.forRoot({
    maxOpened: 1,
    autoDismiss: true,
    preventDuplicates: true,
  }),
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
