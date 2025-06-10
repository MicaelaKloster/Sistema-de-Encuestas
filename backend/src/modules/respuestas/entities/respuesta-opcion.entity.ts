import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Respuesta } from './respuesta.entity';
import { Opcion } from '../../encuestas/entities/opcion.entity';

/**
 * Entidad que representa una respuesta de opción seleccionada por un usuario en una encuesta.
 * Relaciona una respuesta general con una opción específica de una pregunta.
 */
@Entity('respuestas_opciones')
export class RespuestaOpcion {
  /** Identificador único de la respuesta de opción */
  @PrimaryGeneratedColumn()
  id: number;

  /** ID de la respuesta general a la que pertenece esta respuesta de opción */
  @Column('int', { nullable: true })
  id_respuesta: number;

  /** ID de la opción seleccionada */
  @Column('int', { nullable: true })
  id_opcion: number;

  /**
   * Relación muchos-a-uno con la entidad Respuesta.
   * Permite acceder a la respuesta general asociada.
   */
  @ManyToOne(() => Respuesta)
  @JoinColumn({ name: 'id_respuesta' })
  respuesta: Respuesta;

  /**
   * Relación muchos-a-uno con la entidad Opcion.
   * Permite acceder a la opción seleccionada por el usuario.
   */
  @ManyToOne(() => Opcion)
  @JoinColumn({ name: 'id_opcion' })
  opcion: Opcion;
}
