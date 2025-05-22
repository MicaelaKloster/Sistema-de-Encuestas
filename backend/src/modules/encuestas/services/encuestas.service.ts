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

@Injectable() // Decorador que marca esta clase como un servicio inyectable
export class EncuestasService {
  constructor(
    // Inyección del repositorio de la entidad Encuesta
    @InjectRepository(Encuesta)
    private encuestaRepository: Repository<Encuesta>,
    @InjectRepository(Respuesta)
    private respuestaRepository: Repository<Respuesta>,
  ) {}

  // Método para crear una nueva encuesta
  async crearEncuesta(dto: CreateEncuestaDto): Promise<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
  }> {
    for (const pregunta of dto.preguntas) {
      if (
        pregunta.tipo_respuesta !== TiposRespuestaEnum.ABIERTA &&
        (!pregunta.opciones || pregunta.opciones.length === 0)
      ) {
        throw new BadRequestException(
          `Las preguntas de opción múltiple deben tener opciones`,
        );
      }
    }
    // Creación de una nueva instancia de Encuesta con los datos del DTO
    const encuesta: Encuesta = this.encuestaRepository.create({
      ...dto, // Copia las propiedades del DTO
      codigoRespuesta: v4(), // Genera un código único para las respuestas
      codigoResultados: v4(), // Genera un código único para los resultados
    });

    // Guarda la encuesta en la base de datos
    const encuestaCreada = await this.encuestaRepository.save(encuesta);

    // Retorna los datos relevantes de la encuesta creada
    return {
      id: encuestaCreada.id,
      codigoRespuesta: encuestaCreada.codigoRespuesta,
      codigoResultados: encuestaCreada.codigoResultados,
    };
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

    // Retorna la encuesta encontrada
    return encuesta;
  }
  async obtenerResultados(id: number, codigoResultados: string): Promise<any> {
    // Verificar primero que el código sea válido
    const encuesta = await this.encuestaRepository.findOne({
      where: { id, codigoResultados: codigoResultados },
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
      if (pregunta.tipo_respuesta === TiposRespuestaEnum.ABIERTA) {
        const respuestasTexto = encuesta.respuestas
          .flatMap((r) => r.respuestasAbiertas)
          .filter((ra) => ra.id_pregunta === pregunta.id)
          .map((ra) => ra.texto);

        return {
          pregunta: pregunta.texto,
          tipo: 'ABIERTA',
          respuestas: respuestasTexto,
        };
      } else {
        const opcionesConteo = pregunta.opciones.map((opcion) => {
          const conteo = encuesta.respuestas
            .flatMap((r) => r.respuestasOpciones)
            .filter((ro) => ro.opcion?.id === opcion.id).length;

          return {
            opcion: opcion.texto,
            conteo,
          };
        });

        return {
          pregunta: pregunta.texto,
          tipo: pregunta.tipo_respuesta,
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
}
