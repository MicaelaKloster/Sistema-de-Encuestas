// Importación de decoradores y módulos necesarios de NestJS
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
// Importación del servicio de encuestas
import { EncuestasService } from '../services/encuestas.service';
// Importación del servicio de respuestas
import { RespuestasService } from '../../respuestas/services/respuestas.service';
// Importación del DTO para crear encuestas
import { CreateEncuestaDto } from '../dtos/create-encuesta.dto';
// Importación del DTO para obtener encuestas
import { ObtenerEncuestaDto } from '../dtos/obtener-encuesta.dto';
// Importación de la entidad Encuesta
import { Encuesta } from '../entities/encuesta.entity';
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum';
import { CreateEncuestaResponseDto } from '../dtos/create-encuesta-response.dto';
import { VisualizarRespuestasDto } from '../../respuestas/dtos/visualizar-respuestas.dtos';

import { Response } from 'express';

@Controller('encuestas') // Define el controlador para manejar las rutas relacionadas con "encuestas"
export class EncuestasController {
  constructor(
    private readonly encuestasService: EncuestasService,
    private readonly respuestasService: RespuestasService,
  ) {} // Inyección de los servicios

  @Post()
  @ApiOperation({ summary: 'Crear una nueva encuesta' })
  @ApiResponse({
    status: 201,
    description: 'Encuesta creada exitosamente',
    type: CreateEncuestaResponseDto,
  }) // Define un endpoint POST para crear una nueva encuesta
  async crearEncuesta(
    @Body() dto: CreateEncuestaDto,
  ): Promise<CreateEncuestaResponseDto> {
    // Crea la encuesta utilizando el servicio
    const encuesta = await this.encuestasService.crearEncuesta(dto);

    //  Generar enlace corto
    const enlaceCorto = await this.encuestasService.generarEnlaceCorto(
      encuesta.enlaceParticipacion,
    );

    //  Generar código QR
    const codigoQR = await this.encuestasService.generarCodigoQR(enlaceCorto);

    return {
      ...encuesta,
      enlaceParticipacion: enlaceCorto, // Se reemplaza el enlace con la versión corta
      codigoQR, // Se añade el código QR
    };
  }

  @Get(':id') // Define un endpoint GET para obtener una encuesta por su ID
  async obtenerEncuesta(
    @Param('id') id: number, // Obtiene el parámetro "id" de la URL
    @Query() dto: ObtenerEncuestaDto, // Obtiene los parámetros de consulta (query params)
  ): Promise<Encuesta> {
    // Llama al servicio para obtener la encuesta y la retorna
    return await this.encuestasService.obtenerEncuesta(
      id,
      dto.codigo, // Código de respuesta o resultados
      dto.tipo, // Tipo de código (respuesta o resultados)
    );
  }

  @Get('participar/:id/:codigo')
  @ApiOperation({ summary: 'Obtener encuesta para participación' })
  @ApiParam({
    name: 'id',
    description: 'ID de la encuesta',
    example: '1',
  })
  @ApiParam({
    name: 'codigo',
    description: 'Código de participación de la encuesta',
    example: 'abc123def456',
  })
  async obtenerEncuestaParaParticipar(
    @Param('id') id: number,
    @Param('codigo') codigo: string,
  ): Promise<any> {
    const encuesta = await this.encuestasService.obtenerEncuesta(
      id,
      codigo,
      CodigoTipoEnum.RESPUESTA,
    );
    // Transformar la respuesta para incluir explícitamente los IDs
    return {
      id: encuesta.id,
      nombre: encuesta.nombre,
      preguntas: encuesta.preguntas.map((pregunta) => ({
        id: pregunta.id,
        numero: pregunta.numero,
        texto: pregunta.texto,
        tipo: pregunta.tipo,
        opciones: pregunta.opciones
          ? pregunta.opciones.map((opcion) => ({
              id: opcion.id,
              numero: opcion.numero,
              texto: opcion.texto,
            }))
          : [],
      })),
    };
  }

  @Get('participar/:codigo')
  @ApiOperation({
    summary: 'Obtener encuesta para participación',
  })
  @ApiParam({
    name: 'codigo',
    description: 'Código de participación de la encuesta',
    example: 'abc123def456',
  })
  async obtenerEncuestaParaParticiparLegacy(
    @Param('codigo') codigo: string,
  ): Promise<any> {
    const encuesta = await this.encuestasService.obtenerEncuestaPorCodigo(
      codigo,
      CodigoTipoEnum.RESPUESTA,
    );

    // Transformar la respuesta para incluir explícitamente los IDs
    return {
      id: encuesta.id,
      nombre: encuesta.nombre,
      preguntas: encuesta.preguntas.map((pregunta) => ({
        id: pregunta.id,
        numero: pregunta.numero,
        texto: pregunta.texto,
        tipo: pregunta.tipo,
        opciones: pregunta.opciones
          ? pregunta.opciones.map((opcion) => ({
              id: opcion.id,
              numero: opcion.numero,
              texto: opcion.texto,
            }))
          : [],
      })),
    };
  }

