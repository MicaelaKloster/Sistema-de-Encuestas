import { Routes } from '@angular/router';
import { CreacionEncuestaComponent } from './components/creacion-encuesta/creacion-encuesta.component';
import { BannerComponent } from './components/banner/banner.component';
import { PresentacionEnlacesComponent } from './components/enlaces/presentacion-enlaces.component';
import { ResponderEncuestaComponent } from './components/respuestas/responder-encuesta.component';
import { VisualizarResultadosComponent } from './components/resultados/visualizar-resultados.component';

/**
 * Definición de las rutas principales de la aplicación.
 * Cada ruta asocia un path con un componente correspondiente.
 */
export const routes: Routes = [
  {
    // Ruta principal (home), muestra el banner de bienvenida
    path: '',
    component: BannerComponent,
  },
  {
    // Ruta para la creación de una nueva encuesta
    path: 'creacion',
    component: CreacionEncuestaComponent,
  },
  {
    // Ruta para mostrar los enlaces generados tras crear una encuesta
    path: 'presentacion-enlaces',
    component: PresentacionEnlacesComponent,
  },
  {
    // Ruta para responder una encuesta, recibe el id y el token de participación como parámetros
    path: 'responder/:id/:tokenParticipacion',
    component: ResponderEncuestaComponent,
  },
  {
    // Ruta para visualizar los resultados de una encuesta, recibe el código de resultados como parámetro
    path: 'resultados/:codigoResultados',
    component: VisualizarResultadosComponent,
  },
  {
    // Ruta comodín: redirige cualquier ruta no reconocida al home
    path: '**',
    redirectTo: '',
  },
];