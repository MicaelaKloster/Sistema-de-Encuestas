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
  private confirmationService: ConfirmationService = inject(ConfirmationService);
  private encuestasService: EncuestasService = inject(EncuestasService);

  // Controla la visibilidad del diálogo para agregar/editar preguntas
  dialogGestionPreguntaVisible = signal<boolean>(false);

  // Almacena la pregunta seleccionada para edición (si corresponde)
  preguntaSeleccionada = signal<PreguntaDTO | null>(null);

  constructor() {
    // Inicializa el formulario con controles y validadores
    this.form = new FormGroup({
      nombre: new FormControl<string>('', Validators.required), // Nombre de la encuesta
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

  // Abre el diálogo para agregar una nueva pregunta
  abrirDialog() {
    this.dialogGestionPreguntaVisible.set(true);
  }

  // Agrega una nueva pregunta al FormArray de preguntas
  agregarPregunta(pregunta: PreguntaDTO) {
    this.preguntas.push(
      new FormControl<PreguntaDTO>(pregunta) as FormControl<PreguntaDTO>
    );
  }

  // Elimina una pregunta del FormArray por índice
  eliminarPregunta(index: number) {
    this.preguntas.removeAt(index);
  }

  // Devuelve la presentación textual del tipo de pregunta
  getTipoPreguntaPresentacion(tipo: TiposRespuestaEnum): string {
    return tiposPreguntaPresentacion.find(
      (tipoPresentacion) => tipoPresentacion.tipo === tipo
    )!?.presentacion;
  }

  // Muestra un cuadro de confirmación antes de crear la encuesta
  confirmarCrearEncuesta() {
    this.confirmationService.confirm({
      message: 'Confirmar creación de encuesta?',
      header: 'Confirmación',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirmar',
      },
      accept: () => {
        this.crearEncuesta();
      },
    });
  }

  // Muestra un cuadro de confirmación antes de eliminar una pregunta
  confirmarEliminarPregunta(index: number) {
    this.confirmationService.confirm({
      message: 'Confirmar eliminación?',
      header: 'Confirmación',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirmar',
      },
      accept: () => {
        this.eliminarPregunta(index);
      },
    });
  }

  // Envía la encuesta al backend para su creación
  crearEncuesta() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Hay errores en el formulario',
      });
      return;
    }

    // Obtiene los datos del formulario
    const encuesta: CreateEncuestaDTO = {
      ...this.form.value,
      enlaceCorto: '',
      codigoQR: '',
    };

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

    // Llama al servicio para crear la encuesta y maneja la respuesta
    this.encuestasService.crearEncuesta(encuesta).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'La encuesta se creó con éxito',
        });

        // Redirige a la pantalla de presentación de enlaces con los códigos generados
        this.router.navigateByUrl(
          '/presentacion-enlaces?id-encuesta=' +
            res.id +
            '&codigo-respuesta=' +
            res.codigoRespuesta +
            '&codigo-resultados=' +
            res.codigoResultados
        );
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ha ocurrido un error al crear la encuesta',
        });
      },
    });
  }
}
