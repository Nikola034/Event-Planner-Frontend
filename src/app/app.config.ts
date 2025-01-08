import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { Interceptor } from './infrastructure/auth/http-interceptor';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NotificationService } from './layout/sidebar-notifications/notification.service';
import { SuspensionService } from './shared/user/suspension.service';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),provideAnimations(),provideHttpClient(withFetch()), { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    importProvidersFrom(
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      })
    ),
    { provide: APP_INITIALIZER, useFactory: () => () => null, deps: [NotificationService,SuspensionService], multi: true },
    provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide:HTTP_INTERCEPTORS,
            useClass: Interceptor,
            multi:true
        }
  ]
};
