import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Encuesta } from "src/modules/encuestas/entities/encuesta.entity";
import { Opcion } from "src/modules/encuestas/entities/opcion.entity";
import { Pregunta } from "src/modules/encuestas/entities/pregunta.entity";
import { TiposRespuestaEnum } from "src/modules/encuestas/enums/tipos-respuesta.enum";
import { Repository } from "typeorm";


@Injectable()
export class RespuestasService {
    constructor(
        @InjectRepository(Respuestas)
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


    ){}

    async registarRespuestas(
        codigoParticipacion: string,
        registarRespuestasDto: RegistrarRespuestasDto,
    ): Promise<void> {
        const encuesta = await this.encuestaRepository.findOne({
            where: {codigoRespuesta: codigoParticipacion},
        });

        if (!encuesta) {
            throw new NotFoundException('Encuesta no encontrada o enlace invalido');
        }

        if (encuesta.fechaVencimiento && new Date()> encuesta.fechaVencimiento) {
            throw new BadRequestException (
                'La encuesta ha expirado y no acepta mas respuestas',
            );

        }
        if (!encuesta.habilitada) {
            throw new BadRequestException('La encuesta no esta habilitada');
        }

        const respuesta = this.respuestaRepository.create({
            idEncuesta: encuesta.id,
        });
        const respuestaGuardada = await this.respuestaOpcionRepository.save(respuesta);

        for (const respuestaPregunta of registarRespuestasDto.respuesta) {
            const pregunta = await this.preguntaRepository.findOne({
                where: {
                    id: respuestaPregunta.id_pregunta,
                    encuesta: {id: encuesta.id},
                },
            });

            if (!pregunta) {
                throw new BadRequestException(
                    `Pregunta ${respuestaPregunta.id_pregunta} no encontrada o no pertenece a la encuesta`,
                
                );
            }

            if (respuestaPregunta.tipo === TiposRespuestaEnum.ABIERTA) {
                if (respuestaPregunta.texto) {
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
            }else {
                if (
                    !respuestaPregunta.opciones || respuestaPregunta.opciones.length === 0
                ) {
                    throw new BadRequestException (
                        'Al menos una opcion debe ser seleccionada',
                    );
                }

                if (
                    pregunta.tipo_respuesta === TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE && 
                    respuestaPregunta.opciones.length > 1
                ){
                    throw new BadRequestException(
                        'Solo se permite una seleccion para este tipo de pregunta',
                    );
                }

                for (const idOpcion of respuestaPregunta.opciones) {
                    const opcion = await this.opcionRepository.findOne({
                        where: {
                            id: idOpcion,
                            pregunta: {id: pregunta.id},
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