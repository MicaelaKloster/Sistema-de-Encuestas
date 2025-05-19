import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PreguntasService } from '../services/preguntas.service';
import { CreatePreguntaDto } from '../dtos/create-pregunta.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Pregunta } from '../entities/pregunta.entity';

@ApiTags('preguntas')
@Controller('preguntas')
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva pregunta' })
  @ApiResponse({ status: 201, description: 'Pregunta creada exitosamente' })
  async crearPregunta(
    @Body() createPreguntaDto: CreatePreguntaDto,
  ): Promise<Pregunta> {
    return await this.preguntasService.crearPregunta(createPreguntaDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una pregunta por ID' })
  @ApiResponse({ status: 200, description: 'Pregunta encontrada' })
  async obtenerPregunta(@Param('id') id: number): Promise<Pregunta> {
    return await this.preguntasService.obtenerPregunta(id);
  }
}
