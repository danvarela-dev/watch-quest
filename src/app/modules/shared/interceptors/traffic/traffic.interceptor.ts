import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TrafficInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private route: Router
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
      }),
      catchError((err) => {
        if (err.status === 404) {
          this.toastr.error('Resource not found', 'Error');
          this.route.navigate(['/cms/movies']);
        }
        throw err;
      })
    );
  }
}
