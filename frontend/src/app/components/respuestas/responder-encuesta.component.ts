import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { RespuestasService } from '../../services/respuestas.service';
import {
  Encuesta,
  Pregunta,
  RespuestaUsuario,
  OpcionRespuesta,
  EncuestaResponse,
  RespuestaPreguntaDto,
  RegistrarRespuestasDto,
} from '../../interfaces/respuesta.dto';;

@Component({
  selector: 'app-responder-encuesta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,

    RadioButtonModule,
    ToastModule,
    CardModule,
    ProgressSpinnerModule,
    DialogModule,
    DividerModule,
    MessageModule
  ],
  templateUrl: './responder-encuesta.component.html',
  styleUrls: ['./responder-encuesta.component.css'],
  providers: [MessageService]
})
export class ResponderEncuestaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private messageService = inject(MessageService);
  private respuestasService = inject(RespuestasService);

  encuesta: Encuesta | null = null;
  respuestas: RespuestaUsuario[] = [];

  id!: number;
  tokenParticipacion!: string;
  cargando = true;
  enviando = false;

  mostrarDialogConfirmacion = false;
  mostrarDialogVistaPrevia = false;
  mostrarDialogError = false;
  errorDetallado = '';

  // Nueva variable para manejar encuestas deshabilitadas
  encuestaDeshabilitada = false;
  mensajeEncuestaDeshabilitada = '';

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.tokenParticipacion = this.route.snapshot.paramMap.get('tokenParticipacion')!;

    if (!this.id || !this.tokenParticipacion) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Parámetros de encuesta inválidos'
      });
      return;
    }

    this.cargarEncuesta();
  }

  cargarEncuesta() {
    console.log('=== INICIANDO cargarEncuesta() ===');
    console.log('Estado inicial - mostrarDialogError:', this.mostrarDialogError);
    console.log('Estado inicial - encuestaDeshabilitada:', this.encuestaDeshabilitada);

    this.cargando = true;
    this.mostrarDialogError = false; // Asegurar que esté en false al inicio
    this.encuestaDeshabilitada = false; // Reset del estado

    this.respuestasService.obtenerEncuestaParaParticipacion(this.id, this.tokenParticipacion)
      .subscribe({
        next: (response) => {
          this.encuesta = response.data;
          this.inicializarRespuestas();
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al cargar encuesta:', error);
          console.log('Error status:', error.status);
          console.log('Error completo:', JSON.stringify(error, null, 2));
          this.cargando = false;

          // Para errores 400 y 404, siempre tratarlos como encuesta deshabilitada
          if (error.status === 400 || error.status === 404) {
            console.log('Detectando encuesta deshabilitada...');
            this.encuestaDeshabilitada = true;
            this.mostrarDialogError = false;

            // Obtener el mensaje de error del backend
            const errorMessage = error.error?.message || error.message || '';
            console.log('Mensaje de error del backend:', errorMessage);

            // Determinar el mensaje según el error
            if (errorMessage.includes('vencido') || errorMessage.includes('vencida') || errorMessage.includes('vencimiento')) {
              this.mensajeEncuestaDeshabilitada = 'Encuesta no disponible o ya no se aceptan más respuestas';

              // Mostrar toast rojo solo para encuestas vencidas
              this.messageService.add({
                severity: 'error',
                summary: 'Encuesta vencida',
                detail: 'Esta encuesta ya no está disponible. La fecha límite ha expirado',
                life: 5000
              });
            } else {
              // Para cualquier error 400/404, mostrar mensaje simple
              this.mensajeEncuestaDeshabilitada = 'Encuesta deshabilitada';
            }

            console.log('Mensaje establecido:', this.mensajeEncuestaDeshabilitada);

            // Redirigir al inicio después de 5 segundos
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 5000);
          } else {
            // Error genérico para otros códigos de estado
            console.log('Error genérico, mostrando diálogo...');
            this.errorDetallado = `Error al cargar la encuesta: ${error.message || 'Error desconocido'}`;
            this.mostrarDialogError = true;
          }
        },
      });
  }

  private inicializarRespuestas() {
    if (!this.encuesta) return;

    this.respuestas = this.encuesta.preguntas.map((pregunta) => ({
      numeroPregunta: pregunta.numero,
      opciones: [],
      texto: '',
    }));
  }

  getRespuestaPorPregunta(numeroPregunta: number): RespuestaUsuario {
    let respuesta = this.respuestas.find(r => r.numeroPregunta === numeroPregunta);
    if (!respuesta) {
      respuesta = { numeroPregunta, opciones: [], texto: '' };
      this.respuestas.push(respuesta);
    }
    return respuesta;
  }

  onCheckboxChange(pregunta: Pregunta, idOpcion: number, checked: boolean) {
    const respuesta = this.getRespuestaPorPregunta(pregunta.numero);

    if (checked) {
      if (!respuesta.opciones.includes(idOpcion)) {
        respuesta.opciones.push(idOpcion);
      }
    } else {
      respuesta.opciones = respuesta.opciones.filter(n => n !== idOpcion);
    }
  }

  onRadioChange(pregunta: Pregunta, idOpcion: number) {
    const respuesta = this.getRespuestaPorPregunta(pregunta.numero);
    respuesta.opciones = [idOpcion];
  }

  onTextoChange(pregunta: Pregunta, texto: string) {
    const respuesta = this.getRespuestaPorPregunta(pregunta.numero);
    respuesta.texto = texto;
  }

  isOpcionSeleccionada(numeroPregunta: number, idOpcion: number): boolean {
    const respuesta = this.getRespuestaPorPregunta(numeroPregunta);
    return respuesta.opciones.includes(idOpcion);
  }

  getOpcionSeleccionada(numeroPregunta: number): number | null {
    const respuesta = this.getRespuestaPorPregunta(numeroPregunta);
    return respuesta.opciones.length > 0 ? respuesta.opciones[0] : null;
  }

  getTextoOpcion(pregunta: Pregunta, idOpcion: number): string {
    const opcion = pregunta.opciones?.find(op => op.id === idOpcion);
    return opcion ? opcion.texto : `Opción ${idOpcion}`;
  }

  esPreguntaAbierta(pregunta: Pregunta): boolean {
    return pregunta.tipo === 'ABIERTA';
  }

  esPreguntaSeleccionSimple(pregunta: Pregunta): boolean {
    return pregunta.tipo === 'OPCION_MULTIPLE_SELECCION_SIMPLE';
  }

  esPreguntaSeleccionMultiple(pregunta: Pregunta): boolean {
    return pregunta.tipo === 'OPCION_MULTIPLE_SELECCION_MULTIPLE';
  }

  esPreguntaVerdaderoFalso(pregunta: Pregunta): boolean {
    return pregunta.tipo === 'VERDADERO_FALSO';
  }

  abrirVistaPrevia() {
    this.mostrarDialogVistaPrevia = true;
  }

  confirmarEnvio() {
    if (!this.validarRespuestas()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validación',
        detail: 'Todas las preguntas de carácter obligatorio deben ser respondidas antes de finalizar la encuesta',
      });
      return;
    }
    this.mostrarDialogConfirmacion = true;
  }

  enviarRespuestasFinal() {
    this.mostrarDialogConfirmacion = false;
    this.enviando = true;

    const respuestasParaBackend = this.respuestas
    .map(respuesta => {
      const pregunta = this.encuesta?.preguntas.find(p => p.numero === respuesta.numeroPregunta);
      if (!pregunta) return null;

      if (this.esPreguntaAbierta(pregunta) && !respuesta.texto.trim()) return null;
      if (!this.esPreguntaAbierta(pregunta) && respuesta.opciones.length === 0) return null;

      const respuestaDto: RespuestaPreguntaDto = {
        id_pregunta: pregunta.id,
        tipo: pregunta.tipo,
      };

      if (this.esPreguntaAbierta(pregunta)) {
        respuestaDto.texto = respuesta.texto.trim();
      } else {
        const opcionesIds = respuesta.opciones.map(numOpcion => {
          const opcion = pregunta.opciones?.find(o => o.numero === numOpcion);
          return opcion ? opcion.id : numOpcion;
        }).filter(id => id !== undefined) as number[];

        respuestaDto.opciones = opcionesIds;
      }

      return respuestaDto;
    })
    .filter(rta => rta !== null) as RespuestaPreguntaDto[];

    const payload: RegistrarRespuestasDto = {
      respuestas: respuestasParaBackend
    };

    this.respuestasService.registrarRespuestas(this.id, this.tokenParticipacion, payload)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: '¡Respuestas registradas con éxito!',
          });
          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 2000);
        },
        error: (error) => {
          console.error('Error al enviar respuestas:', error);
          this.enviando = false;

          // Verificar si es una encuesta deshabilitada o vencida
          if (error.status === 404 || error.status === 400) {
            this.encuestaDeshabilitada = true;

            // Determinar el mensaje según el error
            if (error.error?.message?.includes('vencido') || error.error?.message?.includes('vencida')) {
              this.mensajeEncuestaDeshabilitada = 'Encuesta no disponible o ya no se aceptan más respuestas';

              // Mostrar toast rojo solo para encuestas vencidas
              this.messageService.add({
                severity: 'error',
                summary: 'Encuesta vencida',
                detail: 'Encuesta no disponible o ya no se aceptan más respuestas',
                life: 5000
              });
            } else {
              this.mensajeEncuestaDeshabilitada = 'Encuesta deshabilitada';
            }

            // Redirigir al inicio después de 5 segundos
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 5000);
          } else {
            // Error genérico
            this.errorDetallado = `Error al enviar respuestas: ${error.message || 'Error desconocido'}`;
            this.mostrarDialogError = true;
          }
        },
      });
  }

  reintentarEnvio() {
    this.mostrarDialogError = false;
    this.cargarEncuesta(); // Volver a cargar la encuesta en lugar de confirmar envío
  }

  enviarRespuestas() {
    this.confirmarEnvio();
  }

  validarRespuestas(): boolean {
    if (!this.encuesta) return false;

    for (const pregunta of this.encuesta.preguntas) {
      if (!pregunta.obligatoria) continue;

      const respuesta = this.getRespuestaPorPregunta(pregunta.numero);

      if (this.esPreguntaAbierta(pregunta)) {
        if (!respuesta.texto.trim()) {
          return false;
        }
      } else {
        if (respuesta.opciones.length === 0) {
          return false;
        }
      }
    }
    return true;
  }

  obtenerTextoRespuesta(pregunta: Pregunta): string {
    const respuesta = this.getRespuestaPorPregunta(pregunta.numero);

    if (this.esPreguntaAbierta(pregunta)) {
      return respuesta.texto.trim() || 'Sin respuesta';
    }

    if (respuesta.opciones.length === 0) {
      return 'Sin respuesta';
    }

    const opcionesTexto = respuesta.opciones.map(numeroOpcion => {
      const opcion = pregunta.opciones?.find(o => o.id === numeroOpcion);
      return opcion?.texto || `Opción ${numeroOpcion}`;
    });

    return opcionesTexto.join(', ');
  }

  contarRespuestasCompletadas(): number {
    return this.respuestas.filter(respuesta => {
      const pregunta = this.encuesta?.preguntas.find(p => p.numero === respuesta.numeroPregunta);
      if (!pregunta) return false;

      if (this.esPreguntaAbierta(pregunta)) {
        return respuesta.texto.trim() !== '';
      } else {
        return respuesta.opciones.length > 0;
      }
    }).length;
  }
}
