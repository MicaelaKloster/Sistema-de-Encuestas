import { TiposRespuestaEnum } from 'src/modules/encuestas/enums/tipos-respuesta.enum';
// Representa la encuesta con sus respuestas.
export class VisualizarRespuestasDto {
  id: number;
  nombre: string;
  codigoRespuesta: string;
  codigoResultados: string;
  habilitada: boolean;
  preguntas: PreguntaConRespuestasDto[];
}
//Representa cada pregunta dentro de la encuesta.
export class PreguntaConRespuestasDto {
  id: number;
  numero: number;
  texto: string;
  tipo: TiposRespuestaEnum;
  opciones: OpcionConRespuestasDto[];
  respuestas_abiertas: string[];
  constructor() {
    this.opciones = [];
    this.respuestas_abiertas = [];
  }
}
//Define las opciones de respuesta y cuántas veces fueron elegidas.
export class OpcionConRespuestasDto {
  id: number;
  texto: string;
  numero: number;
  cantidad_respuestas: number;
}
