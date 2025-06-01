import { Routes } from '@angular/router';
import { ComienzoComponent } from './components/comienzo/comienzo.component';
import { CreacionEncuestaComponent } from './components/creacion-encuesta/creacion-encuesta.component';
import { BannerComponent } from './components/banner/banner.component';
import { PresentacionEnlacesComponent } from './components/enlaces/presentacion-enlaces.component'
import { ResponderEncuestaComponent } from './components/respuestas/responder-encuesta.component'
import { VisualizarResultadosComponent } from './components/resultados/visualizar-resultados.component'

// Definición de las rutas principales de la aplicación Angular
export const routes: Routes = [
  {
    path: '', // Ruta raíz (home)
    component: BannerComponent, // Componente que se muestra en la ruta raíz
  },
  {
    path: 'creacion', // Ruta para la creación de encuestas
    component: CreacionEncuestaComponent, // Componente que se muestra en la ruta 'creacion'
  },
  {
  path: 'presentacion-enlaces', // Ruta para la presentación de enlaces luego de finalizar una encuesta
  component: PresentacionEnlacesComponent, // Componente que se muestra en la ruta 'presentacion-enlaces'
  },
  { path: 'responder/:id/:tokenParticipacion', // Ruta para participar y responder la encuesta
    component: ResponderEncuestaComponent, // Componente que se muestra en la ruta 'participar/:codigoRespuesta'
  },
/*
  { path: 'participar/:codigoRespuesta', // Ruta para participar y responder la encuesta
    component: ResponderEncuestaComponent, // Componente que se muestra en la ruta 'participar/:codigoRespuesta'
  },
*/
  { path: 'resultados/:codigoResultados', // Ruta para la visualización de los resultados de la encuesta
    component: VisualizarResultadosComponent, // Componente que se muestra en la ruta 'resultados/:codigoResultados'
  },
  {
    path: '**', // Ruta comodín (cualquier ruta no definida)
    redirectTo: '', // Redirige a la ruta raíz
  },
];