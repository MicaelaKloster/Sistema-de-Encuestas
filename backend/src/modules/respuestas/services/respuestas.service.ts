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
import { VisualizarRespuestasDto } from '../dtos/visualizar-respuestas.dto';
import { PreguntaConRespuestasDto } from '../dtos/visualizar-respuestas.dto';

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
  //recibe las respuestas de un usuario que ha participado en una encuesta y las guarda en la base de datos
  async registrarRespuestas(
    codigoParticipacion: string,
    registarRespuestasDto: RegistrarRespuestasDto,
    encuestaId?: number,
  ): Promise<void> {
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
      where: whereCondition, //busca la encuesta con el codigo de participacion y opcionalmente el ID
      relations: ['preguntas', 'preguntas.opciones'],
    });

    if (!encuesta) {
      throw new NotFoundException('Encuesta no encontrada o enlace invalido'); //sino existe el codigo mensaje de error
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
      console.log(
        'Preguntas obligatorias:',
        preguntasObligatorias.map((p) => p.id),
      );
      console.log('Preguntas respondidas:', preguntasRespondidas);
      console.log(
        'Preguntas faltantes:',
        preguntasFaltantes.map((p) => p.id),
      );
      // Imprimir información detallada de las preguntas y opciones
      encuesta.preguntas.forEach((pregunta) => {
        console.log(
          `Pregunta ID: ${pregunta.id}, Número: ${pregunta.numero}, Texto: "${pregunta.texto}"`,
        );
        if (pregunta.opciones && pregunta.opciones.length > 0) {
          console.log('Opciones:');
          pregunta.opciones.forEach((opcion) => {
            console.log(
              `  Opción ID: ${opcion.id}, Número: ${opcion.numero}, Texto: "${opcion.texto}"`,
            );
          });
        }
      });

      throw new BadRequestException(
        `Debe responder todas las preguntas obligatorias. Faltan las preguntas: ${preguntasFaltantes.map((p) => p.numero).join(', ')}`,
      );
    }
    //crea una nueva respuesta vinculada a la encuesta
    const respuesta = this.respuestaRepository.create({
      id_encuesta: encuesta.id,
    });
    const respuestaGuardada = await this.respuestaRepository.save(respuesta);

    //onst respuestaGuardada =
    //wait this.respuestaOpcionRepository.save(respuesta); //guarda las respuestas en la base de datos
    //itera sobre las respuestas enviadas

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
  // obtiene las respuestas registradas de una encuesta específica para visualizarlas.
  async visualizarRespuestasDto(
    codigoVisualizacion: string,
  ): Promise<VisualizarRespuestasDto> {
    // Busca la encuesta con el código de visualización
    const encuesta = await this.encuestaRepository.findOne({
      where: { codigoResultados: codigoVisualizacion },
      relations: ['preguntas', 'preguntas.opciones'],
    });

    if (!encuesta) {
      throw new NotFoundException('Encuesta no encontrada o enlace inválido'); //si no existe mensaje de error.
    }

    // Imprimir información detallada de las preguntas y opciones para depuración
    console.log('Información de la encuesta para depuración:');
    encuesta.preguntas.forEach((pregunta) => {
      console.log(
        `Pregunta ID: ${pregunta.id}, Número: ${pregunta.numero}, Texto: "${pregunta.texto}"`,
      );
      if (pregunta.opciones && pregunta.opciones.length > 0) {
        console.log('Opciones:');
        pregunta.opciones.forEach((opcion) => {
          console.log(
            `  Opción ID: ${opcion.id}, Número: ${opcion.numero}, Texto: "${opcion.texto}"`,
          );
        });
      }
    });

    // Construir el objeto
    const resultado: VisualizarRespuestasDto = {
      id: encuesta.id,
      nombre: encuesta.nombre,
      codigoRespuesta: encuesta.codigoRespuesta,
      codigoResultados: encuesta.codigoResultados,
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
              where: { id_opcion: opcion.id }, // Ajusta esto a tu esquema si es diferente
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

      resultado.preguntas.push(preguntaConRespuestas); //Añade la pregunta con sus respuestas al resultado fina
    }

    return resultado;
  }
}
