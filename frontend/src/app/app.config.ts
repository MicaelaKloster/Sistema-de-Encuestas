import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

// Configuración principal de la aplicación Angular
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Optimiza la detección de cambios en Angular
    provideRouter(routes), // Proveedor de rutas definidas en app.routes.ts
    provideAnimationsAsync(), // Habilita animaciones de Angular de forma asíncrona
    providePrimeNG({
      theme: {
        preset: Aura, // Aplica el tema Aura de PrimeNG
      },
    }),
    provideHttpClient(), // Proveedor para realizar peticiones HTTP
  ],
};
