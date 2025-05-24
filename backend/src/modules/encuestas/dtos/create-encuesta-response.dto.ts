import { ApiProperty } from '@nestjs/swagger';

export class CreateEncuestaResponseDto {
  @ApiProperty({ description: 'ID de la encuesta creada' })
  id: number;

  @ApiProperty({ description: 'Código para participar en la encuesta' })
  codigoRespuesta: string;

  @ApiProperty({ description: 'Código para visualizar resultados' })
  codigoResultados: string;

  @ApiProperty({ description: 'Enlace para participar en la encuesta' })
  enlaceParticipacion: string;

  @ApiProperty({ description: 'Enlace para visualizar resultados' })
  enlaceVisualizacion: string;
}
