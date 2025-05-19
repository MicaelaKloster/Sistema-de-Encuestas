import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Encuesta } from '../../encuestas/entities/encuesta.entity';

@Entity('respuestas')
export class Respuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_encuesta' })
  idEncuesta: number;

  @ManyToOne(() => Encuesta)
  @JoinColumn({ name: 'id_encuesta' })
  encuesta: Encuesta;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;
}
