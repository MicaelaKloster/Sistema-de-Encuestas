import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { RespuestasService } from '../../services/respuestas.service';
import { RegistrarRespuestasDTO, RespuestaPreguntaDTO } from '../../interfaces/respuesta.dto';
import { TiposRespuestaEnum } from '../../enums/tipos-pregunta.enum';

@Component({
  selector: 'app-responder-encuesta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    CheckboxModule,
    FloatLabelModule,
    CardModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  templateUrl: './responder-encuesta.component.html',
  styleUrls: ['./responder-encuesta.component.css'],
  providers: [MessageService]
})
export class ResponderEncuestaComponent implements OnInit {
  // Servicios inyectados
  private route = inject(ActivatedRoute);
  public router = inject(Router); // Público para acceder desde el template
  private respuestasService = inject(RespuestasService);
  private messageService = inject(MessageService);

  // Variables de estado
  encuesta: any = null;
  codigoParticipacion = '';
  cargando = true;
  error = '';
  enviando = false;

  // Formulario reactivo
  respuestasForm!: FormGroup;

  // Enum para usar en el template
  TiposRespuestaEnum = TiposRespuestaEnum;

  ngOnInit() {
    // Obtener el código de participación de la URL
    this.codigoParticipacion = this.route.snapshot.paramMap.get('codigoRespuesta') || '';

    if (this.codigoParticipacion) {
      this.cargarEncuesta();
    } else {
      this.error = 'Código de participación no válido';
      this.cargando = false;
    }
  }

  private cargarEncuesta() {
    this.cargando = true;
    this.error = '';

    this.respuestasService.obtenerEncuestaParaParticipar(this.codigoParticipacion)
      .subscribe({
        next: (encuesta) => {
          console.log('Encuesta cargada:', encuesta);
          this.encuesta = encuesta;
          this.crearFormulario();
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al cargar encuesta:', error);
          this.error = 'Error al cargar la encuesta. Verifique que el enlace sea válido.';
          this.cargando = false;
        }
      });
  }

  private crearFormulario() {
    const formControls: { [key: string]: AbstractControl } = {};

    this.encuesta.preguntas.forEach((pregunta: any) => {
      const controlName = `pregunta_${pregunta.id}`;

      switch (pregunta.tipo) {
        case TiposRespuestaEnum.ABIERTA:
          formControls[controlName] = new FormControl('', [Validators.required]);
          break;
        case TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE:
        case TiposRespuestaEnum.VERDADERO_FALSO:
          formControls[controlName] = new FormControl(null, [Validators.required]);
          break;
        case TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE:
          // Para múltiple selección, creamos un FormArray
          const checkboxControls = pregunta.opciones.map(() => new FormControl(false));
          formControls[controlName] = new FormArray(checkboxControls, this.atLeastOneCheckboxValidator);
          break;
      }
    });

    this.respuestasForm = new FormGroup(formControls);
  }

  // Validador personalizado para checkboxes (al menos uno seleccionado)
  private atLeastOneCheckboxValidator(formArray: AbstractControl) {
    const controls = (formArray as FormArray).controls;
    const hasAtLeastOne = controls.some(control => control.value === true);
    return hasAtLeastOne ? null : { atLeastOneRequired: true };
  }

  onSubmit() {
    if (this.respuestasForm.valid) {
      this.enviando = true;

      const respuestas: RespuestaPreguntaDTO[] = [];

      this.encuesta.preguntas.forEach((pregunta: any) => {
        const controlName = `pregunta_${pregunta.id}`;
        const valor = this.respuestasForm.get(controlName)?.value;

        const respuesta: RespuestaPreguntaDTO = {
          id_pregunta: pregunta.id,
          tipo: pregunta.tipo
        };

        switch (pregunta.tipo) {
          case TiposRespuestaEnum.ABIERTA:
            respuesta.texto = valor;
            break;
          case TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE:
          case TiposRespuestaEnum.VERDADERO_FALSO:
            respuesta.opciones = [valor];
            break;
          case TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE:
            const opcionesSeleccionadas: number[] = [];
            valor.forEach((seleccionado: boolean, index: number) => {
              if (seleccionado) {
                opcionesSeleccionadas.push(pregunta.opciones[index].id);
              }
            });
            respuesta.opciones = opcionesSeleccionadas;
            break;
        }

        respuestas.push(respuesta);
      });

      const dto: RegistrarRespuestasDTO = { respuestas };

      console.log('Enviando respuestas al backend:', dto);
      console.log('ID de encuesta:', this.encuesta.id);
      console.log('Token de participación:', this.codigoParticipacion);

      // Enviar respuestas al backend
      this.respuestasService.registrarRespuestas(this.encuesta.id, this.codigoParticipacion, dto)
        .subscribe({
          next: (response) => {
            console.log('Respuestas enviadas exitosamente:', response);
            this.enviando = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Sus respuestas han sido registradas correctamente',
              life: 4000 // Duración de 4 segundos
            });

            // Redirigir después de un momento
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4500);
          },
          error: (error) => {
            console.error('Error al enviar respuestas:', error);
            this.enviando = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Hubo un problema al registrar sus respuestas. Inténtelo nuevamente.',
              life: 4000 // Duración de 4 segundos
            });
          }
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todas las preguntas obligatorias',
        life: 4000 // Duración de 4 segundos
      });
    }
  }

  // Método auxiliar para obtener el FormArray de una pregunta de múltiple selección
  getPreguntaFormArray(preguntaId: number): FormArray {
    return this.respuestasForm.get(`pregunta_${preguntaId}`) as FormArray;
  }

  // Método auxiliar para obtener un FormControl específico de un FormArray
  getCheckboxControl(preguntaId: number, index: number): FormControl {
    const formArray = this.getPreguntaFormArray(preguntaId);
    return formArray.at(index) as FormControl;
  }

  // Método auxiliar para verificar si una pregunta tiene errores
  hasError(preguntaId: number): boolean {
    const control = this.respuestasForm.get(`pregunta_${preguntaId}`);
    return !!(control && control.invalid && control.touched);
  }
}
