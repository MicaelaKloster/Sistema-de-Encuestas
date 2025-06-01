// responder-encuesta.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG imports
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextarea, Textarea } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
// ✅ NUEVOS IMPORTS PARA DIALOGS
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

// Importamos el servicio y sus interfaces
import {
  RespuestaService,
  Encuesta,
  Pregunta,
  RespuestaUsuario,
  RespuestaPreguntaDto,
  RegistrarRespuestasDto,
} from '../../services/respuestas.service';

@Component({
  selector: 'app-responder-encuesta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    InputTextarea,
    RadioButtonModule,
    ToastModule,
    CardModule,
    ProgressSpinnerModule,
    // ✅ NUEVOS MÓDULOS PARA DIALOGS
    DialogModule,
    DividerModule,
  ],
  providers: [MessageService],
  templateUrl: './responder-encuesta.component.html',
  styleUrls: ['./responder-encuesta.component.css'],
})
export class ResponderEncuestaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private respuestaService = inject(RespuestaService);

  encuesta: Encuesta | null = null;
  respuestas: RespuestaUsuario[] = [];

  id!: number;
  tokenParticipacion!: string;
  cargando = true;
  enviando = false;

  // ✅ NUEVAS PROPIEDADES PARA DIALOGS
  mostrarDialogConfirmacion = false;
  mostrarDialogVistaPrevia = false;
  mostrarDialogError = false;
  errorDetallado = '';

  ngOnInit() {
    // Obtener parámetros de la ruta
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.tokenParticipacion =
      this.route.snapshot.paramMap.get('tokenParticipacion')!;

    if (!this.id || !this.tokenParticipacion) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Parámetros de encuesta inválidos',
      });
      return;
    }
    console.log('ID recibido:', this.id);
    console.log('Token recibido:', this.tokenParticipacion);
    console.log(
      `Llamando a: /encuestas/participar/${this.id}/${this.tokenParticipacion}`,
    );

    this.cargarEncuesta();
  }

  cargarEncuesta() {
    this.cargando = true;

    this.respuestaService
      .obtenerEncuestaParaParticipacion(this.id, this.tokenParticipacion)
      .subscribe({
        next: (response: { data: any }) => {
          this.encuesta = response.data;
          this.inicializarRespuestas();
          this.cargando = false;
        },
        error: (error: any) => {
          console.error('Error al cargar encuesta:', error);
          this.errorDetallado = `Error al cargar la encuesta: ${error.message || 'Error desconocido'}`;
          this.mostrarDialogError = true;
          this.cargando = false;
        },
      });
  }

  private inicializarRespuestas() {
    if (!this.encuesta) return;

    this.respuestas = this.encuesta.preguntas.map(
      (pregunta: { numero: any }) => ({
        numeroPregunta: pregunta.numero,
        opciones: [],
        texto: '',
      }),
    );
  }

  getRespuestaPorPregunta(numeroPregunta: number): RespuestaUsuario {
    let respuesta = this.respuestas.find(
      (r) => r.numeroPregunta === numeroPregunta,
    );
    if (!respuesta) {
      respuesta = { numeroPregunta, opciones: [], texto: '' };
      this.respuestas.push(respuesta);
    }
    return respuesta;
  }

  // Maneja selección para preguntas de opción múltiple (múltiple selección)
  onCheckboxChange(pregunta: Pregunta, idOpcion: number, checked: boolean) {
    const respuesta = this.getRespuestaPorPregunta(pregunta.numero);

    if (checked) {
      if (!respuesta.opciones.includes(idOpcion)) {
        respuesta.opciones.push(idOpcion);
      }
    } else {
      respuesta.opciones = respuesta.opciones.filter((n) => n !== idOpcion);
    }
  }

  // Maneja selección para preguntas de opción simple (radio button)
  onRadioChange(pregunta: Pregunta, idOpcion: number) {
    const respuesta = this.getRespuestaPorPregunta(pregunta.numero);
    respuesta.opciones = [idOpcion];
  }

  // Maneja cambios en campos de texto
  onTextoChange(pregunta: Pregunta, texto: string) {
    const respuesta = this.getRespuestaPorPregunta(pregunta.numero);
    respuesta.texto = texto;
  }

  // Verifica si una opción está seleccionada (para checkboxes)
  isOpcionSeleccionada(numeroPregunta: number, numeroOpcion: number): boolean {
    const respuesta = this.getRespuestaPorPregunta(numeroPregunta);
    return respuesta.opciones.includes(numeroOpcion);
  }

  // Obtiene la opción seleccionada para radio buttons
  getOpcionSeleccionada(numeroPregunta: number): number | null {
    const respuesta = this.getRespuestaPorPregunta(numeroPregunta);
    return respuesta.opciones.length > 0 ? respuesta.opciones[0] : null;
  }

  // Determina el tipo de pregunta para el template
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

  // ✅ NUEVOS MÉTODOS PARA DIALOGS

  // Abre el dialog de vista previa
  abrirVistaPrevia() {
    this.mostrarDialogVistaPrevia = true;
  }

  // Abre el dialog de confirmación
  confirmarEnvio() {
    if (!this.validarRespuestas()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validación',
        detail:
          'Por favor, responde todas las preguntas obligatorias antes de enviar',
      });
      return;
    }
    this.mostrarDialogConfirmacion = true;
  }

  // Envío definitivo después de confirmar
  enviarRespuestasFinal() {
    this.mostrarDialogConfirmacion = false;
    this.enviando = true;

    const respuestasParaBackend = this.respuestas
      .map((respuesta) => {
        const pregunta = this.encuesta?.preguntas.find(
          (p) => p.numero === respuesta.numeroPregunta,
        );
        if (!pregunta) return null; // No enviar respuestas sin pregunta válida

        // Solo enviar si respuesta está llena
        if (this.esPreguntaAbierta(pregunta) && !respuesta.texto.trim())
          return null;
        if (
          !this.esPreguntaAbierta(pregunta) &&
          respuesta.opciones.length === 0
        )
          return null;

        const respuestaDto: RespuestaPreguntaDto = {
          id_pregunta: pregunta.id, // enviar el id real, no el número
          tipo: pregunta.tipo,
        };

        if (this.esPreguntaAbierta(pregunta)) {
          respuestaDto.texto = respuesta.texto.trim();
        } else {
          // Opciones que deben enviarse son ids, no números
          // Convertir los números locales a ids reales
          const opcionesIds = respuesta.opciones
            .map((numOpcion) => {
              const opcion = pregunta.opciones?.find(
                (o) => o.numero === numOpcion,
              );
              return opcion ? opcion.id : numOpcion;
            })
            .filter((id) => id !== undefined) as number[];

          respuestaDto.opciones = opcionesIds;
        }

        return respuestaDto;
      })
      .filter((rta) => rta !== null) as RespuestaPreguntaDto[];

    const payload: RegistrarRespuestasDto = {
      respuestas: respuestasParaBackend,
    };

    this.respuestaService
      .registrarRespuestas(this.id, this.tokenParticipacion, payload)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: '¡Respuestas registradas con éxito!',
          });
          setTimeout(() => {
            this.router.navigateByUrl('/gracias');
          }, 2000);
        },
        error: (error: any) => {
          console.error('Error al enviar respuestas:', error);
          this.errorDetallado = `Error al enviar respuestas: ${error.message || 'Error desconocido'}`;
          this.mostrarDialogError = true;
          this.enviando = false;
        },
      });
  }

  // Reintenta el envío desde el dialog de error
  reintentarEnvio() {
    this.mostrarDialogError = false;
    this.confirmarEnvio();
  }

  // Método original para mantener compatibilidad con el form submit
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

  // ✅ MÉTODOS HELPER PARA LOS DIALOGS

  // Obtiene el texto de la respuesta para mostrar en la vista previa
  obtenerTextoRespuesta(pregunta: Pregunta): string {
    const respuesta = this.getRespuestaPorPregunta(pregunta.numero);

    if (this.esPreguntaAbierta(pregunta)) {
      return respuesta.texto.trim() || 'Sin respuesta';
    }

    if (respuesta.opciones.length === 0) {
      return 'Sin respuesta';
    }

    const opcionesTexto = respuesta.opciones.map((numeroOpcion) => {
      const opcion = pregunta.opciones?.find((o) => o.numero === numeroOpcion);
      return opcion?.texto || `Opción ${numeroOpcion}`;
    });

    return opcionesTexto.join(', ');
  }

  // Cuenta respuestas completadas para mostrar en confirmación
  contarRespuestasCompletadas(): number {
    return this.respuestas.filter((respuesta) => {
      const pregunta = this.encuesta?.preguntas.find(
        (p) => p.numero === respuesta.numeroPregunta,
      );
      if (!pregunta) return false;

      if (this.esPreguntaAbierta(pregunta)) {
        return respuesta.texto.trim() !== '';
      } else {
        return respuesta.opciones.length > 0;
      }
    }).length;
  }
}
