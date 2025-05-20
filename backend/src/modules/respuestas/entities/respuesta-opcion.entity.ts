import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Respuesta } from './respuesta.entity';
import { Opcion } from 'src/modules/encuestas/entities/opcion.entity';

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
