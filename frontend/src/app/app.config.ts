import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideEnvironmentNgxMask } from 'ngx-mask'
import { provideHttpClient, withFetch } from '@angular/common/http';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideEnvironmentNgxMask(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    DecimalPipe, {provide: LOCALE_ID, useValue: 'pt'}, provideAnimationsAsync(),
    
  ]
};
