import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opcion } from '../../encuestas/entities/opcion.entity';
import { Pregunta } from '../../encuestas/entities/pregunta.entity';
import { CreateOpcionDto } from '../../encuestas/dtos/create-opcion.dto';

@Injectable()
export class OpcionesService {
  /**
   * Inyecta los repositorios de Opcion y Pregunta para interactuar con la base de datos.
   */
  constructor(
    @InjectRepository(Opcion)
    private opcionRepository: Repository<Opcion>,
    @InjectRepository(Pregunta)
    private preguntaRepository: Repository<Pregunta>,
  ) {}

  /**
   * Crea una nueva opción asociada a una pregunta específica.
   * @param preguntaId ID de la pregunta a la que se asocia la opción.
   * @param createOpcionDto Datos de la opción a crear.
   * @returns Un mensaje de éxito y la opción creada.
   */
  async crearOpcion(
    preguntaId: number,
    createOpcionDto: CreateOpcionDto,
  ): Promise<{ mensaje: string; opcion: Opcion }> {
    // Busca la pregunta por su ID
    const pregunta = await this.preguntaRepository.findOneBy({
      id: preguntaId,
    });
    // Si no existe la pregunta, lanza una excepción
    if (!pregunta) {
      throw new NotFoundException('Pregunta no encontrada');
    }

    // Crea la nueva opción asociada a la pregunta encontrada
    const opcion = this.opcionRepository.create({
      ...createOpcionDto,
      pregunta,
    });

    // Guarda la opción en la base de datos
    const opcionGuardada = await this.opcionRepository.save(opcion);

    // Retorna un mensaje de éxito y la opción creada
    return {
      mensaje: 'Opción creada correctamente',
      opcion: opcionGuardada,
    };
  }

  /**
   * Elimina una opción por su ID.
   * @param id ID de la opción a eliminar.
   * @returns Un mensaje de éxito.
   */
  async eliminarOpcion(id: number): Promise<{ mensaje: string }> {
    // Busca la opción por su ID
    const opcion = await this.opcionRepository.findOneBy({ id });
    // Si no existe la opción, lanza una excepción
    if (!opcion) {
      throw new NotFoundException('Opción no encontrada');
    }

    // Elimina la opción de la base de datos
    await this.opcionRepository.delete(id);
    return { mensaje: 'Opción eliminada correctamente' };
  }
}
