import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, //CreateDateColumn }// from 'typeorm';
import { Encuesta } from './encuesta.entity';

@Entity('respuestas')
export class Respuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_encuesta: number;

  //ver si es útil, porque no la tenemos en nuestra base!
  //@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  //fecha_respuesta: Date;

  @ManyToOne(() => Encuesta)
  @JoinColumn({ name: 'id_encuesta' }) //cada respuesta pertenece a una única encuesta
  encuesta: Encuesta;
}

