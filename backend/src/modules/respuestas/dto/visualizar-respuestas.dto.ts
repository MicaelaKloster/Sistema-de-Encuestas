import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';


export class VisualizarRespuestasDto {
  id: number;
  nombre: string;
  codigo_respuesta: string;
  codigo_resultados: string;
  fecha_creacion: Date;
  preguntas: PreguntaConRespuestasDto[];
}

export class PreguntaConRespuestasDto {
  id: number;
  numero: number;
  texto: string;
  tipo: string;
  opciones?: OpcionConRespuestasDto[];
  respuestas_abiertas?: string[];
}

export class OpcionConRespuestasDto {
  id: number;
  texto: string;
  numero: number;
  cantidad_respuestas: number;
}
