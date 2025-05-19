import { Controller, Post, Get, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { RespuestasService } from '../../respuestas/services/respuestas.service';
import { RegistrarRespuestasDto } from './dto/registrar-respuestas.dto';
import { VisualizarRespuestasDto } from './dto/visualizar-respuestas.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';



 @Get('resultados/:tokenVisualizacion') 
  @ApiOperation({ summary: 'Visualizar respuestas de una encuesta' })
  @ApiParam({ 
    name: 'tokenVisualizacion', 
    description: 'Token de visualización de resultados',
    example: 'xyz789uvw012'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Respuestas obtenidas exitosamente',
    type: VisualizarRespuestasDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Encuesta no encontrada o enlace inválido' 
  })
  async visualizarRespuestas(
    @Param('tokenVisualizacion') tokenVisualizacion: string,
  ): Promise<VisualizarRespuestasDto> {
    return this.respuestasService.visualizarRespuestas(tokenVisualizacion);
  }