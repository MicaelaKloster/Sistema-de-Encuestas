import { PreguntaDTO } from './pregunta.dto';

// Interfaz que representa una encuesta completa
export interface EncuestaDTO {
  id: number; // Identificador único de la encuesta

  nombre: string; // Nombre o título de la encuesta

  preguntas: PreguntaDTO[]; // Lista de preguntas que contiene la encuesta

  codigoRespuesta: string; // Código utilizado para responder la encuesta
}
