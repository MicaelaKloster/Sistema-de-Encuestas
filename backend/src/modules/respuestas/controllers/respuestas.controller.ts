import {
  Controller,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { RespuestasService } from 'src/modules/respuestas/services/respuestas.service';
import { RegistrarRespuestasDto } from 'src/modules/respuestas/dtos/registrar-respuestas.dto';
import { VisualizarRespuestasDto } from '../dtos/visualizar-respuestas.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('respuestas')
@Controller('respuestas')
export class RespuestasController {
  constructor(private readonly respuestasService: RespuestasService) {}

  @Post(':id/:tokenParticipacion') // Permite registrar respuestas para una encuesta específica.
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar respuestas de una encuesta' })
  @ApiParam({
    name: 'id',
    description: 'ID de la encuesta',
    example: '1',
  })
  @ApiParam({
    name: 'tokenParticipacion',
    description: 'Token de participación de la encuesta',
    example: 'abc123def456',
  })
  @ApiBody({ type: RegistrarRespuestasDto })
  @ApiResponse({
    status: 201,
    description: 'Respuestas registradas exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Encuesta no encontrada o enlace inválido',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de respuesta inválidos',
  })
  async registrarRespuestas(
    @Param('id') id: number, // Recibe el ID de la encuesta
    @Param('tokenParticipacion') tokenParticipacion: string, //Recibe el token de participación desde la URL.
    @Body() registrarRespuestasDto: RegistrarRespuestasDto, // Recibe las respuestas en el cuerpo de la solicitud.
  ): Promise<{ message: string }> {
    await this.respuestasService.registrarRespuestas(
      tokenParticipacion,
      registrarRespuestasDto,
      id,
    );
    return { message: 'Respuestas registradas exitosamente' };
  }

  @Post('participar/:id/:tokenParticipacion') // Ruta alternativa para mayor compatibilidad
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar respuestas de una encuesta (ruta alternativa)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la encuesta',
    example: '1',
  })
  @ApiParam({
    name: 'tokenParticipacion',
    description: 'Token de participación de la encuesta',
    example: 'abc123def456',
  })
  @ApiBody({ type: RegistrarRespuestasDto })
  @ApiResponse({
    status: 201,
    description: 'Respuestas registradas exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Encuesta no encontrada o enlace inválido',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de respuesta inválidos',
  })
  async registrarRespuestasAlternativa(
    @Param('id') id: number,
    @Param('tokenParticipacion') tokenParticipacion: string,
    @Body() registrarRespuestasDto: RegistrarRespuestasDto,
  ): Promise<{ message: string }> {
    await this.respuestasService.registrarRespuestas(
      tokenParticipacion,
      registrarRespuestasDto,
      id,
    );
    return { message: 'Respuestas registradas exitosamente' };
  }

  @Get('resultados/:tokenVisualizacion') //obtiene las respuestas
  @ApiOperation({ summary: 'Visualizar respuestas de una encuesta' })
  @ApiParam({
    name: 'tokenVisualizacion',
    description: 'Token de visualización de resultados',
    example: 'xyz789uvw012',
  })
  @ApiResponse({
    status: 200,
    description: 'Respuestas obtenidas exitosamente',
    type: VisualizarRespuestasDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Encuesta no encontrada o enlace inválido',
  })
  async visualizarRespuestas(
    @Param('tokenVisualizacion') tokenVisualizacion: string, //Recibe el token para visualizar los resultados.
  ): Promise<{ message: string; data: VisualizarRespuestasDto }> {
    const resultado =
      await this.respuestasService.visualizarRespuestasDto(tokenVisualizacion);
    return { message: 'Éxito', data: resultado };
  }
}
