import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Representa la respuesta a una pregunta individual de la encuesta:
// id_pregunta: Un número obligatorio que identifica la pregunta (validado con @IsNumber() y @IsNotEmpty())
// tipo: Un string que debe ser uno de tres valores específicos (tipos de pregunta):
// 'ABIERTA': Para preguntas de respuesta libre
// 'OPCION_MULTIPLE_SELECCION_SIMPLE': Para preguntas con una sola opción seleccionable
// 'OPCION_MULTIPLE_SELECCION_MULTIPLE': Para preguntas con múltiples opciones seleccionables
// texto: Un campo opcional (@IsOptional()) de tipo string para almacenar la respuesta a preguntas abiertas
// opciones: Un campo opcional que contiene un array de números, para almacenar los IDs de las opciones seleccionadas en preguntas de opción múltiple

export class RespuestaPreguntaDto {
  @IsNumber()
  @IsNotEmpty()
  id_pregunta: number;

  @IsString()
  @IsNotEmpty()
  @Type(() => String) // Transforma explicitamente el tipo
  tipo:
    | 'ABIERTA'
    | 'OPCION_MULTIPLE_SELECCION_SIMPLE'
    | 'OPCION_MULTIPLE_SELECCION_MULTIPLE';

  @IsOptional()
  @IsString()
  texto?: string; // preguntas abiertas

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number) // Transforma cada elemento a número
  opciones?: number[]; // preguntas de opción múltiple
}

// Actúa como contenedor principal que será recibido por el controlador:
// respuestas: Un array obligatorio de objetos RespuestaPreguntaDto
// Usa @ValidateNested() para validar cada elemento del array según las reglas de RespuestaPreguntaDto
// Usa @Type(() => RespuestaPreguntaDto) para asegurar que cada elemento sea transformado correctamente

export class RegistrarRespuestasDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RespuestaPreguntaDto)
  @IsNotEmpty()
  respuestas: RespuestaPreguntaDto[];
}
