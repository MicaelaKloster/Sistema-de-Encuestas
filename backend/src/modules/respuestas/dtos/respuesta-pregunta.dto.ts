import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class RespuestaPreguntaDto {
  @IsNumber()
  @IsNotEmpty()
  id_pregunta: number;

  @IsString()
  @IsNotEmpty()
  tipo:
    | 'ABIERTA'
    | 'OPCION_MULTIPLE_SELECCION_SIMPLE'
    | 'OPCION_MULTIPLE_SELECCION_MULTIPLE';

  @IsOptional()
  @IsString()
  texto?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  opciones?: number[];
}
