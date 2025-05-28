import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Clipboard } from '@angular/cdk/clipboard';
import { QRCodeComponent } from 'angularx-qrcode';
import { Router } from '@angular/router';


@Component({
  selector: 'app-presentacion-enlaces',
  imports: [
    CommonModule, 
    QRCodeComponent, 
    RouterModule, 
    ButtonModule],
  templateUrl: './presentacion-enlaces.component.html',
  styleUrl: './presentacion-enlaces.component.css',
})
export class PresentacionEnlacesComponent {

  // Servicios y utilidades inyectados
  private route = inject(ActivatedRoute); // Obtener parámetros de la URL
  private router = inject(Router); // Redireccionar
  private clipboard = inject(Clipboard); // Copiar enlaces

  // Variables para almacenar los códigos recibidos por la URL
  codigoRespuesta = '';
  codigoResultados = '';
  idEncuesta = '';

  // Variables para almacenar los enlaces generados
  enlaceParticipacion = '';
  enlaceResultados = '';

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      // Obtiene los valores de los parámetros o string vacío si no están
      this.codigoRespuesta = params.get('codigo-respuesta') ?? '';
      this.codigoResultados = params.get('codigo-resultados') ?? '';
      this.idEncuesta = params.get('id-encuesta') ?? '';

      // Genera los enlaces completos usando la URL base (location.origin)
      this.enlaceParticipacion = `${location.origin}/participar/${this.codigoRespuesta}`;
      this.enlaceResultados = `${location.origin}/resultados/${this.codigoResultados}`;
    });
  }

  // Método para copiar el texto(enlace) al portapapeles
  copiar(texto: string) {
    this.clipboard.copy(texto);
    alert('Enlace copiado al portapapeles');
  }

  // Método para volver a la página de inicio
  volverInicio() {
    this.router.navigateByUrl('');  
  }
}