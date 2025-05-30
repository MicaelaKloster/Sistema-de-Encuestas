import { Component, inject, model, output, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import {
  tiposPreguntaPresentacion,
  TiposRespuestaEnum,
} from '../../enums/tipos-pregunta.enum';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { PreguntaDTO } from '../../interfaces/pregunta.dto';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TextoErrorComponent } from '../texto-error/texto-error.component';
import { effect } from '@angular/core';
import { SeccionComponent } from '../seccion/seccion.component';
import { GestionOpcionDialogComponent } from '../gestion-opcion-dialog/gestion-opcion-dialog.component';
import { CreateOpcionDTO } from '../../interfaces/create-opcion.dto';
import { opcionesNoVacias } from '../../validators/opciones-no-vacias.validator';

// Componente para gestionar el diálogo de creación/edición de preguntas
@Component({
  selector: 'app-gestion-pregunta-dialog',
  imports: [
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    TextoErrorComponent,
    SeccionComponent,
    GestionOpcionDialogComponent,
  ],
  templateUrl: './gestion-pregunta-dialog.component.html',
  styleUrl: './gestion-pregunta-dialog.component.css',
})
export class GestionPreguntaDialogComponent {
  // Formulario reactivo para la pregunta
  readonly form: FormGroup;

  // Controla la visibilidad del diálogo
  visible = model.required<boolean>();

  // Pregunta a editar (opcional)
  preguntaAEditar = model<PreguntaDTO | null>(null);

  // Controla la visibilidad del diálogo para agregar opciones
  dialogGestionOpcionVisible = signal<boolean>(false);

  // Evento de salida para agregar una pregunta
  agregarPregunta = output<PreguntaDTO>();

  // Opción seleccionada temporalmente para agregar
  opcionSeleccionada = signal<Pick<CreateOpcionDTO, 'texto'> | null>(null);

  // Servicios de mensajes y confirmación de PrimeNG
  private messageService: MessageService = inject(MessageService);
  private confirmationService: ConfirmationService = inject(ConfirmationService);

  constructor() {
    // Inicializa el formulario con controles y validadores
    this.form = new FormGroup(
      {
        texto: new FormControl<string>('', Validators.required), // Texto de la pregunta
        tipo: new FormControl<TiposRespuestaEnum | null>(
          null,
          Validators.required,
        ), // Tipo de pregunta
        opciones: new FormArray<FormControl<Pick<CreateOpcionDTO, 'texto'>>>(
          [],
        ), // Opciones de respuesta (si corresponde)
      },
      { validators: [opcionesNoVacias] }, // Validador personalizado para opciones
    );

    // Efecto que resetea el formulario cuando el diálogo se hace visible
    effect(() => {
      if (this.visible()) {
        const preguntaAEditar = this.preguntaAEditar();
        if (preguntaAEditar) {
          this.cargarPreguntaParaEditar(preguntaAEditar);
        } else {
          this.reset();
        }
      }
    });
  }

  // Resetea el formulario y las opciones
  reset() {
    this.form.reset();
    this.resetearOpciones();
  }

  // Elimina todas las opciones del formulario
  resetearOpciones() {
    this.opciones.clear();
  }

  // Carga los datos de una pregunta existente para editar
  cargarPreguntaParaEditar(pregunta: PreguntaDTO) {
    // Resetear primero
    this.reset();

    // Cargar datos básicos
    this.texto.setValue(pregunta.texto);
    this.tipo.setValue(pregunta.tipo);

    // Cargar opciones si existen
    if (pregunta.opciones && pregunta.opciones.length > 0) {
      pregunta.opciones.forEach(opcion => {
        this.opciones.push(
          new FormControl<Pick<CreateOpcionDTO, 'texto'>>({
            texto: opcion.texto,
          }) as FormControl<Pick<CreateOpcionDTO, 'texto'>>
        );
      });
    }
  }

  // Devuelve los tipos de pregunta disponibles para el selector
  getTiposPreguntaPresentacion(): {
    tipo: TiposRespuestaEnum;
    presentacion: string;
  }[] {
    return tiposPreguntaPresentacion;
  }

  // Getter para el control de texto
  get texto(): FormControl<string> {
    return this.form.get('texto') as FormControl<string>;
  }

  // Getter para el control de tipo
  get tipo(): FormControl<TiposRespuestaEnum> {
    return this.form.get('tipo') as FormControl<TiposRespuestaEnum>;
  }

  // Getter para el FormArray de opciones
  get opciones(): FormArray<FormControl<Pick<CreateOpcionDTO, 'texto'>>> {
    return this.form.get('opciones') as FormArray<
      FormControl<Pick<CreateOpcionDTO, 'texto'>>
    >;
  }

  // Agrega la pregunta si el formulario es válido, si no muestra errores
  agregar() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Hay errores en el formulario',
      });
      return;
    }

    const pregunta: PreguntaDTO = this.form.value;

    if (pregunta.tipo === TiposRespuestaEnum.VERDADERO_FALSO) {
    pregunta.opciones = [
          { numero: 1, texto: 'Verdadero' },
          { numero: 2, texto: 'Falso' },
    ];
    }

    this.agregarPregunta.emit(pregunta); // Emite la pregunta al componente padre
    this.cerrar();
  }

  // Cierra el diálogo
  cerrar() {
    this.visible.set(false);
  }

  // Determina si el tipo de pregunta es de opción múltiple o simple
  esMultipleChoice(tipo: TiposRespuestaEnum) {
    return [
      TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE,
      TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE,
    ].includes(tipo);
  }

  // Abre el diálogo para agregar una nueva opción
  abrirAgregarOpcion() {
    this.dialogGestionOpcionVisible.set(true);
  }

  // Agrega una nueva opción al FormArray de opciones
  agregarOpcion(opcion: string) {
    this.opciones.push(
      new FormControl<Pick<CreateOpcionDTO, 'texto'>>({
        texto: opcion,
      }) as FormControl<Pick<CreateOpcionDTO, 'texto'>>,
    );
  }

  // Elimina una opción por índice
  eliminarOpcion(index: number) {
    this.opciones.removeAt(index);
  }

  // Muestra un cuadro de confirmación antes de eliminar una opción
  confirmarEliminarOpcion(index: number) {
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
        this.eliminarOpcion(index);
      },
    });
  }
}
