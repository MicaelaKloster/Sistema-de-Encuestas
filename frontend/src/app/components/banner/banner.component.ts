import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

/**
 * Componente Banner.
 * Muestra la pantalla de bienvenida o portada de la aplicación,
 * con botones de navegación principales.
 */
@Component({
  selector: 'app-banner',
  // Importa los módulos necesarios para los botones y la navegación por rutas
  imports: [ButtonModule, RouterModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  // Este componente no tiene lógica adicional, solo muestra la vista del banner.
}
