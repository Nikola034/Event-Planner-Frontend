import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip adding token for refresh token requests to prevent loops
    if (request.url.includes('refresh_token')) {
      return next.handle(request);
    }

    // Add token to other requests
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        const refreshReq = this.addToken(new HttpRequest('POST', 'api/v1/auth/refresh_token', {}), refreshToken);

        return next.handle(refreshReq).pipe(
          switchMap((response: any) => {
            this.isRefreshing = false;
            
            // Store the new tokens
            localStorage.setItem('access_token', response.body.accessToken);
            localStorage.setItem('refresh_token', response.body.refreshToken);
            
            this.refreshTokenSubject.next(response.body.accessToken);

            // Retry the original request with new token
            return next.handle(this.addToken(request, response.body.accessToken));
          }),
          catchError(error => {
            this.isRefreshing = false;
            
            // If refresh fails, clear tokens and redirect to login
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            
            // You might want to inject Router and redirect to login page here
            // this.router.navigate(['/login']);
            
            return throwError(() => error);
          })
        );
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next.handle(this.addToken(request, token)))
    );
  }
}