import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TrafficInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthenticationService,
    private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const clonedRequest = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${environment.tmbdApiKey}`
      ),
      params:
        this.auth.getSessionId() !== '{}'
          ? request.params.set('session_id', this.auth.getSessionId())
          : new HttpParams(),
    });

    return next.handle(clonedRequest).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && request.method !== 'GET') {
          const { body } = event;
          if (body.success === false) {
            this.toastr.error(body.status_message, 'Error');
          } else {
            this.toastr.success(body.status_message, 'Success');
          }
        }
        return event;
      })
    );
  }
}
