import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pregunta } from './pregunta.entity';

@Entity({ name: 'encuestas' })
export class Encuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta, {
    cascade: ['insert'],
  })
  preguntas: Pregunta[];

  @Column({ name: 'codigo_respuesta' })
  codigoRespuesta: string;

  @Column({ name: 'codigo_resultados' })
  codigoResultados: string;

  @Column({ default: true })
  habilitada: boolean;

  @Column({ name: 'fecha_vencimiento', nullable: true, type: 'timestamp' })
  fechaVencimiento: Date | null;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;
}
