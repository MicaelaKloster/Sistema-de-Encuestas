import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Encuesta } from '../../encuestas/entities/encuesta.entity';
import { RespuestaAbierta } from './respuesta-abierta.entity';
import { RespuestaOpcion } from './respuesta-opcion.entity';

/**
 * Entidad que representa una respuesta general a una encuesta.
 * Puede contener respuestas abiertas y respuestas de opción.
 */
@Entity('respuestas')
export class Respuesta {
  /** Identificador único de la respuesta */
  @PrimaryGeneratedColumn()
  id: number;

  /** ID de la encuesta a la que pertenece esta respuesta */
  @Column('int', { nullable: true })
  id_encuesta: number;

  /**
   * Relación muchos-a-uno con la entidad Encuesta.
   * Permite acceder a los datos de la encuesta asociada.
   */
  @ManyToOne(() => Encuesta, (encuesta) => encuesta.respuestas)
  @JoinColumn({ name: 'id_encuesta' })
  encuesta: Encuesta;

  /**
   * Relación uno-a-muchos con las respuestas abiertas.
   * Una respuesta puede tener varias respuestas abiertas asociadas.
   */
  @OneToMany(
    () => RespuestaAbierta,
    (respuestaAbierta) => respuestaAbierta.respuesta,
  )
  respuestasAbiertas: RespuestaAbierta[];

  /**
   * Relación uno-a-muchos con las respuestas de opción.
   * Una respuesta puede tener varias respuestas de opción asociadas.
   */
  @OneToMany(
    () => RespuestaOpcion,
    (respuestaOpcion) => respuestaOpcion.respuesta,
  )
  respuestasOpciones: RespuestaOpcion[];
}
