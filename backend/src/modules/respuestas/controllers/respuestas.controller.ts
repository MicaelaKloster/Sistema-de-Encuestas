import {
  Controller,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateEncuestaDto } from 'src/modules/encuestas/dtos/create-encuesta.dto';
import { RespuestasService } from 'src/modules/respuestas/services/respuestas.service';
import { RegistrarRespuestasDto } from 'src/modules/respuestas/dtos/registrar-respuestas.dto';
import { VisualizarRespuestasDto } from 'src/modules/respuestas/dtos/visualizar-respuestas.dtos';
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
  @Get('participar/:id/:tokenParticipacion')
  async obtenerEncuestaParaParticipacion(
    @Param('id', ParseIntPipe) id: number,
    @Param('tokenParticipacion') tokenParticipacion: string,
  ): Promise<{ message: string; data: CreateEncuestaDto }> {
    const encuesta =
      await this.respuestasService.obtenerEncuestaParaParticipacion(
        id,
        tokenParticipacion,
      );
    return { message: 'Encuesta obtenida exitosamente', data: encuesta };
  }
}

// Para registrar endpoint POST:
// Recibe un parámetro de ruta tokenParticipacion (ejemplo: /respuestas/abc123def456)
// Acepta un objeto JSON en el cuerpo de la petición que debe ajustarse al DTO RegistrarRespuestasDto
// Devuelve un código de estado 201 (CREATED) cuando la operación es exitosa
// Está completamente documentado con Swagger mediante decoradores como @ApiOperation, @ApiParam, etc.
// Maneja potenciales errores como encuesta no encontrada (404) o datos inválidos (400)
// Delega la lógica de negocio al servicio respuestasService.registrarRespuestas()
// Devuelve un mensaje de éxito con formato JSON { message: 'Respuestas registradas exitosamente' }

// * @param tokenParticipacion - Identificador único de la sesión de participación
// * @param registrarRespuestasDto - Objeto con las respuestas del usuario
// * @returns Mensaje de confirmación si la operación fue exitosa
// * @throws NotFoundException - Si la encuesta no existe o el token es inválido
// * @throws BadRequestException - Si los datos de las respuestas son inválidos
