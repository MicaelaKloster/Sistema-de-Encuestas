import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opcion } from '../entities/option.entity';
import { CreateOpcionDto } from '../dtos/create-option.dto';

@Injectable()
export class OpcionesService {
  constructor(
    @InjectRepository(Opcion)
    private opcionRepository: Repository<Opcion>,
  ) {}

  async crearOpcion(createOpcionDto: CreateOpcionDto): Promise<Opcion> {
    const opcion = this.opcionRepository.create(createOpcionDto);
    return await this.opcionRepository.save(opcion);
  }

  async obtenerOpcion(id: number): Promise<Opcion> {
    const opcion = await this.opcionRepository.findOne({ where: { id } });
    if (!opcion) {
      throw new NotFoundException('Opción no encontrada');
    }
    return opcion;
  }
}
