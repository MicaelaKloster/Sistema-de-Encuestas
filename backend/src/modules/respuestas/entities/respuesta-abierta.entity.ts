import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pregunta } from '../../preguntas/entities/pregunta.entity';
import { Respuesta } from './respuesta.entity';

@Entity('respuestas_abiertas')
export class RespuestaAbierta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  texto: string;

  @Column('int')
  id_pregunta: number;

  @Column('int')
  id_respuesta: number;

  @ManyToOne(() => Pregunta)
  @JoinColumn({ name: 'id_pregunta' })
  pregunta: Pregunta;

  @ManyToOne(() => Respuesta)
  @JoinColumn({ name: 'id_respuesta' })
  respuesta: Respuesta;
}
