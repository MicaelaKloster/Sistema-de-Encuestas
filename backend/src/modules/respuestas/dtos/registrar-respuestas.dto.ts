import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RespuestaPreguntaDto } from './respuesta-pregunta.dto';

export class RegistrarRespuestasDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RespuestaPreguntaDto)
  @IsNotEmpty()
  respuestas: RespuestaPreguntaDto[];
}
