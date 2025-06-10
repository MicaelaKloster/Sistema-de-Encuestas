import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

/**
 * Componente Navbar.
 * Muestra la barra de navegación principal de la aplicación,
 * permitiendo la navegación entre las diferentes secciones.
 */
@Component({
  selector: 'app-navbar',
  // Importa los módulos necesarios para los botones y la navegación por rutas
  imports: [ButtonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // Este componente no tiene lógica adicional, solo muestra la barra de navegación.
}
