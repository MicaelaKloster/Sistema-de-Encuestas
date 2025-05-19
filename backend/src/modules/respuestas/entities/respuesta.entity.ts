import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Encuesta } from '../../encuestas/entities/encuesta.entity';

@Entity('respuestas')
export class Respuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_encuesta: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_respuesta: Date;

  @ManyToOne(() => Encuesta)
  @JoinColumn({ name: 'id_encuesta' })
  encuesta: Encuesta;
}
