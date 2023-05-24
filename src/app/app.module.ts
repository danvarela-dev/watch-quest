import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { MainLayoutModule } from './modules/main-layout/main-layout.module';
import { reducers } from './store/app.store';
import { SharedModule } from './modules/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const components = [AppComponent];
const modules = [
  RouterModule,
  BrowserModule,
  AppRoutingModule,
  MainLayoutModule,
  SharedModule,
  StoreModule.forRoot(reducers),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument(),
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
