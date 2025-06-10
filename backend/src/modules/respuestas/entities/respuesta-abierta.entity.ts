// Importación de decoradores y utilidades de TypeORM
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pregunta } from '../../encuestas/entities/pregunta.entity';
import { Respuesta } from './respuesta.entity';

/**
 * Entidad que representa una respuesta abierta (texto libre) a una pregunta de una encuesta.
 */
@Entity('respuestas_abiertas')
export class RespuestaAbierta {
  /** Identificador único de la respuesta abierta */
  @PrimaryGeneratedColumn()
  id: number;

  /** Texto ingresado por el usuario como respuesta */
  @Column({ type: 'text', nullable: true })
  texto: string;

  /** ID de la pregunta a la que corresponde esta respuesta abierta */
  @Column('int', { nullable: true })
  id_pregunta: number;

  /** ID de la respuesta general (agrupadora) a la que pertenece esta respuesta abierta */
  @Column('int', { nullable: true })
  id_respuesta: number;

  /**
   * Relación muchos-a-uno con la entidad Pregunta.
   * Permite acceder a los datos de la pregunta asociada.
   */
  @ManyToOne(() => Pregunta)
  @JoinColumn({ name: 'id_pregunta' })
  pregunta: Pregunta;

  /**
   * Relación muchos-a-uno con la entidad Respuesta.
   * Permite acceder a la respuesta general a la que pertenece esta respuesta abierta.
   */
  @ManyToOne(() => Respuesta)
  @JoinColumn({ name: 'id_respuesta' })
  respuesta: Respuesta;
}
