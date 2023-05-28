import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthResponse } from 'src/app/modules/authentication/interfaces/auth-response.interface';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';

@Injectable()
export class LoggedGuard {
  constructor(private auth: AuthenticationService, private route: Router) {}

  canActivate(state: RouterStateSnapshot): boolean {
    const authResponse: AuthResponse = this.auth.getToken();
    const sessionId = this.auth.getSessionId();

    if (
      state.url === '/auth/log-in' &&
      authResponse.request_token &&
      sessionId !== '{}'
    ) {
      this.route.navigate(['/cms/movies']);
      return false;
    }

    if (authResponse.request_token && sessionId) {
      return true;
    } else {
      this.route.navigate(['/auth/login']);
      return false;
    }
  }
}
