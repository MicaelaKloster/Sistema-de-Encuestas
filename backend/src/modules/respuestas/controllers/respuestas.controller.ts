// Importamos los decoradores y herramientas necesarias del framework NestJS.
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
// Importamos un DTO (estructura de datos) que representa una encuesta (para cuando devolvemos datos al frontend).
import { CreateEncuestaDto } from 'src/modules/encuestas/dtos/create-encuesta.dto';
// Servicio donde está la lógica principal para manejar respuestas (guardar, recuperar, etc).
import { RespuestasService } from 'src/modules/respuestas/services/respuestas.service';
// DTO que representa los datos que el usuario envía cuando responde una encuesta.
import { RegistrarRespuestasDto } from 'src/modules/respuestas/dtos/registrar-respuestas.dto';
// DTO que representa cómo se mostrarán las respuestas cuando alguien quiera ver los resultados.
import { VisualizarRespuestasDto } from 'src/modules/respuestas/dtos/visualizar-respuestas.dtos';
// Herramientas para documentar la API con Swagger (permite visualizar y probar la API en el navegador).
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
// Etiqueta que agrupa las rutas de este controlador bajo el nombre "respuestas" en Swagger.
@ApiTags('respuestas')
// Este controlador maneja las rutas relacionadas a respuestas de encuestas.
@Controller('respuestas')
export class RespuestasController {
  // Inyectamos el servicio de respuestas para poder usar sus funciones.
  constructor(private readonly respuestasService: RespuestasService) {}

  /**
   * Ruta POST que permite guardar las respuestas de una encuesta específica.
   * Se espera recibir el ID de la encuesta y un token que valida la participación.
   * También se reciben las respuestas del usuario en el cuerpo de la solicitud.
   *
   * Desde Angular: se hace una solicitud POST a `/respuestas/{id}/{tokenParticipacion}`
   *     - Se deben enviar las respuestas en formato JSON dentro del body (conforme al DTO).
   *     - Si sale bien, devuelve un mensaje: "Respuestas registradas exitosamente".
   */

  @Post(':id/:tokenParticipacion')
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

  /**
   * Ruta GET para visualizar los resultados de una encuesta.
   * Se accede mediante un "token de visualización" que da acceso a los resultados.
   *
   *  Desde Angular: se realiza una solicitud GET a `/respuestas/resultados/{tokenVisualizacion}`
   *     - Devuelve los resultados estructurados listos para ser mostrados en gráficos o tablas.
   */

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
