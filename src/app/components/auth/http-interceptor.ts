import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if 'localStorage' is available before accessing it
    let accessToken: string | null = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      accessToken = localStorage.getItem('access_token');
    }

    // Skip the interceptor if the request has the 'skip' header
    if (req.headers.get('skip')) {
      return next.handle(req);
    }

    // If there is an access token, clone the request to include the Authorization header
    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req); // Proceed without Authorization header if no token
    }
  }
}
