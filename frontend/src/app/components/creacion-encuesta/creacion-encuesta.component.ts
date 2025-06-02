import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SeccionComponent } from '../seccion/seccion.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { GestionPreguntaDialogComponent } from '../gestion-pregunta-dialog/gestion-pregunta-dialog.component';
import { PreguntaDTO } from '../../interfaces/pregunta.dto';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  tiposPreguntaPresentacion,
  TiposRespuestaEnum,
} from '../../enums/tipos-pregunta.enum';
import { TextoErrorComponent } from '../texto-error/texto-error.component';
import { EncuestasService } from '../../services/encuestas.service';
import { Router, RouterModule } from '@angular/router';
import { CreateEncuestaDTO } from '../../interfaces/create-encuesta.dto';

@Component({
  selector: 'app-creacion-encuesta',
  imports: [
    InputTextModule,
    FloatLabel,
    FormsModule,
    SeccionComponent,
    ButtonModule,
    DialogModule,
    GestionPreguntaDialogComponent,
    ReactiveFormsModule,
    TextoErrorComponent,
    RouterModule,
  ],
  templateUrl: './creacion-encuesta.component.html',
  styleUrl: './creacion-encuesta.component.css',
})
export class CreacionEncuestaComponent {
  // Formulario reactivo principal para la creación de la encuesta
  form: FormGroup;

