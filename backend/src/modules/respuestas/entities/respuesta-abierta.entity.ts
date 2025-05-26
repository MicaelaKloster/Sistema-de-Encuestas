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

@Entity('respuestas_abiertas')
export class RespuestaAbierta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  texto: string;

  @Column('int', { nullable: true })
  id_pregunta: number;

  @Column('int', { nullable: true })
  id_respuesta: number;

  @ManyToOne(() => Pregunta)
  @JoinColumn({ name: 'id_pregunta' })
  pregunta: Pregunta;

  @ManyToOne(() => Respuesta)
  @JoinColumn({ name: 'id_respuesta' })
  respuesta: Respuesta;
}
