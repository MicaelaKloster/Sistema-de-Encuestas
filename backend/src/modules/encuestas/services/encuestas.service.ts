// Importación de decoradores y excepciones de NestJS
import { BadRequestException, Injectable } from '@nestjs/common';
// Decorador para inyectar repositorios de TypeORM
import { InjectRepository } from '@nestjs/typeorm';
// Importación de la entidad Encuesta
import { Encuesta } from '../entities/encuesta.entity';
// Importación del repositorio de TypeORM
import { Repository } from 'typeorm';
// Importación del DTO para crear encuestas
import { CreateEncuestaDto } from '../dtos/create-encuesta.dto';
// Importación de la función para generar UUIDs
import { v4 } from 'uuid';
// Importación del enumerador para los tipos de código
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
import { NotFoundException } from '@nestjs/common';
import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum';
import { Respuesta } from '../../respuestas/entities/respuesta.entity';
// Importación de librería para generar QR
import * as QRCode from 'qrcode';
// Importación de papaparse para generar CSV
import * as Papa from 'papaparse';

@Injectable() // Decorador que marca esta clase como un servicio inyectable
export class EncuestasService {
  constructor(
    // Inyección del repositorio de la entidad Encuesta
    @InjectRepository(Encuesta)
    private encuestaRepository: Repository<Encuesta>,
    @InjectRepository(Respuesta)
    private respuestaRepository: Repository<Respuesta>,
  ) {}

