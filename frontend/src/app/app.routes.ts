import { Routes } from '@angular/router';
import { ComienzoComponent } from './components/comienzo/comienzo.component';
import { CreacionEncuestaComponent } from './components/creacion-encuesta/creacion-encuesta.component';
import { BannerComponent } from './components/banner/banner.component';
import { PresentacionEnlacesComponent } from './components/enlaces/presentacion-enlaces.component';
import { ResponderEncuestaComponent } from './components/respuestas/responder-encuesta.component';
import { VisualizarResultadosComponent } from './components/resultados/visualizar-resultados.component';

export const routes: Routes = [
  {
    path: '',
    component: BannerComponent,
  },
  {
    path: 'creacion',
    component: CreacionEncuestaComponent,
  },
  {
    path: 'presentacion-enlaces',
    component: PresentacionEnlacesComponent,
  },
  {
    path: 'responder/:id/:tokenParticipacion',
    component: ResponderEncuestaComponent,
  },
  {
    path: 'resultados/:codigoResultados',
    component: VisualizarResultadosComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
