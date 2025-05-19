import { ApiProperty } from '@nestjs/swagger'; // Decorador para documentar propiedades en Swagger
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'; // Validadores para las propiedades del DTO

// Clase DTO (Data Transfer Object) para crear una opción
export class CreateOpcionDto {
  @ApiProperty() // Documenta la propiedad "texto" en Swagger
  @IsString() // Valida que el valor sea una cadena de texto
  @IsNotEmpty() // Valida que el valor no esté vacío
  texto: string; // Texto de la opción

  @ApiProperty() // Documenta la propiedad "numero" en Swagger
  @IsNumber() // Valida que el valor sea un número
  @IsNotEmpty() // Valida que el valor no esté vacío
  numero: number; // Número que representa el orden o posición de la opción
}
