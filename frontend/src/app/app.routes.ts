import { Routes } from '@angular/router';
import { ComienzoComponent } from './components/comienzo/comienzo.component';
import { CreacionEncuestaComponent } from './components/creacion-encuesta/creacion-encuesta.component';

// Definición de las rutas principales de la aplicación Angular
export const routes: Routes = [
  {
    path: '', // Ruta raíz (home)
    component: ComienzoComponent, // Componente que se muestra en la ruta raíz
  },
  {
    path: 'creacion', // Ruta para la creación de encuestas
    component: CreacionEncuestaComponent, // Componente que se muestra en la ruta 'creacion'
  },
  {
    path: '**', // Ruta comodín (cualquier ruta no definida)
    redirectTo: '', // Redirige a la ruta raíz
  },
];