  // Método para crear una nueva encuesta se le agrega codigo de enlace corto y codigoqr
  async crearEncuesta(dto: CreateEncuestaDto): Promise<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
    enlaceParticipacion: string;
    enlaceVisualizacion: string;
    enlaceCorto: string;
    codigoQR: string;
    fechaVencimiento?: Date;
  }> {
    for (const pregunta of dto.preguntas) {
      // FUNCIÓN EXTRA: Manejar preguntas de tipo VERDADERO_FALSO
      if (pregunta.tipo === TiposRespuestaEnum.VERDADERO_FALSO) {
        // Para preguntas de tipo VERDADERO_FALSO, generamos automáticamente las opciones
        pregunta.opciones = [
          { numero: 1, texto: 'Verdadero' },
          { numero: 2, texto: 'Falso' },
        ];
      } else if (
        pregunta.tipo !== TiposRespuestaEnum.ABIERTA &&
        (!pregunta.opciones || pregunta.opciones.length === 0)
      ) {
        throw new BadRequestException(
          `Las preguntas de opción múltiple deben tener opciones`,
        );
      }
      if (
        pregunta.tipo === TiposRespuestaEnum.ABIERTA &&
        pregunta.opciones?.length > 0
      ) {
        throw new BadRequestException(
          `Las preguntas abiertas no deben tener opciones`,
        );
      }
    }
    const codigoRespuesta = v4();
    const codigoResultados = v4();

    // Creación de una nueva instancia de Encuesta con los datos del DTO
    const encuesta: Encuesta = this.encuestaRepository.create({
      ...dto, // Copia las propiedades del DTO
      codigoRespuesta, // Genera un código único para las respuestas
      codigoResultados, // Genera un código único para los resultados
      fechaVencimiento: dto.fechaVencimiento,
    });

    // Guarda la encuesta en la base de datos
    const encuestaCreada = await this.encuestaRepository.save(encuesta);

    // Usamos APP_URL para que sea dinámico con el puerto que esté activo
    const baseUrl = process.env.APP_URL || 'http://localhost:3000';
    const apiPrefix = process.env.GLOBAL_PREFIX || 'api';
    const apiVersion = 'v1';

    // Formato: /api/v1/respuestas/participar/{id}/{codigoRespuesta}
    const enlaceParticipacion = `${baseUrl}/${apiPrefix}/${apiVersion}/respuestas/participar/${encuestaCreada.id}/${codigoRespuesta}`;

    // Formato: /api/v1/encuestas/resultados/{id}?codigo={codigoResultados}
    const enlaceVisualizacion = `${baseUrl}/${apiPrefix}/${apiVersion}/encuestas/${encuestaCreada.id}/resultados?codigo=${codigoResultados}`;

    //Generar enlace corto
    const enlaceCorto = await this.generarEnlaceCorto(enlaceParticipacion);

    //Generar QR
    const codigoQR = await this.generarCodigoQR(enlaceCorto);

    // Retorna los datos relevantes de la encuesta creada
    return {
      id: encuestaCreada.id,
      codigoRespuesta: encuestaCreada.codigoRespuesta,
      codigoResultados: encuestaCreada.codigoResultados,
      enlaceParticipacion: enlaceCorto, // usamos el enlace corto
      enlaceVisualizacion,
      enlaceCorto,
      codigoQR,
      fechaVencimiento: encuestaCreada.fechaVencimiento,
    };
  }
  async generarEnlaceCorto(url: string): Promise<string> {
    try {
      const response = await fetch(
        `http://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`,
      );
      if (!response.ok) {
        console.warn(
          `Error en la API de TinyURL: ${response.statusText}, usando URL original`,
        );
        return url; // Se retorna la URL original
      }
      return await response.text();
    } catch (error) {
      console.error(
        'Error al acortar enlace:',
        error instanceof Error ? error.message : error,
      );
      return url; // Devuelve la URL original en caso de error
    }
  }

  async generarCodigoQR(texto: string): Promise<string> {
    try {
      const qr = await QRCode.toDataURL(texto);
      return qr;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error generando QR:', error.message);
      } else {
        console.error('Error desconocido generando QR:', error);
      }
      return ''; // En caso de error, retornar cadena vacía
    }
  }
  // Método para obtener una encuesta por su ID y un código específico
  async obtenerEncuesta(
    id: number, // ID de la encuesta
    codigo: string, // Código de respuesta o resultados
    codigoTipo: CodigoTipoEnum.RESPUESTA | CodigoTipoEnum.RESULTADOS, // Tipo de código
  ): Promise<Encuesta> {
    // Construcción de la consulta para obtener la encuesta
    const query = this.encuestaRepository
      .createQueryBuilder('encuesta') // Alias para la tabla Encuesta
      .innerJoinAndSelect('encuesta.preguntas', 'pregunta') // Une las preguntas relacionadas
      .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion') // Une las opciones de las preguntas
      .where('encuesta.id = :id', { id }) // Filtra por el ID de la encuesta
      .andWhere('encuesta.habilitada = true');
    // Filtra según el tipo de código proporcionado
    switch (codigoTipo) {
      case CodigoTipoEnum.RESPUESTA:
        query.andWhere('encuesta.codigoRespuesta = :codigo', { codigo });
        break;

      case CodigoTipoEnum.RESULTADOS:
        query.andWhere('encuesta.codigoResultados = :codigo', { codigo });
        break;
    }

    // Ordena las preguntas y opciones por su número
    query.orderBy('pregunta.numero', 'ASC');
    query.addOrderBy('preguntaOpcion.numero', 'ASC');

    // Ejecuta la consulta y obtiene la encuesta
    const encuesta = await query.getOne();

    // Si no se encuentra la encuesta, lanza una excepción
    if (!encuesta) {
      throw new BadRequestException('Datos de encuesta no válidos');
    }

    // Validar fecha de vencimiento si existe
    if (encuesta.fechaVencimiento && encuesta.fechaVencimiento < new Date()) {
      throw new BadRequestException(
        'La encuesta ha vencido y ya no está disponible',
      );
    }

    // Retorna la encuesta encontrada
    return encuesta;
  }
  async obtenerResultados(id: number, codigoResultados: string): Promise<any> {
    // Verificar primero que el código sea válido
    const encuesta = await this.encuestaRepository.findOne({
      where: { id, codigoResultados: codigoResultados, habilitada: true },
      relations: [
        'preguntas',
        'preguntas.opciones',
        'respuestas',
        'respuestas.respuestasAbiertas',
        'respuestas.respuestasOpciones',
        'respuestas.respuestasOpciones.opcion',
      ],
    });

    if (!encuesta) {
      throw new NotFoundException('Encuesta no encontrada o código inválido');
    }

    // Procesar resultados
    const resultados = encuesta.preguntas.map((pregunta) => {
      if (pregunta.tipo === TiposRespuestaEnum.ABIERTA) {
        const respuestasTexto = encuesta.respuestas
          .flatMap((r) => r.respuestasAbiertas)
          .filter((ra) => ra.id_pregunta === pregunta.id)
          .map((ra) => ra.texto);

        return {
          pregunta: pregunta.texto,
          tipo: 'ABIERTA',
          respuestas: respuestasTexto,
        };
      } else if (pregunta.tipo === TiposRespuestaEnum.VERDADERO_FALSO) {
        // Para preguntas de tipo VERDADERO_FALSO, procesamos de manera similar a las de opción múltiple
        const opcionesConteo = pregunta.opciones.map((opcion) => {
          const conteo = encuesta.respuestas
            .flatMap((r) => r.respuestasOpciones)
            .filter((ro) => ro.opcion?.id === opcion.id).length;

          return {
            id: opcion.id,
            opcion: opcion.texto,
            conteo,
          };
        });

        return {
          pregunta: pregunta.texto,
          tipo: TiposRespuestaEnum.VERDADERO_FALSO,
          opciones: opcionesConteo,
        };
      } else {
        const opcionesConteo = pregunta.opciones.map((opcion) => {
          const conteo = encuesta.respuestas
            .flatMap((r) => r.respuestasOpciones)
            .filter((ro) => ro.opcion?.id === opcion.id).length;

          return {
            id: opcion.id,
            opcion: opcion.texto,
            conteo,
          };
        });

        return {
          pregunta: pregunta.texto,
          tipo: pregunta.tipo,
          opciones: opcionesConteo,
        };
      }
    });

    return {
      encuesta: encuesta.nombre,
      totalRespuestas: encuesta.respuestas.length,
      resultados,
    };
  }
  // Funcionalidad Extra para deshabilitar una encuesta (MICA)
  async actualizarEstadoEncuesta(
    id: number,
    habilitada: boolean,
  ): Promise<{ mensaje: string }> {
    // Busca la encuesta por su ID
    const encuesta = await this.encuestaRepository.findOne({ where: { id } });

    // Si no se encuentra la encuesta, lanza una excepción
    if (!encuesta) {
      throw new BadRequestException('Encuesta no encontrada');
    }

    // Actualiza el estado de la encuesta
    encuesta.habilitada = habilitada;
    await this.encuestaRepository.save(encuesta);

    // Retorna un mensaje de éxito
    return {
      mensaje: `La encuesta fue ${habilitada ? 'habilitada' : 'deshabilitada'} correctamente`,
    };
  }

  // Método para obtener una encuesta por su código de respuesta
  async obtenerEncuestaPorCodigo(
    codigo: string,
    codigoTipo: CodigoTipoEnum.RESPUESTA | CodigoTipoEnum.RESULTADOS,
  ): Promise<Encuesta> {
    // Determinar qué campo usar según el tipo de código
    const whereCondition =
      codigoTipo === CodigoTipoEnum.RESPUESTA
        ? { codigoRespuesta: codigo, habilitada: true }
        : { codigoResultados: codigo, habilitada: true };

    // Buscar la encuesta que tenga este código
    const encuesta = await this.encuestaRepository.findOne({
      where: whereCondition,
      relations: ['preguntas', 'preguntas.opciones'],
    });

    if (!encuesta) {
      throw new BadRequestException('Código de encuesta no válido');
    }

    if (encuesta.fechaVencimiento && encuesta.fechaVencimiento < new Date()) {
      throw new BadRequestException(
        'La encuesta ha vencido y ya no está disponible',
      );
    }

    // Ordenar las preguntas y opciones
    encuesta.preguntas.sort((a, b) => a.numero - b.numero);
    encuesta.preguntas.forEach((pregunta) => {
      if (pregunta.opciones) {
        pregunta.opciones.sort((a, b) => a.numero - b.numero);
      }
    });

    return encuesta;
  }

  // Funcionalidad extra para generar un CSV (Emilia)

  async resultadosCSV(id: number, codigoResultados: string): Promise<string> {
    // Obtiene los resultados de la encuesta validando el código de resultados
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const resultados = await this.obtenerResultados(id, codigoResultados);

    // Si no se encuentran resultados, arroja una excepción
    if (!resultados) {
      throw new NotFoundException('No se encontraron resultados');
    }

    const filas: any[] = []; // Guarda los datos en formato fila para el CSV

    // Recorre cada pregunta para armar las filas
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    resultados.resultados.forEach((pregunta: any) => {
      // Si la pregunta es abierta, se agregan todas las respuestas individuales como filas
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (pregunta.tipo === 'ABIERTA') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        pregunta.respuestas.forEach((textoRespuesta: string) => {
          filas.push({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            Pregunta: pregunta.pregunta,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            Tipo: pregunta.tipo,
            Respuesta: textoRespuesta,
          });
        });
      } else {
        // Si la pregunta es de opción, se agregan las opciones con la cantidad de respuestas
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        pregunta.opciones.forEach((opcion: any) => {
          filas.push({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            Pregunta: pregunta.pregunta,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            Tipo: pregunta.tipo,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            Opcion: opcion.opcion,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            'Cantidad Respuestas': opcion.conteo,
          });
        });
      }
    });

    // Convierte las filas a formato csv utilizando papaparse
    const csv = Papa.unparse(filas, {
      quotes: true,
      delimiter: ';',
      header: true,
      newline: '\r\n',
    });

    // Retorna el CSV
    return '\uFEFF' + csv;
  }
}
