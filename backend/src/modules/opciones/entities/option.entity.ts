import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pregunta } from '../../preguntas/entities/pregunta.entity';

@Entity({ name: 'opciones' })
export class Opcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

  @Column()
  numero: number;

  @ManyToOne(() => Pregunta, (pregunta) => pregunta.opciones)
  @JoinColumn({ name: 'id_pregunta' })
  pregunta: Pregunta;
}
