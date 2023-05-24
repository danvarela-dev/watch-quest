import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as lodash from 'lodash';
import { AuthResponse } from 'src/app/modules/authentication/interfaces/auth-response.interface';

@Injectable()
export class SnakeToCamelInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const camelCasedBody = this.transformBody(event.body);
          return event.clone({ body: camelCasedBody });
        } else {
          return event;
        }
      })
    );
  }

  transformBody(body: any): any {
    const transformedResponse = lodash.mapKeys(body, (_, key) =>
      lodash.camelCase(key)
    );
    return transformedResponse;
  }
}
