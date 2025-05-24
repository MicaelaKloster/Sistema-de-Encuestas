import { IsOptional, IsString, IsEnum } from 'class-validator'; // Validaciones para las propiedades del DTO
import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum'; // Enum con los tipos de respuesta válidos

// Clase DTO para actualizar una pregunta ya creada
export class ActualizarPreguntaDto {
  @IsOptional() // Indica que esta propiedad es opcional
  @IsString() // Valida que el valor sea una cadena de texto
  texto?: string; // Nuevo texto de la pregunta

  @IsOptional() // Indica que esta propiedad es opcional
  @IsEnum(TiposRespuestaEnum) // Valida que sea un valor válido del enum TiposRespuestaEnum
  tipo?: TiposRespuestaEnum; // Nuevo tipo de respuesta para la pregunta
}
