import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, HttpClientModule, AuthenticationRoutingModule],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
