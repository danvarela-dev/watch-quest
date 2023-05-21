import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  requestToken(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(
      `${environment.tmdbApiHost}/authentication/token/new?redirect_to=localhost:4200`
    );
  }

  // requestGuestSession():Observable<any>{
  //   return this.http.get<any>
  // }
}
