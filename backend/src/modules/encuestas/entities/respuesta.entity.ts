import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Encuesta } from '../../encuestas/entities/encuesta.entity';
import { RespuestaAbierta } from '../../respuestas/entities/respuesta-abierta.entity';
import { RespuestaOpcion } from '../../respuestas/entities/respuesta-opcion.entity';

@Entity('respuestas')
export class Respuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_encuesta: number;

  @ManyToOne(() => Encuesta)
  @JoinColumn({ name: 'id_encuesta' })
  encuesta: Encuesta;

  @OneToMany(() => RespuestaAbierta, (ra) => ra.respuesta)
  respuestasAbiertas: RespuestaAbierta[];

  @OneToMany(() => RespuestaOpcion, (ro) => ro.respuesta)
  respuestasOpciones: RespuestaOpcion[];
}
