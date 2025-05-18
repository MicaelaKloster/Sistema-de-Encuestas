// Importación de decoradores y utilidades de TypeORM
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Respuesta } from './respuesta.entity';
//import { Opcion } from './opcion.entity'; - veer: armamos módulo opción?

@Entity('respuestas_opciones')
export class RespuestaOpcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_respuesta: number;

  @Column('int')
  id_opcion: number;

  //Cada RespuestaOpcion pertenece a una respuesta
  //Cada RespuestaOpcion pertenece a una opcion
  @ManyToOne(() => Respuesta)
  @JoinColumn({ name: 'id_respuesta' })
  respuesta: Respuesta;

  //- veer: armamos módulo opción?
  //@ManyToOne(() => Opcion)
  //@JoinColumn({ name: 'id_opcion' })
  //opcion: Opcion;
}
