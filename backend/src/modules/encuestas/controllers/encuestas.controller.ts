// Importación de decoradores y módulos necesarios de NestJS
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
// Importación del servicio de encuestas
import { EncuestasService } from '../services/encuestas.service';
// Importación del DTO para crear encuestas
import { CreateEncuestaDto } from '../dtos/create-encuesta.dto';
// Importación del DTO para obtener encuestas
import { ObtenerEncuestaDto } from '../dtos/obtener-encuesta.dto';
// Importación de la entidad Encuesta
import { Encuesta } from '../entities/encuesta.entity';

@Controller('encuestas') // Define el controlador para manejar las rutas relacionadas con "encuestas"
export class EncuestasController {
  constructor(private readonly encuestasService: EncuestasService) {} // Inyección del servicio de encuestas

  @Post() // Define un endpoint POST para crear una nueva encuesta
  async crearEncuesta(@Body() dto: CreateEncuestaDto): Promise<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
  }> {
    // Llama al servicio para crear una encuesta y retorna los datos relevantes
    return await this.encuestasService.crearEncuesta(dto);
  }

  @Get(':id') // Define un endpoint GET para obtener una encuesta por su ID
  async obtenerEncuesta(
    @Param('id') id: number, // Obtiene el parámetro "id" de la URL
    @Query() dto: ObtenerEncuestaDto, // Obtiene los parámetros de consulta (query params)
  ): Promise<Encuesta> {
    // Llama al servicio para obtener la encuesta y la retorna
    return await this.encuestasService.obtenerEncuesta(
      id,
      dto.codigo, // Código de respuesta o resultados
      dto.tipo, // Tipo de código (respuesta o resultados)
    );
  }

  // Funcionalidad Extra para deshabilitar una encuesta (MICA)
  @Patch(':id/habilitar') // Define un endpoint PATCH para habilitar/deshabilitar una encuesta
  async cambiarEstadoEncuesta(
    @Param('id') id: number, // Obtiene el parámetro "id" de la URL
    @Body('habilitada') habilitada: boolean, // Obtiene el cuerpo de la solicitud para saber si se habilita o deshabilita
  ): Promise<{ mensaje: string }> {
    return await this.encuestasService.actualizarEstadoEncuesta(id, habilitada);
  }
}
