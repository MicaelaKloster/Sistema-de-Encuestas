import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Respuesta } from 'src/modules/respuestas/entities/respuesta.entity';
import { RespuestaAbierta } from 'src/modules/respuestas/entities/respuesta-abierta.entity';
import { RespuestaOpcion } from 'src/modules/respuestas/entities/respuesta-opcion.entity';
import { Encuesta } from 'src/modules/encuestas/entities/encuesta.entity';
import { Pregunta } from 'src/modules/encuestas/entities/pregunta.entity';
import { Opcion } from 'src/modules/encuestas/entities/opcion.entity';
import { RegistrarRespuestasDto } from 'src/modules/respuestas/dtos/registrar-respuestas.dto';
import { TiposRespuestaEnum } from 'src/modules/encuestas/enums/tipos-respuesta.enum';
import { VisualizarRespuestasDto } from '../dtos/visualizar-respuestas.dtos';
import { PreguntaConRespuestasDto } from '../dtos/visualizar-respuestas.dtos';
import { CreateEncuestaDto } from 'src/modules/encuestas/dtos/create-encuesta.dto';

@Injectable()
export class RespuestasService {
  constructor(
    @InjectRepository(Respuesta)
    private respuestaRepository: Repository<Respuesta>,
    @InjectRepository(RespuestaAbierta)
    private respuestaAbiertaRepository: Repository<RespuestaAbierta>,
    @InjectRepository(RespuestaOpcion)
    private respuestaOpcionRepository: Repository<RespuestaOpcion>,
    @InjectRepository(Encuesta)
    private encuestaRepository: Repository<Encuesta>,
    @InjectRepository(Pregunta)
    private preguntaRepository: Repository<Pregunta>,
    @InjectRepository(Opcion)
    private opcionRepository: Repository<Opcion>,
  ) {}
  /**
   * Registra las respuestas de un usuario para una encuesta específica
   *
   * @param codigoParticipacion - Token UUID de participación de la encuesta
   * @param registarRespuestasDto - Objeto con las respuestas del usuario
   * @param encuestaId - ID opcional de la encuesta para validación adicional
   * @throws NotFoundException - Si la encuesta no existe o el token es inválido
   * @throws BadRequestException - Si faltan respuestas obligatorias o son inválidas
   */
  async registrarRespuestas(
    codigoParticipacion: string,
    registarRespuestasDto: RegistrarRespuestasDto,
    encuestaId?: number,
  ): Promise<void> {
    // Validar que el DTO de respuestas no esté vacío
    if (
      !registarRespuestasDto.respuestas ||
      registarRespuestasDto.respuestas.length === 0
    ) {
      throw new BadRequestException('No se proporcionaron respuestas');
    }

    // Construir la condición de búsqueda con un tipo específico
    const whereCondition: {
      codigoRespuesta: string;
      habilitada: boolean;
      id?: number;
    } = {
      codigoRespuesta: codigoParticipacion,
      habilitada: true,
    };

    // Si se proporciona el ID de la encuesta, añadirlo a la condición
    if (encuestaId) {
      whereCondition.id = encuestaId;
    }

    const encuesta = await this.encuestaRepository.findOne({
      where: whereCondition,
      relations: ['preguntas', 'preguntas.opciones'],
    });

    if (!encuesta) {
      throw new NotFoundException('Encuesta no encontrada o enlace inválido');
    }

    // Validar si la encuesta ha vencido
    if (encuesta.fechaVencimiento) {
      const ahora = new Date();
      const fechaVencimiento = new Date(encuesta.fechaVencimiento);

      console.log('Validando fecha de vencimiento en registrarRespuestas:');
      console.log('Fecha actual:', ahora.toISOString());
      console.log('Fecha vencimiento:', fechaVencimiento.toISOString());
      console.log('¿Está vencida?:', fechaVencimiento < ahora);

      if (fechaVencimiento < ahora) {
        throw new BadRequestException(
          'La encuesta ha vencido y ya no acepta respuestas',
        );
      }
    }

    const preguntasObligatorias = encuesta.preguntas;
    const preguntasRespondidas = registarRespuestasDto.respuestas.map(
      (r) => r.id_pregunta,
    );

    // Verificar si todas las preguntas obligatorias están respondidas
    const preguntasFaltantes = preguntasObligatorias.filter(
      (p) => !preguntasRespondidas.includes(p.id),
    );

    if (preguntasFaltantes.length > 0) {
      throw new BadRequestException(
        `Debe responder todas las preguntas obligatorias. Faltan las preguntas: ${preguntasFaltantes.map((p) => p.numero).join(', ')}`,
      );
    }

    // Crear una nueva respuesta vinculada a la encuesta
    const respuesta = this.respuestaRepository.create({
      id_encuesta: encuesta.id,
    });
    const respuestaGuardada = await this.respuestaRepository.save(respuesta);

    for (const respuestaPregunta of registarRespuestasDto.respuestas) {
      const pregunta = await this.preguntaRepository.findOne({
        where: {
          id: respuestaPregunta.id_pregunta,
          encuesta: { id: encuesta.id },
        },
      });

      if (!pregunta) {
        throw new BadRequestException(
          `Pregunta ${respuestaPregunta.id_pregunta} no encontrada o no pertenece a la encuesta`,
        );
      }

      if (respuestaPregunta.tipo === TiposRespuestaEnum.ABIERTA) {
        if (!respuestaPregunta.texto) {
          throw new BadRequestException(
            'Respuesta de texto requerida para preguntas abiertas',
          );
        }

        const respuestasAbiertas = this.respuestaAbiertaRepository.create({
          texto: respuestaPregunta.texto,
          id_pregunta: pregunta.id,
          id_respuesta: respuestaGuardada.id,
        });
        await this.respuestaAbiertaRepository.save(respuestasAbiertas);
      } else if (
        respuestaPregunta.tipo === TiposRespuestaEnum.VERDADERO_FALSO
      ) {
        if (
          !respuestaPregunta.opciones ||
          respuestaPregunta.opciones.length !== 1
        ) {
          throw new BadRequestException(
            'Debe seleccionar exactamente una opción (Verdadero o Falso)',
          );
        }

        // Verificar que la opción seleccionada pertenece a la pregunta
        const opcion = await this.opcionRepository.findOne({
          where: {
            id: respuestaPregunta.opciones[0],
            pregunta: { id: pregunta.id },
          },
        });

        if (!opcion) {
          throw new BadRequestException(
            `Opción seleccionada no válida para esta pregunta de Verdadero/Falso`,
          );
        }

        const respuestaOpcion = this.respuestaOpcionRepository.create({
          id_respuesta: respuestaGuardada.id,
          id_opcion: respuestaPregunta.opciones[0],
        });
        await this.respuestaOpcionRepository.save(respuestaOpcion);
      } else {
        if (
          !respuestaPregunta.opciones ||
          respuestaPregunta.opciones.length === 0
        ) {
          throw new BadRequestException(
            'Al menos una opcion debe ser seleccionada',
          );
        }

        if (
          pregunta.tipo ===
            TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE &&
          respuestaPregunta.opciones.length > 1
        ) {
          throw new BadRequestException(
            'Solo se permite una seleccion para este tipo de pregunta',
          );
        }

        for (const idOpcion of respuestaPregunta.opciones) {
          const opcion = await this.opcionRepository.findOne({
            where: {
              id: idOpcion,
              pregunta: { id: pregunta.id },
            },
          });

          if (!opcion) {
            // Obtener todas las opciones disponibles para esta pregunta para depuración
            const opcionesDisponibles = await this.opcionRepository.find({
              where: { pregunta: { id: pregunta.id } },
              select: ['id', 'texto', 'numero'],
            });

            console.log(
              `Error: Opción ${idOpcion} no encontrada para la pregunta ${pregunta.id}`,
            );
            console.log(
              'Opciones disponibles para esta pregunta:',
              opcionesDisponibles,
            );

            throw new BadRequestException(
              `Opcion ${idOpcion} no encontrada o no pertenece a esta pregunta. Opciones disponibles: ${JSON.stringify(opcionesDisponibles)}`,
            );
          }
          const respuestaOpcion = this.respuestaOpcionRepository.create({
            id_respuesta: respuestaGuardada.id,
            id_opcion: idOpcion,
          });
          await this.respuestaOpcionRepository.save(respuestaOpcion);
        }
      }
    }
  }
  /**
   * Obtiene las respuestas registradas de una encuesta específica para visualizarlas
   *
   * @param codigoVisualizacion - Token UUID para visualizar los resultados
   * @returns Objeto DTO con toda la información de la encuesta y sus respuestas
   * @throws NotFoundException - Si la encuesta no existe o el token es inválido
   */
  async visualizarRespuestasDto(
    codigoVisualizacion: string,
  ): Promise<VisualizarRespuestasDto> {
    // Busca la encuesta con el código de visualización
    const encuesta = await this.encuestaRepository.findOne({
      where: { codigoResultados: codigoVisualizacion },
      relations: ['preguntas', 'preguntas.opciones'],
    });

    if (!encuesta) {
      throw new NotFoundException('Encuesta no encontrada o enlace inválido');
    }

    // Construir el objeto
    const resultado: VisualizarRespuestasDto = {
      id: encuesta.id,
      nombre: encuesta.nombre,
      codigoRespuesta: encuesta.codigoRespuesta,
      codigoResultados: encuesta.codigoResultados,
      habilitada: encuesta.habilitada,
      preguntas: [],
    };
    //itera sobre las preguntas de la encuesta
    for (const pregunta of encuesta.preguntas) {
      const preguntaConRespuestas = new PreguntaConRespuestasDto(); //crea un dto de la pregunta.

      preguntaConRespuestas.id = pregunta.id;
      preguntaConRespuestas.numero = pregunta.numero;
      preguntaConRespuestas.texto = pregunta.texto;
      preguntaConRespuestas.tipo = pregunta.tipo;
      // Inicializar las listas de opciones y respuestas abiertas
      preguntaConRespuestas.opciones = [];
      preguntaConRespuestas.respuestas_abiertas = [];
      //obtiene las preguntas abiertas
      if (pregunta.tipo === TiposRespuestaEnum.ABIERTA) {
        const respuestasAbiertas = await this.respuestaAbiertaRepository.find({
          where: { id_pregunta: pregunta.id },
        });
        preguntaConRespuestas.respuestas_abiertas = respuestasAbiertas.map(
          (r) => r.texto,
        );
      }

      if (pregunta.opciones && pregunta.opciones.length > 0) {
        for (const opcion of pregunta.opciones) {
          // cuenta cuantas veces fue seleccionada cada opcion
          const cantidadRespuestas = await this.respuestaOpcionRepository.count(
            {
              where: { id_opcion: opcion.id }, 
            },
          );

          //  Añade la opción con la cantidad de respuestas al DTO

          preguntaConRespuestas.opciones.push({
            id: opcion.id,
            texto: opcion.texto,
            numero: opcion.numero,
            cantidad_respuestas: cantidadRespuestas,
          });
        }
      }

      resultado.preguntas.push(preguntaConRespuestas); //Añade la pregunta con sus respuestas al resultado final
    }

    return resultado;
  }
  /**
   * Obtiene la estructura de una encuesta para participación
   *
   * @param id - ID numérico de la encuesta
   * @param codigoParticipacion - Token UUID de participación
   * @returns Objeto DTO con la estructura de la encuesta para participar
   * @throws NotFoundException - Si la encuesta no existe o el token es inválido
   * @throws BadRequestException - Si la encuesta ha vencido
   */
  async obtenerEncuestaParaParticipacion(
    id: number,
    codigoParticipacion: string,
  ): Promise<CreateEncuestaDto> {
    // Buscar la encuesta por ID y código de participación
    const encuesta = await this.encuestaRepository.findOne({
      where: { id, codigoRespuesta: codigoParticipacion, habilitada: true },
      relations: ['preguntas', 'preguntas.opciones'],
    });

    if (!encuesta) {
      throw new NotFoundException(
        'Encuesta no encontrada o código de participación inválido',
      );
    }

    // Validar si la encuesta ha vencido
    if (encuesta.fechaVencimiento) {
      const ahora = new Date();
      const fechaVencimiento = new Date(encuesta.fechaVencimiento);

      console.log(
        'Validando fecha de vencimiento en obtenerEncuestaParaParticipacion:',
      );
      console.log('Fecha actual:', ahora.toISOString());
      console.log('Fecha vencimiento:', fechaVencimiento.toISOString());
      console.log('¿Está vencida?:', fechaVencimiento < ahora);

      if (fechaVencimiento < ahora) {
        throw new BadRequestException(
          'La encuesta ha vencido y ya no está disponible',
        );
      }
    }

    // Convertir la entidad `Encuesta` a `CreateEncuestaDto`
    return {
      nombre: encuesta.nombre,
      preguntas: encuesta.preguntas.map((pregunta) => ({
        numero: pregunta.numero,
        texto: pregunta.texto,
        tipo: pregunta.tipo,
        opciones: pregunta.opciones.map((opcion) => ({
          id: opcion.id,
          texto: opcion.texto,
          numero: opcion.numero,
        })),
      })),
    };
  }
}

// Guardamos respuestas de una encuesta anónima (registrarRespuestas).
// Visualizamos los resultados de una encuesta (visualizarRespuestasDto).
// Obtenemos los datos de una encuesta habilitada para que alguien pueda participar (obtenerEncuestaParaParticipacion).
