/*
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextarea } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-responder-encuesta',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    //HttpClientModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    InputTextarea,
  ],
  providers: [MessageService],
  templateUrl: './responder-encuesta.component.html',
  styleUrls: ['./responder-encuesta.component.css'],
})
export class ResponderEncuestaComponent {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private router = inject(Router);
  private messageService = inject(MessageService);

  encuesta: any = null;
  respuestas: {
    numeroPregunta: number;
    opciones: number[];
    texto: string;
  }[] = [];

  id!: number;
  tokenParticipacion!: string;

  cargando = true;

  constructor() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.tokenParticipacion = this.route.snapshot.paramMap.get('tokenParticipacion')!;

    this.cargarEncuesta();
  }

  getRespuestaPorPregunta(numeroPregunta: number) {
    let respuesta = this.respuestas.find(r => r.numeroPregunta === numeroPregunta);
    if (!respuesta) {
      // Si no existe, crea una respuesta vacía para evitar errores
      respuesta = { numeroPregunta, opciones: [], texto: '' };
      this.respuestas.push(respuesta);
    }
    return respuesta;
  }

  cargarEncuesta() {
    this.http
      .get<any>(`http://localhost:3001/api/v1/respuestas/participar/${this.id}/${this.tokenParticipacion}`)
      .subscribe({
        next: (response) => {
          this.encuesta = response.data;
          console.log('Preguntas con opciones:', this.encuesta.preguntas);

          this.respuestas = this.encuesta.preguntas.map((pregunta: any) => ({
            numeroPregunta: pregunta.numero,
            opciones: [],
            texto: '',
          }));
          this.cargando = false;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error al cargar la encuesta' });
          this.cargando = false;
        },
      });
  }

  // Maneja selección (checkbox para multiple, radio para único)
  seleccionarOpcion(pregunta: any, numeroOpcion: number) {
    const respuesta = this.respuestas.find((r) => r.numeroPregunta === pregunta.numero);
    if (!respuesta) return;

    if (pregunta.tipoRespuesta === 'multiple') {
      if (respuesta.opciones.includes(numeroOpcion)) {
        respuesta.opciones = respuesta.opciones.filter((n) => n !== numeroOpcion);
      } else {
        respuesta.opciones.push(numeroOpcion);
      }
    } else {
      respuesta.opciones = [numeroOpcion];
    }
  }

  // Para respuestas de texto libre
  setTextoRespuesta(pregunta: any, texto: string) {
    const respuesta = this.respuestas.find((r) => r.numeroPregunta === pregunta.numero);
    if (respuesta) {
      respuesta.texto = texto;
    }
  }

  enviarRespuestas() {
    if (!this.validarRespuestas()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Por favor, responde todas las preguntas antes de enviar',
      });
      return;
    }

    this.http
      .post(`http://localhost:3001/api/v1/respuestas/${this.id}/${this.tokenParticipacion}`, { respuestas: this.respuestas })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: '¡Respuestas registradas con éxito!',
          });
          this.router.navigateByUrl('/gracias'); // o donde quieras redirigir
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al enviar respuestas, intentá nuevamente',
          });
        },
      });
  }

  validarRespuestas(): boolean {
    for (const pregunta of this.encuesta.preguntas) {
      const respuesta = this.respuestas.find((r) => r.numeroPregunta === pregunta.numero);
      if (!respuesta) return false;

      if (pregunta.tipoRespuesta === 'texto') {
        if (!respuesta.texto.trim()) return false;
      } else {
        if (respuesta.opciones.length === 0) return false;
      }
    }
    return true;
  }
}
*/

// responder-encuesta.component.ts 
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG imports
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
//import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// Importamos el servicio y sus interfaces
import { 
  RespuestaService, 
  Encuesta, 
  Pregunta, 
  RespuestaUsuario, 
  TipoRespuesta,
} from '../../services/respuestas.service';

@Component({
  selector: 'app-responder-encuesta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    //InputTextareaModule,
    RadioButtonModule,
    ToastModule,
    CardModule,
    ProgressSpinnerModule
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

  ngOnInit() {
    // Obtener parámetros de la ruta
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
    this.cargando = true;
    
    this.respuestaService.obtenerEncuestaParaParticipacion(this.id, this.tokenParticipacion)
      .subscribe({
        next: (response: { data: any; }) => {
          this.encuesta = response.data;
          this.inicializarRespuestas();
          this.cargando = false;
        },
        error: (error: any) => {
          console.error('Error al cargar encuesta:', error);
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'No se pudo cargar la encuesta' 
          });
          this.cargando = false;
        },
      });
  }

  private inicializarRespuestas() {
    if (!this.encuesta) return;
    
    this.respuestas = this.encuesta.preguntas.map((pregunta: { numero: any; }) => ({
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

  // Maneja selección para preguntas de opción múltiple (múltiple selección)
  onCheckboxChange(pregunta: Pregunta, numeroOpcion: number, checked: boolean) {
    const respuesta = this.getRespuestaPorPregunta(pregunta.numero);
    
    if (checked) {
      if (!respuesta.opciones.includes(numeroOpcion)) {
        respuesta.opciones.push(numeroOpcion);
      }
    } else {
      respuesta.opciones = respuesta.opciones.filter(n => n !== numeroOpcion);
    }
  }

  // Maneja selección para preguntas de opción simple (radio button)
  onRadioChange(pregunta: Pregunta, numeroOpcion: number) {
    const respuesta = this.getRespuestaPorPregunta(pregunta.numero);
    respuesta.opciones = [numeroOpcion];
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

  enviarRespuestas() {
    if (!this.validarRespuestas()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validación',
        detail: 'Por favor, responde todas las preguntas obligatorias antes de enviar',
      });
      return;
    }

    this.enviando = true;

    const payload = { respuestas: this.respuestas };

    this.respuestaService.registrarRespuestas(this.id, this.tokenParticipacion, payload)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: '¡Respuestas registradas con éxito!',
          });
          // Redirigir después de un breve delay para que el usuario vea el mensaje
          setTimeout(() => {
            this.router.navigateByUrl('/gracias');
          }, 2000);
        },
        error: (error: any) => {
          console.error('Error al enviar respuestas:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al enviar respuestas, intentá nuevamente',
          });
          this.enviando = false;
        },
      });
  }

  validarRespuestas(): boolean {
    if (!this.encuesta) return false;

    for (const pregunta of this.encuesta.preguntas) {
      // Solo validar preguntas obligatorias
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
}