  @Get('debug/:codigo')
  @ApiOperation({
    summary: 'Obtener información detallada de la encuesta para depuración',
  })
  @ApiParam({
    name: 'codigo',
    description:
      'Código de la encuesta (puede ser de participación o resultados)',
    example: 'abc123def456',
  })
  async obtenerEncuestaDebug(@Param('codigo') codigo: string): Promise<any> {
    // Intentar primero con código de respuesta
    try {
      const encuesta = await this.encuestasService.obtenerEncuestaPorCodigo(
        codigo,
        CodigoTipoEnum.RESPUESTA,
      );

      // Transformar la respuesta para incluir explícitamente los IDs
      const resultado = {
        id: encuesta.id,
        nombre: encuesta.nombre,
        preguntas: encuesta.preguntas.map((pregunta) => ({
          id: pregunta.id,
          numero: pregunta.numero,
          texto: pregunta.texto,
          tipo: pregunta.tipo,
          opciones: pregunta.opciones
            ? pregunta.opciones.map((opcion) => ({
                id: opcion.id,
                numero: opcion.numero,
                texto: opcion.texto,
              }))
            : [],
        })),
      };

      return resultado;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      // Si falla, intentar con código de resultados
      try {
        const encuesta = await this.encuestasService.obtenerEncuestaPorCodigo(
          codigo,
          CodigoTipoEnum.RESULTADOS,
        );

        // Transformar la respuesta para incluir explícitamente los IDs
        const resultado = {
          id: encuesta.id,
          nombre: encuesta.nombre,
          preguntas: encuesta.preguntas.map((pregunta) => ({
            id: pregunta.id,
            numero: pregunta.numero,
            texto: pregunta.texto,
            tipo: pregunta.tipo,
            opciones: pregunta.opciones
              ? pregunta.opciones.map((opcion) => ({
                  id: opcion.id,
                  numero: opcion.numero,
                  texto: opcion.texto,
                }))
              : [],
          })),
        };

        return resultado;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        throw new BadRequestException('Código de encuesta no válido');
      }
    }
  }

  @Get('resultados/:codigo')
  @ApiOperation({ summary: 'Obtener resultados de una encuesta' })
  async obtenerResultadosEncuesta(
    @Param('codigo') codigo: string,
  ): Promise<{ message: string; data: VisualizarRespuestasDto }> {
    const resultado =
      await this.respuestasService.visualizarRespuestasDto(codigo);
    return { message: 'Éxito', data: resultado };
  }

  @Get('estructura/:codigo')
  @ApiOperation({
    summary: 'Obtener estructura de la encuesta con IDs para responder',
  })
  @ApiParam({
    name: 'codigo',
    description: 'Código de participación de la encuesta',
    example: 'abc123def456',
  })
  async obtenerEstructuraEncuesta(
    @Param('codigo') codigo: string,
  ): Promise<any> {
    const encuesta = await this.encuestasService.obtenerEncuestaPorCodigo(
      codigo,
      CodigoTipoEnum.RESPUESTA,
    );

    return {
      id: encuesta.id,
      nombre: encuesta.nombre,
      codigoRespuesta: encuesta.codigoRespuesta,
      preguntas: encuesta.preguntas.map((pregunta) => ({
        id: pregunta.id,
        numero: pregunta.numero,
        texto: pregunta.texto,
        tipo: pregunta.tipo,
        opciones: pregunta.opciones
          ? pregunta.opciones.map((opcion) => ({
              id: opcion.id,
              numero: opcion.numero,
              texto: opcion.texto,
            }))
          : [],
      })),
      ejemploRespuesta: {
        respuestas: encuesta.preguntas.map((pregunta) => {
          if (pregunta.tipo === TiposRespuestaEnum.ABIERTA) {
            return {
              id_pregunta: pregunta.id,
              tipo: pregunta.tipo,
              texto: 'Ejemplo de respuesta abierta',
            };
          } else {
            return {
              id_pregunta: pregunta.id,
              tipo: pregunta.tipo,
              opciones:
                pregunta.opciones && pregunta.opciones.length > 0
                  ? [pregunta.opciones[0].id]
                  : [],
            };
          }
        }),
      },
    };
  }

  @Get(':id/resultados')
  @ApiOperation({
    summary: 'Obtener resultados de una encuesta por ID y código',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la encuesta',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Resultados obtenidos exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Encuesta no encontrada o código inválido',
  })
  async obtenerResultados(
    @Param('id') id: number,
    @Query('codigo') codigo: string,
  ): Promise<any> {
    if (!codigo) {
      throw new BadRequestException('Código de resultados requerido');
    }
    return this.encuestasService.obtenerResultados(id, codigo);
  }

  // Funcionalidad Extra para deshabilitar una encuesta (MICA)
  @Patch(':id/habilitar') // Define un endpoint PATCH para habilitar/deshabilitar una encuesta
  async cambiarEstadoEncuesta(
    @Param('id') id: number, // Obtiene el parámetro "id" de la URL
    @Body('habilitada') habilitada: boolean, // Obtiene el cuerpo de la solicitud para saber si se habilita o deshabilita
  ): Promise<{ mensaje: string }> {
    return await this.encuestasService.actualizarEstadoEncuesta(id, habilitada);
  }

  // Funcionalidad extra para generar un CSV (Emilia)
  @Get(':id/csv/:codigoResultados') // Define un endpoint GET para exportar los resultados de una encuesta en formato CSV
  async exportarResultadosCSV(
    @Param('id') id: number, // Obtiene el parámetro "id" de la URL
    @Param('codigoResultados') codigoResultados: string, // Obtiene el código único para validar el acceso a los resultados
    @Res() res: Response, // Uso de Response para enviar el archivo CSV como descarga
  ) {
    const csv = await this.encuestasService.resultadosCSV(id, codigoResultados); // Obtiene los resultados en formato CSV desde el servicio

    // Configuración de los encabezados
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="resultados_encuesta_${id}.csv"`,
    );

    res.send(csv); // Envía el contenido del archivo CSV
  }
}
