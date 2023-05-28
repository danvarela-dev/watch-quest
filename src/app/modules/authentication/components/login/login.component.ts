import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { AuthResponse } from '../../interfaces/auth-response.interface';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  authStatus: AuthResponse;

  constructor(private route: Router, private auth: AuthenticationService) {}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

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
