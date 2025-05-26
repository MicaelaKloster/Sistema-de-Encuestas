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

@Entity('respuestas')
export class Respuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: true })
  id_encuesta: number;

  @ManyToOne(() => Encuesta, (encuesta) => encuesta.respuestas)
  @JoinColumn({ name: 'id_encuesta' })
  encuesta: Encuesta;

  @OneToMany(
    () => RespuestaAbierta,
    (respuestaAbierta) => respuestaAbierta.respuesta,
  )
  respuestasAbiertas: RespuestaAbierta[];

  @OneToMany(
    () => RespuestaOpcion,
    (respuestaOpcion) => respuestaOpcion.respuesta,
  )
  respuestasOpciones: RespuestaOpcion[];
}
