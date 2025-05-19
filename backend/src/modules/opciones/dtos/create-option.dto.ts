import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOpcionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  texto: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  numero: number;
}
