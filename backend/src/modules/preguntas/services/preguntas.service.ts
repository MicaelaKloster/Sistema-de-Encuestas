import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta } from '../entities/pregunta.entity';
import { CreatePreguntaDto } from '../dtos/create-pregunta.dto';

@Injectable()
export class PreguntasService {
  constructor(
    @InjectRepository(Pregunta)
    private preguntaRepository: Repository<Pregunta>,
  ) {}

  async crearPregunta(createPreguntaDto: CreatePreguntaDto): Promise<Pregunta> {
    const pregunta = this.preguntaRepository.create(createPreguntaDto);
    return await this.preguntaRepository.save(pregunta);
  }

  async obtenerPregunta(id: number): Promise<Pregunta> {
    const pregunta = await this.preguntaRepository.findOne({ where: { id } });
    if (!pregunta) {
      throw new NotFoundException('Pregunta no encontrada');
    }
    return pregunta;
  }
}
