import { CreatePreguntaDTO } from './create-pregunta.dto';
import { EncuestaDTO } from './encuesta.dto';

// Interfaz para crear una nueva encuesta, basada en EncuestaDTO pero solo con la propiedad 'nombre'
export interface CreateEncuestaDTO extends Pick<EncuestaDTO, 'nombre'> {
  preguntas: CreatePreguntaDTO[]; // Lista de preguntas que tendrá la encuesta al momento de crearla
}