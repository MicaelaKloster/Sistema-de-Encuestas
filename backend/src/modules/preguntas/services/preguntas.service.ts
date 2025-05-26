// Importación de decoradores y excepciones de NestJS
import { NotFoundException, Injectable } from '@nestjs/common';
// Decorador para inyectar repositorios de TypeORM
import { InjectRepository } from '@nestjs/typeorm';
// Importación del repositorio de TypeORM
import { Repository } from 'typeorm';
// Importación de la entidad Pregunta
import { Pregunta } from '../../encuestas/entities/pregunta.entity';
// Importación de la entidad Opcion
import { Opcion } from '../../encuestas/entities/opcion.entity';
// Importación del DTO para actualizar una pregunta
import { ActualizarPreguntaDto } from '../../encuestas/dtos/actualizar-pregunta.dto';

@Injectable() // Decorador que marca esta clase como un servicio inyectable
export class PreguntasService {
  constructor(
    // Inyección del repositorio de la entidad Pregunta
    @InjectRepository(Pregunta)
    private readonly preguntaRepo: Repository<Pregunta>,
    // Inyección del repositorio de la entidad Opcion
    @InjectRepository(Opcion)
    private readonly opcionRepo: Repository<Opcion>,
  ) {}

  // Método para actualizar una pregunta
  async actualizarPregunta(
    idPregunta: number,
    updateDto: ActualizarPreguntaDto,
  ): Promise<{ mensaje: string }> {
    const pregunta = await this.preguntaRepo.findOneBy({ id: idPregunta }); // Busca la pregunta por ID
    if (!pregunta) throw new NotFoundException('Pregunta no encontrada'); // Si no existe, lanza una excepción 404

    Object.assign(pregunta, updateDto); // Asigna los nuevos valores a la entidad pregunta
    await this.preguntaRepo.save(pregunta); // Guarda la entidad actualizada en la base de datos

    return { mensaje: 'Pregunta actualizada correctamente' }; // Retorna un mensaje de éxito
  }

  // Método para eliminar una pregunta y sus opciones
  async eliminarPreguntaConOpciones(
    idPregunta: number,
  ): Promise<{ mensaje: string }> {
    const pregunta = await this.preguntaRepo.findOne({
      // Busca la pregunta junto con sus opciones
      where: { id: idPregunta },
      relations: ['opciones'],
    });

    if (!pregunta) throw new NotFoundException('Pregunta no encontrada'); // Si no existe, lanza excepción 404

    // Se eliminan las opciones relacionadas
    if (pregunta.opciones && pregunta.opciones.length > 0) {
      await this.opcionRepo.delete({ pregunta: { id: idPregunta } });
    }

    // Se elimina la pregunta
    await this.preguntaRepo.delete(idPregunta);

    return { mensaje: 'Pregunta eliminada correctamente' }; // Retorna un mensaje de éxito
  }
}
