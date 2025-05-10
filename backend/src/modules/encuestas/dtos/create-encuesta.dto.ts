import { ApiProperty } from '@nestjs/swagger'; // Decorador para documentar propiedades en Swagger
import { Type } from 'class-transformer'; // Utilidad para transformar y validar objetos anidados
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator'; // Validadores para las propiedades del DTO
import { CreatePreguntaDto } from './create-pregunta.dto'; // DTO para las preguntas de la encuesta

// Clase DTO (Data Transfer Object) para crear una encuesta
export class CreateEncuestaDto {
  @ApiProperty() // Documenta la propiedad "nombre" en Swagger
  @IsString() // Valida que el valor sea una cadena de texto
  @IsNotEmpty() // Valida que el valor no esté vacío
  nombre: string; // Nombre de la encuesta

  @ApiProperty({ type: [CreatePreguntaDto] }) // Documenta la propiedad "preguntas" en Swagger como un arreglo de CreatePreguntaDto
  @IsArray() // Valida que el valor sea un arreglo
  @ArrayNotEmpty() // Valida que el arreglo no esté vacío
  @ArrayMinSize(1) // Valida que el arreglo tenga al menos un elemento
  @ValidateNested({ each: true }) // Valida que cada elemento del arreglo sea un objeto válido según CreatePreguntaDto
  @Type(() => CreatePreguntaDto) // Transforma cada elemento del arreglo en una instancia de CreatePreguntaDto
  preguntas: CreatePreguntaDto[]; // Lista de preguntas asociadas a la encuesta
}
