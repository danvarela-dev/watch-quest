import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationService {
  isLoggedIn = false;

  constructor(private http: HttpClient) {}

  requestToken(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(
      `${environment.tmdbApiHost}/authentication/token/new?redirect_to=${environment.host}`
    );
  }

  createSession(): Observable<any> {
    return this.http.post(
      `${environment.tmdbApiHost}/authentication/session/new`,
      { request_token: this.getToken().request_token }
    );
  }

  saveToken(auth: AuthResponse): void {
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  getToken(): AuthResponse {
    return JSON.parse(localStorage.getItem('auth') ?? '{}');
  }

  saveSessionId(sessionId: string): void {
    localStorage.setItem('session_id', sessionId);
  }

  getSessionId(): string {
    return localStorage.getItem('session_id') ?? '{}';
  }
}
