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
import { MessageModule } from 'primeng/message';

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
    MessageModule,
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
  private confirmationService: ConfirmationService = inject(ConfirmationService);
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
      fechaVencimiento: new FormControl<Date | null>(null), // Fecha de vencimiento incorporada
      preguntas: new FormArray<FormControl<PreguntaDTO>>(
        [],
        [Validators.required, Validators.minLength(1)] // Al menos una pregunta requerida
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

    // Getter para fecha de vecimiento
  get fechaVencimiento(): FormControl<Date | null> {
    return this.form.get('fechaVencimiento') as FormControl<Date | null>;
  }
  
  // Método para obtener la fecha mínima permitida (fecha actual)
  getFechaMinima(): string {
    const now = new Date();
    // Formatear la fecha para el input datetime-local (YYYY-MM-DDTHH:MM)
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
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
        summary: 'No se formularon preguntas',
        detail: 'Primero agrega una pregunta para poder editarla',
        life: 4000
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
        life: 4000
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
      life: 3000
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
        life: 3000
      });
    } else {
      // Modo agregar: nueva pregunta
      this.preguntas.push(
        new FormControl<PreguntaDTO>(pregunta) as FormControl<PreguntaDTO>
      );

      // Mostrar mensaje de confirmación
      this.messageService.add({
        severity: 'success',
        summary: 'Pregunta agregada',
        detail: `Se agregó la siguiente pregunta: "${pregunta.texto}"`,
        life: 3000
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
      detail: preguntaEliminada ? `Se eliminó la siguiente pregunta: "${preguntaEliminada.texto}"` : 'Pregunta eliminada correctamente',
      life: 3000
    });
  }

  // Devuelve la presentación textual del tipo de pregunta
  getTipoPreguntaPresentacion(tipo: TiposRespuestaEnum): string {
    return tiposPreguntaPresentacion.find(
      (tipoPresentacion) => tipoPresentacion.tipo === tipo
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
      message: '¿Está seguro de que desea crear esta encuesta?',
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
        errores.push('El campo -Nombre de la encuesta- no puede estar vacío');
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
        detail: errores.join('. ') + '. Complete todos los campos antes de continuar.',
        life: 4000,
        sticky: false
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de validación',
        detail: 'Por favor, revisa los campos del formulario. Si el problema persiste, usa el botón "Probar Conectividad" para verificar la conexión con el servidor.',
        life: 4000
      });
    }
  }

  // Muestra un cuadro de confirmación antes de eliminar una pregunta
  confirmarEliminarPregunta(index: number) {
    const pregunta = this.preguntas.at(index)?.value;
    const nombrePregunta = pregunta?.texto || 'esta pregunta';

    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar "${nombrePregunta}"?`,
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
          life: 2000
        });
      }
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
      fechaVencimiento: this.form.value.fechaVencimiento
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
      detail: 'Por favor espera mientras se completa el proceso de creación...',
      life: 4000
    });

    // Obtiene los datos del formulario

    const formData = this.form.value;

    // Crear el objeto de encuesta con los campos requeridos por el backend
    const encuesta: CreateEncuestaDTO = {
      ...this.form.value,
      enlaceCorto: '',
      codigoQR: '',
      nombre: formData.nombre,
      fechaVencimiento: formData.fechaVencimiento ? new Date(formData.fechaVencimiento) : undefined,
      preguntas: formData.preguntas || []
    };

    console.log('📅 Fecha de vencimiento procesada:', {
      original: formData.fechaVencimiento,
      procesada: encuesta.fechaVencimiento,
      tipo: typeof encuesta.fechaVencimiento
    });


    // Si el backend requiere estos campos, los agregamos como strings vacíos
    // El backend debería generar los valores reales
    if (encuesta.enlaceCorto === undefined) {
      encuesta.enlaceCorto = '';
    }
    if (encuesta.codigoQR === undefined) {
      encuesta.codigoQR = '';
    }

    console.log('📝 Datos de la encuesta antes de procesar:', encuesta);

    // Validar fecha de vencimiento primero
    if (this.fechaVencimiento.value) {
      const fechaSeleccionada = new Date(this.fechaVencimiento.value);
      const ahora = new Date();

      if (fechaSeleccionada <= ahora) {
        console.log('Fecha de vencimiento inválida. Ingresó un dato erróneo, ya pasó o está muy próximo a vencer');
        this.messageService.add({
          severity: 'error',
          summary: 'Fecha de vencimiento inválida',
          detail: 'La fecha ingresada ya ha pasado o es muy cercana al momento actual. Ingrese una fecha válida y futura',
          life: 5000
        });
        // Resetear el estado de carga antes de salir
        this.creandoEncuesta.set(false);
        return;
      }
    }

    // Validar que tenemos datos básicos
    if (!encuesta.nombre || !encuesta.preguntas || encuesta.preguntas.length === 0) {
      console.error('❌ Datos de encuesta incompletos:', {
        nombre: encuesta.nombre,
        preguntasLength: encuesta.preguntas?.length || 0
      });

      this.messageService.add({
        severity: 'error',
        summary: 'Datos incompletos',
        detail: 'Faltan datos requeridos para crear la encuesta',
        life: 5000
      });
      // Resetear el estado de carga antes de salir
      this.creandoEncuesta.set(false);
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
    console.log('🚀 Enviando petición al backend...');

    // Llama al servicio para crear la encuesta y maneja la respuesta
    this.encuestasService.crearEncuesta(encuesta).subscribe({
      next: (res) => {
        console.log('✅ Encuesta creada exitosamente:', res);
        console.log('📊 Estructura de la respuesta:', {
          id: res.id,
          codigoRespuesta: res.codigoRespuesta,
          codigoResultados: res.codigoResultados,
          tipoId: typeof res.id,
          tipoCodResp: typeof res.codigoRespuesta,
          tipoCodRes: typeof res.codigoResultados
        });

        // Verificar que tenemos todos los datos necesarios
        if (!res.id || !res.codigoRespuesta || !res.codigoResultados) {
          console.error('❌ Respuesta incompleta del backend:', res);
          this.messageService.add({
            severity: 'error',
            summary: 'Error en la respuesta del servidor',
            detail: 'El servidor no devolvió todos los códigos necesarios',
            life: 5000
          });
          return;
        }

        // Cerrar el diálogo de confirmación inmediatamente
        this.confirmationService.close();

        // Limpiar todos los toasts anteriores (incluyendo el de "Creando encuesta...")
        this.messageService.clear();

        // Mensaje de éxito detallado
        this.messageService.add({
          severity: 'success',
          summary: '¡Encuesta creada exitosamente!',
          detail: `La encuesta "${encuesta.nombre}" se ha creado correctamente con ${encuesta.preguntas.length} pregunta${encuesta.preguntas.length > 1 ? 's' : ''}`,
          life: 4000
        });

        // Construir la URL de redirección
        const redirectUrl = `/presentacion-enlaces?id-encuesta=${res.id}&codigo-respuesta=${res.codigoRespuesta}&codigo-resultados=${res.codigoResultados}`;
        console.log('🔗 URL de redirección:', redirectUrl);

        // Pequeño delay para que el usuario vea el mensaje antes de redirigir
        setTimeout(() => {
          console.log('🚀 Redirigiendo a:', redirectUrl);
          this.router.navigate(['/presentacion-enlaces'], {
            queryParams: {
              'id-encuesta': res.id,
              'codigo-respuesta': res.codigoRespuesta,
              'codigo-resultados': res.codigoResultados
            }
          });
        }, 1500);
      },
      error: (err) => {
        console.error('❌ Error al crear encuesta:', err);
        console.error('📊 Detalles del error:', {
          status: err.status,
          statusText: err.statusText,
          message: err.message,
          error: err.error,
          url: err.url
        });

        // Cerrar el diálogo de confirmación en caso de error
        this.confirmationService.close();

        // Mensaje de error detallado
        let errorDetail = 'Posible problema de conexión. Intentar nuevamente';
        let errorSummary = 'Error al crear la encuesta';

        if (err.status === 400) {
          errorDetail = 'Los datos de la encuesta no son válidos';
          if (err.error && err.error.message) {
            errorDetail += `: ${err.error.message}`;
          }
        } else if (err.status === 500) {
          errorDetail = 'Error interno del servidor. Intenta más tarde';
        } else if (err.status === 0) {
          errorDetail = 'No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose';
          errorSummary = 'Sin conexión al servidor';
        } else if (err.status === 404) {
          errorDetail = 'El endpoint de creación de encuestas no fue encontrado';
          errorSummary = 'Servicio no encontrado';
        }

        this.messageService.add({
          severity: 'error',
          summary: errorSummary,
          detail: errorDetail,
          life: 8000,
          sticky: true
        });
      },
      complete: () => {
        // Asegurar que el estado de carga siempre se resetee
        this.creandoEncuesta.set(false);
        console.log('🔄 Estado de carga reseteado');
      }
    });
  }
}
