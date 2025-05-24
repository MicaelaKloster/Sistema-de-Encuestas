import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opcion } from '../../encuestas/entities/opcion.entity';
import { Pregunta } from '../../encuestas/entities/pregunta.entity';
import { CreateOpcionDto } from '../../encuestas/dtos/create-opcion.dto';

@Injectable()
export class OpcionesService {
  constructor(
    @InjectRepository(Opcion)
    private opcionRepository: Repository<Opcion>,
    @InjectRepository(Pregunta)
    private preguntaRepository: Repository<Pregunta>,
  ) {}

  async crearOpcion(
    preguntaId: number,
    createOpcionDto: CreateOpcionDto,
  ): Promise<{ mensaje: string; opcion: Opcion }> {
    const pregunta = await this.preguntaRepository.findOneBy({
      id: preguntaId,
    });
    if (!pregunta) {
      throw new NotFoundException('Pregunta no encontrada');
    }

    const opcion = this.opcionRepository.create({
      ...createOpcionDto,
      pregunta,
    });

    const opcionGuardada = await this.opcionRepository.save(opcion);

    return {
      mensaje: 'Opción creada correctamente',
      opcion: opcionGuardada,
    };
  }

  async eliminarOpcion(id: number): Promise<{ mensaje: string }> {
    const opcion = await this.opcionRepository.findOneBy({ id });
    if (!opcion) {
      throw new NotFoundException('Opción no encontrada');
    }

    await this.opcionRepository.delete(id);
    return { mensaje: 'Opción eliminada correctamente' };
  }
}
