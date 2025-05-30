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

  /**
   * Registra las respuestas de un usuario para una encuesta específica
   * 
   * Este endpoint permite guardar las respuestas proporcionadas por un usuario
   * para una encuesta identificada por su ID y token de participación.
   * Valida que todas las preguntas obligatorias estén respondidas y que
   * las respuestas sean del tipo correcto para cada pregunta.
   */
  @Post('participar/:id/:tokenParticipacion')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Registrar respuestas de una encuesta',
    description: 'Guarda las respuestas de un usuario para una encuesta específica. Requiere el ID de la encuesta y el token de participación.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID numérico de la encuesta',
    example: '1',
    required: true,
  })
  @ApiParam({
    name: 'tokenParticipacion',
    description: 'Token UUID de participación de la encuesta',
    example: 'abc123def456',
    required: true,
  })
  @ApiBody({ 
    type: RegistrarRespuestasDto,
    description: 'Objeto con las respuestas del usuario para cada pregunta de la encuesta'
  })
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
    description: 'Datos de respuesta inválidos o incompletos',
  })
  async registrarRespuestas(
    @Param('id', ParseIntPipe) id: number,
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

  /**
   * Obtiene los resultados de una encuesta usando el token de visualización
   * 
   * Este endpoint permite consultar todas las respuestas recopiladas para una encuesta
   * utilizando el token de visualización proporcionado al crear la encuesta.
   * Incluye estadísticas como el número de respuestas por opción.
   */
  @Get('resultados/:tokenVisualizacion')
  @ApiOperation({ 
    summary: 'Visualizar respuestas de una encuesta',
    description: 'Obtiene todas las respuestas recopiladas para una encuesta usando el token de visualización.'
  })
  @ApiParam({
    name: 'tokenVisualizacion',
    description: 'Token UUID para visualizar los resultados de la encuesta',
    example: 'xyz789uvw012',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Respuestas obtenidas exitosamente',
    type: VisualizarRespuestasDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Encuesta no encontrada o token de visualización inválido',
  })
  async visualizarRespuestas(
    @Param('tokenVisualizacion') tokenVisualizacion: string,
  ): Promise<{ message: string; data: VisualizarRespuestasDto }> {
    const resultado =
      await this.respuestasService.visualizarRespuestasDto(tokenVisualizacion);
    return { message: 'Éxito', data: resultado };
  }
  
  /**
   * Obtiene la estructura de una encuesta para participación
   * 
   * Este endpoint devuelve la estructura completa de una encuesta para que
   * un usuario pueda participar en ella, incluyendo todas sus preguntas y opciones.
   */
  @Get('participar/:id/:tokenParticipacion')
  @ApiOperation({ 
    summary: 'Obtener encuesta para participación',
    description: 'Devuelve la estructura completa de una encuesta para que un usuario pueda participar.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID numérico de la encuesta',
    example: '1',
    required: true,
  })
  @ApiParam({
    name: 'tokenParticipacion',
    description: 'Token UUID de participación de la encuesta',
    example: 'abc123def456',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Encuesta obtenida exitosamente',
    type: CreateEncuestaDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Encuesta no encontrada o token inválido',
  })
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
