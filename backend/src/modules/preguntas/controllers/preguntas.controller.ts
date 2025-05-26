// Importación de decoradores y módulos necesarios de NestJS
import {
  Body,
  Controller,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
// Importación del servicio de preguntas
import { PreguntasService } from '../services/preguntas.service';
// Importación del DTO para actualizar una pregunta
import { ActualizarPreguntaDto } from '../../encuestas/dtos/actualizar-pregunta.dto';

@Controller('preguntas') // Define el controlador para manejar las rutas relacionadas con "/preguntas"
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) {} // Inyección del servicio de preguntas

  @Patch(':id') // Define un endpoint PATCH para actualizar una pregunta por su ID
  async actualizarPregunta(
    @Param('id', ParseIntPipe) id: number, // Obtiene el parámetro "id" de la URL y lo convierte en número.
    @Body() actualizarDto: ActualizarPreguntaDto, // Extrae el cuerpo de la petición y lo valida según ActualizarPreguntaDto.
  ): Promise<{ mensaje: string }> {
    // Llama al método actualizarPregunta del servicio, pasándole el id y los nuevos datos.
    return this.preguntasService.actualizarPregunta(id, actualizarDto);
  }

  @Delete(':id') // Define un endpoint DELETE para eliminar una pregunta y sus opciones
  async eliminarPregunta(
    @Param('id', ParseIntPipe) id: number, // Obtiene el parámetro "id" de la URL y lo convierte en número.
  ): Promise<{ mensaje: string }> {
    // Llama al método del servicio que elimina la pregunta junto con sus opciones
    return this.preguntasService.eliminarPreguntaConOpciones(id);
  }
}
