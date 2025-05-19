import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Opcion } from '../../opciones/entities/option.entity';
import { Respuesta } from './respuesta.entity';

@Entity('respuestas_opciones')
export class RespuestaOpcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_respuesta: number;

  @Column('int')
  id_opcion: number;

  @ManyToOne(() => Respuesta)
  @JoinColumn({ name: 'id_respuesta' })
  respuesta: Respuesta;

  @ManyToOne(() => Opcion)
  @JoinColumn({ name: 'id_opcion' })
  opcion: Opcion;
}
