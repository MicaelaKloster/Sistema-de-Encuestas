import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Punto de entrada principal de la aplicación Angular
// Inicializa la aplicación con el componente principal y la configuración definida
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
); // Maneja errores de arranque mostrando el error en consola
