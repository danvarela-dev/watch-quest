import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, HttpClientModule, AuthenticationRoutingModule],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
