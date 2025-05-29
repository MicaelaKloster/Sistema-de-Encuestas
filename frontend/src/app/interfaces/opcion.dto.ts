// Interfaz que representa una opción de respuesta para una pregunta de tipo opción
export interface OpcionDTO {

  texto: string;   // Texto que se muestra como opción al usuario

  numero: number;  // Número de orden de la opción dentro de la pregunta
}