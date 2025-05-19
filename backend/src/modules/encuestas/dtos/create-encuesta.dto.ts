import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreatePreguntaDto } from './create-pregunta.dto';

export class CreateEncuestaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ type: [CreatePreguntaDto] })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePreguntaDto)
  preguntas: CreatePreguntaDto[];

  @ApiProperty({ required: false, type: Date })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaVencimiento?: Date;
}
