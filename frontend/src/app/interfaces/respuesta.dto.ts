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
