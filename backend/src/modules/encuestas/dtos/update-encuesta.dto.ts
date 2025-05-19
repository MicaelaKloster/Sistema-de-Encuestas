import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEncuestaDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  habilitada?: boolean;

  @ApiProperty({ required: false, type: Date })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaVencimiento?: Date;
}
