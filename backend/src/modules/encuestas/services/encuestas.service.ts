import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encuesta } from '../entities/encuesta.entity';
import { CreateEncuestaDto } from '../dtos/create-encuesta.dto';
import { v4 } from 'uuid';
import { UpdateEncuestaDto } from '../dtos/update-encuesta.dto';
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
import { Pregunta } from '../entities/pregunta.entity';

@Injectable()
export class EncuestasService {
  constructor(
    @InjectRepository(Encuesta)
    private encuestaRepository: Repository<Encuesta>,
    @InjectRepository(Pregunta)
    private preguntaRepository: Repository<Pregunta>,
  ) {}

  async crearEncuesta(dto: CreateEncuestaDto): Promise<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
    fechaVencimiento?: Date;
  }> {
    const encuesta = this.encuestaRepository.create({
      ...dto,
      codigoRespuesta: v4(),
      codigoResultados: v4(),
      habilitada: true,
    });

    const encuestaCreada = await this.encuestaRepository.save(encuesta);
    return {
      id: encuestaCreada.id,
      codigoRespuesta: encuestaCreada.codigoRespuesta,
      codigoResultados: encuestaCreada.codigoResultados,
      ...(dto.fechaVencimiento && { fechaVencimiento: dto.fechaVencimiento }),
    };
  }

  async obtenerEncuesta(
    id: number,
    codigo: string,
    codigoTipo: CodigoTipoEnum,
  ): Promise<Encuesta> {
    const query = this.encuestaRepository
      .createQueryBuilder('encuesta')
      .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
      .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion')
      .where('encuesta.id = :id', { id })
      .andWhere('encuesta.habilitada = true');

    if (codigoTipo === CodigoTipoEnum.RESPUESTA) {
      query.andWhere('encuesta.codigoRespuesta = :codigo', { codigo });
    } else {
      query.andWhere('encuesta.codigoResultados = :codigo', { codigo });
    }

    query.orderBy('pregunta.numero', 'ASC');
    query.addOrderBy('preguntaOpcion.numero', 'ASC');

    const encuesta = await query.getOne();

    if (!encuesta) {
      throw new BadRequestException('Datos de encuesta no válidos');
    }

    if (encuesta.fechaVencimiento && new Date() > encuesta.fechaVencimiento) {
      throw new BadRequestException('La encuesta ha expirado');
    }

    return encuesta;
  }

  async actualizarEstadoEncuesta(
    id: number,
    habilitada: boolean,
  ): Promise<{ mensaje: string }> {
    const encuesta = await this.encuestaRepository.findOne({ where: { id } });

    if (!encuesta) {
      throw new NotFoundException('Encuesta no encontrada');
    }

    encuesta.habilitada = habilitada;
    await this.encuestaRepository.save(encuesta);

    return {
      mensaje: `La encuesta fue ${habilitada ? 'habilitada' : 'deshabilitada'} correctamente`,
    };
  }

  async actualizarEncuesta(
    id: number,
    dto: UpdateEncuestaDto,
  ): Promise<Encuesta> {
    const encuesta = await this.encuestaRepository.findOne({ where: { id } });

    if (!encuesta) {
      throw new NotFoundException('Encuesta no encontrada');
    }

    const encuestaActualizada = await this.encuestaRepository.save({
      ...encuesta,
      ...dto,
    });

    return encuestaActualizada;
  }
}
