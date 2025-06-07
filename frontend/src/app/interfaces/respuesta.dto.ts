// Interfaz que representa la respuesta a una pregunta individual
export interface RespuestaPreguntaDTO {
  id_pregunta: number; // ID de la pregunta que se está respondiendo
  tipo: 'ABIERTA' | 'OPCION_MULTIPLE_SELECCION_SIMPLE' | 'OPCION_MULTIPLE_SELECCION_MULTIPLE' | 'VERDADERO_FALSO'; // Tipo de pregunta
  texto?: string; // Respuesta de texto para preguntas abiertas
  opciones?: number[]; // IDs de las opciones seleccionadas para preguntas de opción múltiple
}

// Interfaz que contiene todas las respuestas de una encuesta
export interface RegistrarRespuestasDTO {
  respuestas: RespuestaPreguntaDTO[]; // Array con todas las respuestas del usuario
}

// Define los posibles tipos de respuesta que puede tener una pregunta en la encuesta
export type TipoRespuesta = 
  'ABIERTA' |                                     // Respuesta escrita libremente por el usuario
  'OPCION_MULTIPLE_SELECCION_SIMPLE' |            // Una sola opción seleccionable (tipo radio)
  'OPCION_MULTIPLE_SELECCION_MULTIPLE' |          // Varias opciones seleccionables (tipo checkbox)
  'VERDADERO_FALSO';                              // Tipo booleano: verdadero o falso

// Representa una opción dentro de una pregunta que tiene opciones para elegir
export interface OpcionRespuesta {
  id: number;         // ID único de la opción
  numero: number;     // Número de orden de la opción dentro de la pregunta
  texto: string;      // Texto visible que describe la opción
}

// Representa una pregunta dentro de una encuesta
export interface Pregunta {
  id: number;                      // ID único de la pregunta
  numero: number;                 // Número de orden de la pregunta dentro de la encuesta
  texto: string;                  // Enunciado de la pregunta
  tipo: TipoRespuesta;            // Tipo de respuesta esperada (ver enum TipoRespuesta)
  obligatoria: boolean;           // Indica si el usuario debe responderla sí o sí
  opciones?: OpcionRespuesta[];   // Lista de opciones (solo si el tipo no es 'ABIERTA')
}

// Representa una encuesta completa con sus preguntas
export interface Encuesta {
  id: number;              // ID único de la encuesta
  nombre: string;          // Título o nombre de la encuesta
  descripcion?: string;    // Descripción opcional
  preguntas: Pregunta[];   // Lista de preguntas que la componen
}

// Representa la respuesta de un usuario a una pregunta concreta
export interface RespuestaUsuario {
  numeroPregunta: number; // Número de la pregunta a la que responde
  opciones: number[];     // IDs de las opciones seleccionadas (vacío si es tipo abierta)
  texto: string;          // Texto ingresado por el usuario (si aplica)
}

// DTO = Data Transfer Object: define cómo se envía cada respuesta al backend
export interface RespuestaPreguntaDto {
  id_pregunta: number;         // ID de la pregunta respondida
  tipo: TipoRespuesta;         // Tipo de la pregunta
  texto?: string;              // Texto ingresado (solo si es tipo 'ABIERTA')
  opciones?: number[];         // Opciones seleccionadas (si corresponde)
}

// DTO que agrupa todas las respuestas que un usuario envía en una sola vez
export interface RegistrarRespuestasDto {
  respuestas: RespuestaPreguntaDto[];  // Lista de respuestas enviadas
}

// Representa la respuesta que el servidor devuelve cuando se obtiene una encuesta
export interface EncuestaResponse {
  message: string;   // Mensaje del servidor
  data: Encuesta;    // Los datos reales de la encuesta (objeto completo)
}
