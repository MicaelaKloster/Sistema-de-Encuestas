export interface RespuestaPreguntaDto {
  id_pregunta: number; // ID de la pregunta, requerido
  tipo:
    | 'ABIERTA'
    | 'OPCION_MULTIPLE_SELECCION_SIMPLE'
    | 'OPCION_MULTIPLE_SELECCION_MULTIPLE'
    | 'VERDADERO_FALSO'; // Tipo de respuesta, requerido
  texto?: string; // Texto de la respuesta abierta, opcional
  opciones?: number[]; // Opciones seleccionadas para preguntas de opción múltiple, opcional
}

export interface RegistrarRespuestasDto {
  respuestas: RespuestaPreguntaDto[]; // Array de respuestas, requerido
}
