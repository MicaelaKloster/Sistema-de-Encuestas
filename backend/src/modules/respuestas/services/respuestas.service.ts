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

  async registrarRespuestas(
    codigoParticipacion: string,
    registarRespuestasDto: RegistrarRespuestasDto,
  ): Promise<void> {
    const encuesta = await this.encuestaRepository.findOne({
      where: { codigoRespuesta: codigoParticipacion },
    });

    if (!encuesta) {
      throw new NotFoundException('Encuesta no encontrada o enlace invalido');
    }

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
          pregunta.tipo_respuesta ===
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
            throw new BadRequestException(
              `Opcion ${idOpcion} no encontrada o no pertenece a esta pregunta`,
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
}
