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

@Controller('preguntas/:preguntaId/opciones')
export class OpcionesController {
  constructor(private readonly opcionesService: OpcionesService) {}

  @Post()
  async crearOpcion(
    @Param('preguntaId', ParseIntPipe) preguntaId: number,
    @Body() createOpcionDto: CreateOpcionDto,
  ): Promise<{ mensaje: string; opcion: any }> {
    return this.opcionesService.crearOpcion(preguntaId, createOpcionDto);
  }

  @Delete(':id')
  async eliminarOpcion(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ mensaje: string }> {
    return this.opcionesService.eliminarOpcion(id);
  }
}
