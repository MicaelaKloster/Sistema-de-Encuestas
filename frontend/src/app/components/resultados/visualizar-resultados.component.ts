import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RespuestasService } from '../../services/respuestas.service';
import { TiposRespuestaEnum } from '../../enums/tipos-pregunta.enum';
import { EncuestasService } from '../../services/encuestas.service';

@Component({
  selector: 'app-visualizar-resultados',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  templateUrl: './visualizar-resultados.component.html',
  styleUrls: ['./visualizar-resultados.component.css'],
  providers: [MessageService]
})
export class VisualizarResultadosComponent implements OnInit {
  // Servicios inyectados
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private respuestasService = inject(RespuestasService);
  private messageService = inject(MessageService);
  private encuestasService = inject(EncuestasService);

  // Variables de estado
  resultados: any = null;
  codigoResultados = '';
  cargando = true;
  error = '';
  exportandoCSV = false;
  estadoEncuesta: boolean | null = null;
  idEncuesta: number | null = null;

  // Enum para usar en el template
  TiposRespuestaEnum = TiposRespuestaEnum;

  ngOnInit() {
    console.log('VisualizarResultadosComponent ngOnInit ejecutado');

    // Obtener el código de resultados de la URL
    this.codigoResultados = this.route.snapshot.paramMap.get('codigoResultados') || '';
    console.log('Código de resultados obtenido de la URL:', this.codigoResultados);

    if (this.codigoResultados) {
      console.log('Iniciando carga de resultados...');
      this.cargarResultados();
    } else {
      console.log('Código de resultados no válido');
      this.error = 'Código de resultados no válido';
      this.cargando = false;
    }
  }

  private cargarResultados() {
    this.cargando = true;
    this.error = '';

    this.respuestasService.obtenerResultadosEncuesta(this.codigoResultados)
      .subscribe({
        next: (response) => {
          console.log('Resultados cargados:', response);
          this.resultados = response.data;
          // Asigna el estado e id de la encuesta si existen en la respuesta
          this.estadoEncuesta = this.resultados?.habilitada ?? null;
          this.idEncuesta = this.resultados?.id ?? null;
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al cargar resultados:', error);
          this.error = 'Error al cargar los resultados. Verifique que el enlace sea válido.';
          this.cargando = false;
        }
      });
  }

  // Método para obtener el total de respuestas de una pregunta de opciones
  getTotalRespuestasOpcion(pregunta: any): number {
    if (!pregunta.opciones) return 0;
    return pregunta.opciones.reduce((total: number, opcion: any) => total + (opcion.cantidad_respuestas || 0), 0);
  }

  // Método para calcular el porcentaje de una opción
  getPorcentajeOpcion(opcion: any, totalRespuestas: number): number {
    if (totalRespuestas === 0) return 0;
    return Math.round((opcion.cantidad_respuestas / totalRespuestas) * 100);
  }

  // Método para generar datos del gráfico para preguntas de opciones
  getChartData(pregunta: any) {
    if (!pregunta.opciones || pregunta.opciones.length === 0) return null;

    const labels = pregunta.opciones.map((opcion: any) => opcion.texto);
    const data = pregunta.opciones.map((opcion: any) => opcion.cantidad_respuestas || 0);

    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            '#667eea',
            '#764ba2',
            '#f093fb',
            '#f5576c',
            '#4facfe',
            '#00f2fe',
            '#43e97b',
            '#38f9d7'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }
      ]
    };
  }

  // Opciones del gráfico
  getChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        }
      }
    };
  }

  // Método para exportar resultados a CSV
  exportarCSV() {
    if (!this.resultados || !this.resultados.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No hay datos para exportar'
      });
      return;
    }

    this.exportandoCSV = true;

    this.respuestasService.exportarResultadosCSV(this.resultados.id, this.codigoResultados)
      .subscribe({
        next: (blob) => {
          // Crear un enlace temporal para descargar el archivo
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `resultados_encuesta_${this.resultados.id}.csv`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          this.messageService.add({
            severity: 'success',
            summary: 'Exportación exitosa',
            detail: 'Los resultados se han descargado correctamente'
          });

          this.exportandoCSV = false;
        },
        error: (error) => {
          console.error('Error al exportar CSV:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error al exportar',
            detail: 'No se pudo descargar el archivo CSV. Intenta nuevamente.'
          });
          this.exportandoCSV = false;
        }
      });
  }

  // Método para habilitar/deshabilitar una encuesta
  cambiarEstadoEncuesta() {
    if (this.idEncuesta == null || this.estadoEncuesta == null) return;
    this.encuestasService.actualizarEstadoEncuesta(this.idEncuesta, !this.estadoEncuesta)
      .subscribe({
        next: () => {
          this.estadoEncuesta = !this.estadoEncuesta;
          this.messageService.add({
            severity: 'success',
            summary: `Encuesta ${this.estadoEncuesta ? 'habilitada' : 'deshabilitada'}`
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'No se pudo cambiar el estado de la encuesta'
          });
        }
      });
  }
}