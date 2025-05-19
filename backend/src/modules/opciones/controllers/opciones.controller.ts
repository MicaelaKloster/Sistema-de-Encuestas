import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OpcionesService } from '../services/opciones.service';
import { CreateOpcionDto } from '../dtos/create-option.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Opcion } from '../entities/option.entity';

@ApiTags('opciones')
@Controller('opciones')
export class OpcionesController {
  constructor(private readonly opcionesService: OpcionesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva opción' })
  @ApiResponse({ status: 201, description: 'Opción creada exitosamente' })
  async crearOpcion(@Body() createOpcionDto: CreateOpcionDto): Promise<Opcion> {
    return await this.opcionesService.crearOpcion(createOpcionDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una opción por ID' })
  @ApiResponse({ status: 200, description: 'Opción encontrada' })
  async obtenerOpcion(@Param('id') id: number): Promise<Opcion> {
    return await this.opcionesService.obtenerOpcion(id);
  }
}
