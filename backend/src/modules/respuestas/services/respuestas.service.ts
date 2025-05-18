import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Respuesta } from '../entities/respuesta.entity';
import { RespuestaAbierta } from '../entities/respuesta-abierta.entity';
import { RespuestaOpcion } from '../entities/respuesta-opcion.entity';
import { Encuesta } from 'src/modules/encuestas/entities/encuesta.entity';
//import { Pregunta } from 'src/modules/preguntas/entities/pregunta.entity';
//import { Opcion } from '../opciones/entities/opcion.entity';
import { RegistrarRespuestasDto } from '../dtos/registrar-respuestas.dto';
//import { VisualizarRespuestasDto } from './dto/visualizar-respuestas.dto';

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
    //@InjectRepository(Pregunta)
    //private preguntaRepository: Repository<Pregunta>,
    //@InjectRepository(Opcion)
    //private opcionRepository: Repository<Opcion>,
  ) {}

  async registrarRespuestas(
    codigoParticipacion: string,
    registrarRespuestasDto: RegistrarRespuestasDto,
  ): Promise<void> {
    // Verificar que la encuesta existe
    const encuesta = await this.encuestaRepository.findOne({
      where: { codigo_respuesta: codigoParticipacion },
    });

    if (!encuesta) {
      throw new NotFoundException('Encuesta no encontrada o enlace inválido');
    }
    
    const respuesta = this.respuestaRepository.create({
      id_encuesta: encuesta.id,
    });
    const respuestaGuardada = await this.respuestaRepository.save(respuesta);

    // Procesar cada pregunta respondida
    for (const respuestaPregunta of registrarRespuestasDto.respuestas) {
      // Verificar que la pregunta existe y pertenece a la encuesta
      const pregunta = await this.preguntaRepository.findOne({
        where: { 
          id: respuestaPregunta.id_pregunta,
          id_encuesta: encuesta.id,
        },
      });

      if (!pregunta) {
        throw new BadRequestException(`Pregunta ${respuestaPregunta.id_pregunta} no encontrada o no pertenece a esta encuesta`);
      }

      // Procesar según el tipo de pregunta
      if (respuestaPregunta.tipo === 'ABIERTA') {
        if (!respuestaPregunta.texto) {
          throw new BadRequestException('Respuesta de texto requerida para pregunta abierta');
        }

        const respuestaAbierta = this.respuestaAbiertaRepository.create({
          texto: respuestaPregunta.texto,
          id_pregunta: pregunta.id,
          id_respuesta: respuestaGuardada.id,
        });
        await this.respuestaAbiertaRepository.save(respuestaAbierta);
      } else {
        // Pregunta de opción múltiple
        if (!respuestaPregunta.opciones || respuestaPregunta.opciones.length === 0) {
          throw new BadRequestException('Al menos una opción debe ser seleccionada');
        }

        // Validar que es selección simple si es necesario
        if (pregunta.tipo === 'OPCION_MULTIPLE_SELECCION_SIMPLE' && respuestaPregunta.opciones.length > 1) {
          throw new BadRequestException('Solo se permite una selección para este tipo de pregunta');
        }

        // Verificar que todas las opciones pertenecen a la pregunta
        for (const idOpcion of respuestaPregunta.opciones) {
          const opcion = await this.opcionRepository.findOne({
            where: { 
              id: idOpcion,
              id_pregunta: pregunta.id,
            },
          });

          if (!opcion) {
            throw new BadRequestException(`Opción ${idOpcion} no encontrada o no pertenece a esta pregunta`);
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