import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TiposRespuestaEnum } from '../../encuestas/enums/tipos-respuesta.enum';
import { Encuesta } from '../../encuestas/entities/encuesta.entity';
import { Opcion } from '../../encuestas/entities/opcion.entity';

/**
 * Entidad que representa una pregunta dentro de una encuesta.
 */
@Entity({ name: 'preguntas' })
export class Pregunta {
  /** Identificador único de la pregunta */
  @PrimaryGeneratedColumn()
  id: number;

  /** Número de orden de la pregunta dentro de la encuesta */
  @Column()
  numero: number;

  /** Texto o enunciado de la pregunta */
  @Column()
  texto: string;

  /**
   * Tipo de respuesta esperada para la pregunta.
   * Puede ser: ABIERTA, OPCION_MULTIPLE_SELECCION_SIMPLE, OPCION_MULTIPLE_SELECCION_MULTIPLE, VERDADERO_FALSO.
   */
  @Column({
    type: 'enum',
    enum: TiposRespuestaEnum,
    name: 'tipo_respuesta', // Nombre de la columna en la base de datos
  })
  tipo: TiposRespuestaEnum;

  /**
   * Relación muchos-a-uno con la entidad Encuesta.
   * Indica a qué encuesta pertenece esta pregunta.
   */
  @ManyToOne(() => Encuesta, (encuesta) => encuesta.preguntas)
  encuesta: Encuesta;

  /**
   * Relación uno-a-muchos con la entidad Opcion.
   * Lista de opciones asociadas a la pregunta (si corresponde).
   */
  @OneToMany(() => Opcion, (opcion) => opcion.pregunta)
  opciones: Opcion[];
}
