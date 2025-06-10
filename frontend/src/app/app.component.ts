import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

// Decorador que define los metadatos del componente principal de la aplicación
@Component({
  selector: 'app-root', // Selector utilizado en el HTML para este componente
  imports: [RouterOutlet, ConfirmDialogModule, ToastModule, CommonModule], // Módulos importados para el template
  templateUrl: './app.component.html', // Ruta del archivo de template HTML
  styleUrl: './app.component.css', // Ruta del archivo de estilos CSS
  providers: [ConfirmationService, MessageService], // Servicios disponibles para el componente y sus hijos
})
export class AppComponent {
  title = 'Sistema de Encuestas'; // Título de la aplicación
  currentRoute = ''; // Ruta actual para navegación dinámica

  private router = inject(Router);

  constructor() {
    // Suscribirse a los cambios de ruta para actualizar la navegación
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  // Método para verificar si estamos en la página de inicio
  isHomePage(): boolean {
    return this.currentRoute === '/' || this.currentRoute === '';
  }

  // Método para verificar si estamos en la página de creación
  isCreationPage(): boolean {
    return this.currentRoute === '/creacion';
  }

  // Método para verificar si estamos en la página de presentación de enlaces
  isPresentacionEnlacesPage(): boolean {
    return this.currentRoute.includes('/presentacion-enlaces');
  }

  // Método para verificar si estamos en la página de responder encuesta
  isResponderEncuestaPage(): boolean {
    return this.currentRoute.includes('/responder/');
  }

  // Método para verificar si estamos en la página de resultados
  isResultadosPage(): boolean {
    return this.currentRoute.includes('/resultados/');
  }

  // Método para verificar si debemos mostrar header y footer
  shouldShowHeaderFooter(): boolean {
    return !this.isPresentacionEnlacesPage() &&
           !this.isResponderEncuestaPage() &&
           !this.isResultadosPage() &&
           !this.isCreationPage();
  }

  // Método para navegar a una ruta específica
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
