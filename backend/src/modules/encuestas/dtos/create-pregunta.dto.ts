import { ApiProperty } from '@nestjs/swagger'; // Decorador para documentar propiedades en Swagger
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'; // Validadores para las propiedades del DTO
import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum'; // Enumerador para los tipos de respuesta permitidos
import { Type } from 'class-transformer'; // Utilidad para transformar y validar objetos anidados
import { CreateOpcionDto } from './create-opcion.dto'; // DTO para las opciones de una pregunta

// Clase DTO (Data Transfer Object) para crear una pregunta
export class CreatePreguntaDto {
  @ApiProperty() // Documenta la propiedad "numero" en Swagger
  @IsNumber() // Valida que el valor sea un número
  @IsNotEmpty() // Valida que el valor no esté vacío
  numero: number; // Número que representa el orden o posición de la pregunta

  @ApiProperty() // Documenta la propiedad "texto" en Swagger
  @IsString() // Valida que el valor sea una cadena de texto
  @IsNotEmpty() // Valida que el valor no esté vacío
  texto: string; // Texto de la pregunta

  @ApiProperty({ enum: TiposRespuestaEnum }) // Documenta la propiedad "tipo" en Swagger como un enumerador
  @IsEnum(TiposRespuestaEnum) // Valida que el valor sea uno de los valores definidos en el enumerador
  @IsNotEmpty() // Valida que el valor no esté vacío
  tipo_respuesta: TiposRespuestaEnum; // Tipo de respuesta permitido para la pregunta

  @ApiProperty({ type: [CreateOpcionDto], required: false }) // Documenta la propiedad "opciones" en Swagger como un arreglo de CreateOpcionDto
  @IsArray() // Valida que el valor sea un arreglo
  @IsOptional() // Valida que esta propiedad sea opcional
  @ValidateNested({ each: true }) // Valida que cada elemento del arreglo sea un objeto válido según CreateOpcionDto
  @Type(() => CreateOpcionDto) // Transforma cada elemento del arreglo en una instancia de CreateOpcionDto
  opciones?: CreateOpcionDto[]; // Opciones asociadas a la pregunta (opcional)
}
