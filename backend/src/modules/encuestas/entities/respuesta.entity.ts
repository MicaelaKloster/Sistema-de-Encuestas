import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Encuesta } from '../../encuestas/entities/encuesta.entity';
import { RespuestaAbierta } from '../../respuestas/entities/respuesta-abierta.entity';
import { RespuestaOpcion } from '../../respuestas/entities/respuesta-opcion.entity';

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
  @Column('int')
  id_encuesta: number;

  /**
   * Relación muchos-a-uno con la entidad Encuesta.
   * Permite acceder a los datos de la encuesta asociada.
   */
  @ManyToOne(() => Encuesta)
  @JoinColumn({ name: 'id_encuesta' })
  encuesta: Encuesta;

  /**
   * Relación uno-a-muchos con las respuestas abiertas.
   * Una respuesta puede tener varias respuestas abiertas asociadas.
   */
  @OneToMany(() => RespuestaAbierta, (ra) => ra.respuesta)
  respuestasAbiertas: RespuestaAbierta[];

  /**
   * Relación uno-a-muchos con las respuestas de opción.
   * Una respuesta puede tener varias respuestas de opción asociadas.
   */
  @OneToMany(() => RespuestaOpcion, (ro) => ro.respuesta)
  respuestasOpciones: RespuestaOpcion[];
}
