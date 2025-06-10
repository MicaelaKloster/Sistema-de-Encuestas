import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { OpcionesService } from '../services/opciones.service';
import { CreateOpcionDto } from '../../encuestas/dtos/create-opcion.dto';

/**
 * Controlador para gestionar las opciones de una pregunta.
 * Permite crear y eliminar opciones asociadas a una pregunta específica.
 */
@Controller('preguntas/:preguntaId/opciones')
export class OpcionesController {
  /**
   * Inyecta el servicio de opciones para manejar la lógica de negocio.
   */
  constructor(private readonly opcionesService: OpcionesService) {}

  /**
   * Crea una nueva opción para una pregunta específica.
   * @param preguntaId ID de la pregunta a la que se asocia la opción.
   * @param createOpcionDto Datos de la opción a crear.
   * @returns Un mensaje de éxito y la opción creada.
   */
  @Post()
  async crearOpcion(
    @Param('preguntaId', ParseIntPipe) preguntaId: number,
    @Body() createOpcionDto: CreateOpcionDto,
  ): Promise<{ mensaje: string; opcion: any }> {
    return this.opcionesService.crearOpcion(preguntaId, createOpcionDto);
  }

  /**
   * Elimina una opción por su ID.
   * @param id ID de la opción a eliminar.
   * @returns Un mensaje de éxito.
   */
  @Delete(':id')
  async eliminarOpcion(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ mensaje: string }> {
    return this.opcionesService.eliminarOpcion(id);
  }
}
