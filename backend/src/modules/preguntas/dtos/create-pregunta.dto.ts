import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TiposRespuestaEnum } from '../../encuestas/enums/tipos-respuesta.enum';
import { Type } from 'class-transformer';
import { CreateOpcionDto } from './create-opcion.dto';

export class CreatePreguntaDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  numero: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  texto: string;

  @ApiProperty({ enum: TiposRespuestaEnum })
  @IsEnum(TiposRespuestaEnum)
  @IsNotEmpty()
  tipo_respuesta: TiposRespuestaEnum;

  @ApiProperty({ type: [CreateOpcionDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOpcionDto)
  opciones?: CreateOpcionDto[];
}
