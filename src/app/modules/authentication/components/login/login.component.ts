import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../../interfaces/auth-response.interface';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authStatus: AuthResponse;

  constructor(private route: Router, private auth: AuthenticationService) {}

  login(): void {
    this.auth.requestToken().subscribe((authResponse: AuthResponse) => {
      this.auth.saveToken(authResponse);
      this.openTMBDLoginPage(authResponse);
    });
  }

  openTMBDLoginPage(auth: AuthResponse): void {
    if (auth.success) {
      window.location.href = `https://www.themoviedb.org/authenticate/${auth.request_token}?redirect_to=${environment.host}`;
    }
  }
}
