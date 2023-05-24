import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { MainLayoutModule } from './modules/main-layout/main-layout.module';
// import { reducers } from './store/app.store';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    MainLayoutModule,
    SharedModule,
    // StoreModule.forRoot(reducers),
    // EffectsModule.forRoot([]),
    // StoreDevtoolsModule.instrument(),
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
