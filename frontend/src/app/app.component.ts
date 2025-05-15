import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

// Decorador que define los metadatos del componente principal de la aplicación
@Component({
  selector: 'app-root', // Selector utilizado en el HTML para este componente
  imports: [RouterOutlet, ConfirmDialogModule, ToastModule], // Módulos importados para el template
  templateUrl: './app.component.html', // Ruta del archivo de template HTML
  styleUrl: './app.component.css', // Ruta del archivo de estilos CSS
  providers: [ConfirmationService, MessageService], // Servicios disponibles para el componente y sus hijos
})
export class AppComponent {
  title = 'frontend'; // Título de la aplicación
}
