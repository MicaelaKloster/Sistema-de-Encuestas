import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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

export class RegistrarRespuestasDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RespuestaPreguntaDto)
  @IsNotEmpty()
  respuestas: RespuestaPreguntaDto[];
}
