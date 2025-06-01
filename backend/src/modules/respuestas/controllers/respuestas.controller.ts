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
<<<<<<< HEAD
   * Registra las respuestas de un usuario para una encuesta específica
   * 
   * Este endpoint permite guardar las respuestas proporcionadas por un usuario
   * para una encuesta identificada por su ID y token de participación.
   * Valida que todas las preguntas obligatorias estén respondidas y que
   * las respuestas sean del tipo correcto para cada pregunta.
   */
  @Post('participar/:id/:tokenParticipacion')
=======
   * Ruta POST que permite guardar las respuestas de una encuesta específica.
   * Se espera recibir el ID de la encuesta y un token que valida la participación.
   * También se reciben las respuestas del usuario en el cuerpo de la solicitud.
   *
   * Desde Angular: se hace una solicitud POST a `/respuestas/{id}/{tokenParticipacion}`
   *     Se deben enviar las respuestas en formato JSON dentro del body (conforme al DTO).
   *     Si sale bien, devuelve un mensaje: "Respuestas registradas exitosamente".
   */

  @Post(':id/:tokenParticipacion')
>>>>>>> 9bb63b403286e5bcc76335fd2fae72268e2bd0e2
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
<<<<<<< HEAD
    @Param('id', ParseIntPipe) id: number,
    @Param('tokenParticipacion') tokenParticipacion: string,
    @Body() registrarRespuestasDto: RegistrarRespuestasDto,
=======
    @Param('id', ParseIntPipe) id: number, // Recibe el ID de la encuesta
    @Param('tokenParticipacion') tokenParticipacion: string, //Recibe el token de participación desde la URL.
    @Body() registrarRespuestasDto: RegistrarRespuestasDto, // Recibe las respuestas en el cuerpo de la solicitud.
>>>>>>> 9bb63b403286e5bcc76335fd2fae72268e2bd0e2
  ): Promise<{ message: string }> {
    await this.respuestasService.registrarRespuestas(
      tokenParticipacion,
      registrarRespuestasDto,
      id,
    );
    return { message: 'Respuestas registradas exitosamente' };
  }
<<<<<<< HEAD
=======

  /**
   * Ruta GET para visualizar los resultados de una encuesta.
   * Se accede mediante un "token de visualización" que da acceso a los resultados.
   *
   *  Desde Angular: se realiza una solicitud GET a `/respuestas/resultados/{tokenVisualizacion}`
   *     - Devuelve los resultados estructurados listos para ser mostrados en gráficos o tablas.
   */
>>>>>>> 9bb63b403286e5bcc76335fd2fae72268e2bd0e2

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
