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

@Entity({ name: 'preguntas' })
export class Pregunta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column()
  texto: string;

  @Column({
    type: 'enum',
    enum: TiposRespuestaEnum,
    name: 'tipo_respuesta', // Nombre de la columna en la base de datos
  })
  tipo: TiposRespuestaEnum;

  @ManyToOne(() => Encuesta, (encuesta) => encuesta.preguntas)
  encuesta: Encuesta;

  @OneToMany(() => Opcion, (opcion) => opcion.pregunta)
  opciones: Opcion[];
}
