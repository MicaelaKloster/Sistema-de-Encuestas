import { ApiProperty } from '@nestjs/swagger'; // Decorador para documentar propiedades en Swagger
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator'; // Validadores para las propiedades del DTO
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum'; // Enumerador para los tipos de código permitidos

// Clase DTO (Data Transfer Object) para obtener una encuesta
export class ObtenerEncuestaDto {
  @ApiProperty() // Documenta la propiedad "codigo" en Swagger
  @IsUUID('4') // Valida que el valor sea un UUID versión 4
  @IsNotEmpty() // Valida que el valor no esté vacío
  codigo: string; // Código único para identificar la encuesta

  @ApiProperty({ enum: CodigoTipoEnum }) // Documenta la propiedad "tipo" en Swagger como un enumerador
  @IsEnum(CodigoTipoEnum) // Valida que el valor sea uno de los valores definidos en el enumerador
  @IsNotEmpty() // Valida que el valor no esté vacío
  tipo: CodigoTipoEnum; // Tipo de código (puede ser "RESULTADOS" o "RESPUESTA")
}
