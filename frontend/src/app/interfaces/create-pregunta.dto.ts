import { CreateOpcionDTO } from './create-opcion.dto';
import { PreguntaDTO } from './pregunta.dto';

// Interfaz para crear una nueva pregunta, basada en PreguntaDTO pero solo con ciertas propiedades
export interface CreatePreguntaDTO
  extends Pick<
    PreguntaDTO,
    'numero' | 'texto' | 'tipo' // Solo toma estas propiedades de PreguntaDTO
  > {
  opciones: CreateOpcionDTO[]; // Lista de opciones para la pregunta (si corresponde)
}