  // Servicios y utilidades inyectados
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);
  private confirmationService: ConfirmationService =
    inject(ConfirmationService);
  private encuestasService: EncuestasService = inject(EncuestasService);

  // Controla la visibilidad del diálogo para agregar/editar preguntas
  dialogGestionPreguntaVisible = signal<boolean>(false);

  // Almacena la pregunta seleccionada para edición (si corresponde)
  preguntaSeleccionada = signal<PreguntaDTO | null>(null);

  // Controla el estado de carga del botón finalizar
  creandoEncuesta = signal<boolean>(false);

  // Controla si estamos en modo edición y qué pregunta se está editando
  modoEdicion = signal<boolean>(false);
  indicePreguntaEditando = signal<number>(-1);

  // Controla la visibilidad del diálogo de selección de preguntas para editar
  dialogSeleccionPreguntaVisible = signal<boolean>(false);

  constructor() {
    // Inicializa el formulario con controles y validadores
    this.form = new FormGroup({
      nombre: new FormControl<string>('', Validators.required), // Nombre de la encuesta
      preguntas: new FormArray<FormControl<PreguntaDTO>>(
        [],
        [Validators.required, Validators.minLength(1)], // Al menos una pregunta requerida
      ),
    });
  }

  // Getter para el FormArray de preguntas
  get preguntas(): FormArray<FormControl<PreguntaDTO>> {
    return this.form.get('preguntas') as FormArray<FormControl<PreguntaDTO>>;
  }

  // Getter para el control del nombre de la encuesta
  get nombre(): FormControl<string> {
    return this.form.get('nombre') as FormControl<string>;
  }

  // Abre el diálogo para agregar una nueva pregunta
  abrirDialog() {
    // Resetear modo edición
    this.modoEdicion.set(false);
    this.indicePreguntaEditando.set(-1);
    this.preguntaSeleccionada.set(null);

    this.dialogGestionPreguntaVisible.set(true);
  }

  // Abre el diálogo para editar preguntas existentes
  abrirDialogEditar() {
    if (this.preguntas.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No hay preguntas',
        detail: 'Primero agrega una pregunta para poder editarla',
        life: 4000,
      });
      return;
    }

    // Abrir diálogo de selección de preguntas
    this.dialogSeleccionPreguntaVisible.set(true);
  }

  // Edita una pregunta específica por índice
  editarPregunta(index: number) {
    const pregunta = this.preguntas.at(index)?.value;
    if (!pregunta) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo encontrar la pregunta a editar',
        life: 4000,
      });
      return;
    }

    // Cerrar diálogo de selección
    this.dialogSeleccionPreguntaVisible.set(false);

    // Configurar modo edición
    this.modoEdicion.set(true);
    this.indicePreguntaEditando.set(index);
    this.preguntaSeleccionada.set(pregunta);

    // Abrir el diálogo de edición
    this.dialogGestionPreguntaVisible.set(true);

    this.messageService.add({
      severity: 'info',
      summary: 'Modo edición',
      detail: `Editando: "${pregunta.texto}"`,
      life: 3000,
    });
  }

  // Cierra el diálogo de selección de preguntas
  cerrarDialogSeleccion() {
    this.dialogSeleccionPreguntaVisible.set(false);
  }

  // Agrega una nueva pregunta al FormArray de preguntas o actualiza una existente
  agregarPregunta(pregunta: PreguntaDTO) {
    if (this.modoEdicion() && this.indicePreguntaEditando() >= 0) {
      // Modo edición: actualizar pregunta existente
      const index = this.indicePreguntaEditando();
      this.preguntas.at(index)?.setValue(pregunta);

      // Resetear modo edición
      this.modoEdicion.set(false);
      this.indicePreguntaEditando.set(-1);
      this.preguntaSeleccionada.set(null);

      // Mostrar mensaje de confirmación
      this.messageService.add({
        severity: 'success',
        summary: 'Pregunta actualizada',
        detail: `Se actualizó la pregunta: "${pregunta.texto}"`,
        life: 3000,
      });
    } else {
      // Modo agregar: nueva pregunta
      this.preguntas.push(
        new FormControl<PreguntaDTO>(pregunta) as FormControl<PreguntaDTO>,
      );

      // Mostrar mensaje de confirmación
      this.messageService.add({
        severity: 'success',
        summary: 'Pregunta agregada',
        detail: `Se agregó la pregunta: "${pregunta.texto}"`,
        life: 3000,
      });
    }
  }

  // Elimina una pregunta del FormArray por índice
  eliminarPregunta(index: number) {
    const preguntaEliminada = this.preguntas.at(index)?.value;
    this.preguntas.removeAt(index);

    // Mostrar mensaje de confirmación
    this.messageService.add({
      severity: 'info',
      summary: 'Pregunta eliminada',
      detail: preguntaEliminada
        ? `Se eliminó la pregunta: "${preguntaEliminada.texto}"`
        : 'Pregunta eliminada correctamente',
      life: 3000,
    });
  }

  // Devuelve la presentación textual del tipo de pregunta
  getTipoPreguntaPresentacion(tipo: TiposRespuestaEnum): string {
    return tiposPreguntaPresentacion.find(
      (tipoPresentacion) => tipoPresentacion.tipo === tipo,
    )!?.presentacion;
  }

  // Muestra un cuadro de confirmación antes de crear la encuesta
  confirmarCrearEncuesta() {
    // Validar formulario antes de mostrar confirmación
    if (!this.form.valid) {
      this.mostrarErroresValidacion();
      return;
    }

    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas crear esta encuesta?',
      header: 'Confirmar Creación',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-question-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Crear Encuesta',
        severity: 'success',
      },
      accept: () => {
        this.crearEncuesta();
      },
    });
  }

  // Muestra errores específicos de validación
  private mostrarErroresValidacion() {
    this.form.markAllAsTouched();

    const errores: string[] = [];

    // Validar nombre de encuesta
    if (this.nombre.invalid) {
      if (this.nombre.errors?.['required']) {
        errores.push('El nombre de la encuesta es obligatorio');
      }
    }

    // Validar preguntas
    if (this.preguntas.invalid) {
      if (this.preguntas.errors?.['required'] || this.preguntas.length === 0) {
        errores.push('Debe agregar al menos una pregunta');
      }
    }

    // Mostrar errores específicos
    if (errores.length > 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos requeridos',

        detail:
          errores.join('. ') +
          '. Complete todos los campos antes de continuar.',
        life: 4000,
        sticky: false,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de validación',

        detail:
          'Por favor, revisa los campos del formulario. Si el problema persiste, usa el botón "Probar Conectividad" para verificar la conexión con el servidor.',
        life: 4000,
      });
    }
  }

  // Muestra un cuadro de confirmación antes de eliminar una pregunta
  confirmarEliminarPregunta(index: number) {
    const pregunta = this.preguntas.at(index)?.value;
    const nombrePregunta = pregunta?.texto || 'esta pregunta';

    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar "${nombrePregunta}"?`,
      header: 'Confirmar Eliminación',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Eliminar',
        severity: 'danger',
      },
      accept: () => {
        this.eliminarPregunta(index);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Operación cancelada',
          detail: 'La pregunta no fue eliminada',
          life: 2000,
        });
      },
    });
  }

  // Envía la encuesta al backend para su creación
  crearEncuesta() {
    // Validación adicional antes de enviar
    console.log('🔍 Iniciando creación de encuesta...');
    console.log('📋 Estado del formulario:', {
      valid: this.form.valid,
      value: this.form.value,
      errors: this.form.errors,
    });

    // Verificar que el formulario sea válido
    if (!this.form.valid) {
      console.error('❌ Formulario inválido:', this.form.errors);
      this.mostrarErroresValidacion();
      return;
    }

    // Activar estado de carga
    this.creandoEncuesta.set(true);

    // Mostrar mensaje de carga
    this.messageService.add({
      severity: 'info',
      summary: 'Creando encuesta...',
      detail: 'Por favor espera mientras procesamos tu encuesta',

      life: 4000,
    });

    // Obtiene los datos del formulario

    const formData = this.form.value;

    // Crear el objeto de encuesta con los campos requeridos por el backend
    const encuesta: CreateEncuestaDTO = {
      ...this.form.value,
      enlaceCorto: '',
      codigoQR: '',
      nombre: formData.nombre,
      preguntas: formData.preguntas || [],
    };

    // Si el backend requiere estos campos, los agregamos como strings vacíos
    // El backend debería generar los valores reales
    if (encuesta.enlaceCorto === undefined) {
      encuesta.enlaceCorto = '';
    }
    if (encuesta.codigoQR === undefined) {
      encuesta.codigoQR = '';
    }

    console.log('📝 Datos de la encuesta antes de procesar:', encuesta);

    // Validar que tenemos datos básicos
    if (
      !encuesta.nombre ||
      !encuesta.preguntas ||
      encuesta.preguntas.length === 0
    ) {
      console.error('❌ Datos de encuesta incompletos:', {
        nombre: encuesta.nombre,
        preguntasLength: encuesta.preguntas?.length || 0,
      });

      this.messageService.add({
        severity: 'error',
        summary: 'Datos incompletos',
        detail: 'Faltan datos requeridos para crear la encuesta',
        life: 5000,
      });
      return;
    }

    // Asigna el número de orden a cada pregunta y opción antes de enviar
    for (let i = 0; i < encuesta.preguntas.length; i++) {
      const pregunta = encuesta.preguntas[i];
      pregunta.numero = i + 1;

      if (pregunta.opciones) {
        for (let j = 0; j < pregunta.opciones.length; j++) {
          pregunta.opciones[j].numero = j + 1;
        }
      }
    }

    console.log('✅ Datos de la encuesta procesados:', encuesta);

    // Llama al servicio para crear la encuesta y maneja la respuesta
    this.encuestasService.crearEncuesta(encuesta).subscribe({
      next: (res) => {
        console.log('✅ Encuesta creada exitosamente:', res);

        // Cerrar el diálogo de confirmación inmediatamente
        this.confirmationService.close();

        // Limpiar todos los toasts anteriores (incluyendo el de "Creando encuesta...")
        this.messageService.clear();

        // Mensaje de éxito detallado
        this.messageService.add({
          severity: 'success',
          summary: '¡Encuesta creada exitosamente!',
          detail: `La encuesta "${encuesta.nombre}" se ha creado correctamente con ${encuesta.preguntas.length} pregunta${encuesta.preguntas.length > 1 ? 's' : ''}`,
          life: 4000,
        });

        // Pequeño delay para que el usuario vea el mensaje antes de redirigir
        setTimeout(() => {
          // Redirige a la pantalla de presentación de enlaces con los códigos generados
          this.router.navigateByUrl(
            '/presentacion-enlaces?id-encuesta=' +
              res.id +
              '&codigo-respuesta=' +
              res.codigoRespuesta +
              '&codigo-resultados=' +
              res.codigoResultados,
          );
        }, 1500);
      },
      error: (err) => {
        console.error('❌ Error al crear encuesta:', err);
        console.error('📊 Detalles del error:', {
          status: err.status,
          statusText: err.statusText,
          message: err.message,
          error: err.error,
          url: err.url,
        });

        // Cerrar el diálogo de confirmación en caso de error
        this.confirmationService.close();

        // Mensaje de error detallado
        let errorDetail =
          'Verifica tu conexión a internet e intenta nuevamente';
        let errorSummary = 'Error al crear la encuesta';

        if (err.status === 400) {
          errorDetail = 'Los datos de la encuesta no son válidos';
          if (err.error && err.error.message) {
            errorDetail += `: ${err.error.message}`;
          }
        } else if (err.status === 500) {
          errorDetail = 'Error interno del servidor. Intenta más tarde';
        } else if (err.status === 0) {
          errorDetail =
            'No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose';
          errorSummary = 'Sin conexión al servidor';
        } else if (err.status === 404) {
          errorDetail =
            'El endpoint de creación de encuestas no fue encontrado';
          errorSummary = 'Servicio no encontrado';
        }

        this.messageService.add({
          severity: 'error',
          summary: errorSummary,
          detail: errorDetail,
          life: 8000,
          sticky: true,
        });
      },
    });
  }
}
