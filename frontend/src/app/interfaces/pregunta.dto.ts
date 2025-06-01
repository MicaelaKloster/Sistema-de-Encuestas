import { TiposRespuestaEnum } from '../enums/tipos-pregunta.enum';
import { OpcionDTO } from './opcion.dto';

// Interfaz que representa una pregunta de la encuesta
export interface PreguntaDTO {
  id: number; // Identificador único de la pregunta

  numero: number; // Número de orden de la pregunta en la encuesta

  texto: string; // Texto o enunciado de la pregunta

  tipo: TiposRespuestaEnum; // Tipo de respuesta esperada (abierta, opción, etc.)

  opciones?: OpcionDTO[]; // Opciones disponibles (solo si la pregunta es de tipo opción)
}
