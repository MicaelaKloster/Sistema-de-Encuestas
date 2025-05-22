// Enum que define los tipos de respuesta posibles para una pregunta
export enum TiposRespuestaEnum {
  ABIERTA = 'ABIERTA', // Pregunta de respuesta abierta (texto libre)
  OPCION_MULTIPLE_SELECCION_SIMPLE = 'OPCION_MULTIPLE_SELECCION_SIMPLE', // Selección de una sola opción
  OPCION_MULTIPLE_SELECCION_MULTIPLE = 'OPCION_MULTIPLE_SELECCION_MULTIPLE', // Selección de varias opciones
}

// Arreglo que asocia cada tipo de respuesta con su presentación en texto
export const tiposPreguntaPresentacion: {
  tipo: TiposRespuestaEnum;
  presentacion: string;
}[] = [
  { tipo: TiposRespuestaEnum.ABIERTA, presentacion: 'Abierta' },
  {
    tipo: TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE,
    presentacion: 'Selección Simple',
  },
  {
    tipo: TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE,
    presentacion: 'Selección Múltiple',
  },
];