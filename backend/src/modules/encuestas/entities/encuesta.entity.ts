// Importación de decoradores y utilidades de TypeORM
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// Importación de la entidad relacionada "Pregunta"
import { Pregunta } from './pregunta.entity';
// Importación de la entidad relacionada "Respuesta"
import { Respuesta } from '../../respuestas/entities/respuesta.entity';
// Importación del decorador "Exclude" para excluir propiedades en la serialización
import { Exclude } from 'class-transformer';

@Entity({ name: 'encuestas' }) // Define la clase como una entidad de la base de datos con el nombre "encuestas"
export class Encuesta {
  @PrimaryGeneratedColumn() // Define la columna "id" como clave primaria autogenerada
  id: number;

  @Column({ nullable: true }) // Define la columna "nombre" en la tabla, permitiendo valores nulos temporalmente
  nombre: string;

  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaActualizacion: Date;
  @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta, {
    cascade: ['insert'], // Permite insertar automáticamente las preguntas relacionadas
  })
  preguntas: Pregunta[]; // Relación uno a muchos con la entidad "Pregunta"

  @Column({ name: 'codigo_respuesta', nullable: true }) // Define la columna "codigo_respuesta" en la tabla, permitiendo valores nulos temporalmente
  codigoRespuesta: string;

  @Column({ name: 'codigo_resultados', nullable: true }) // Define la columna "codigo_resultados" en la tabla, permitiendo valores nulos temporalmente
  @Exclude() // Excluye esta propiedad al serializar la entidad (por ejemplo, al devolverla en una API)
  codigoResultados: string;

  // Funcionalidad Extra para deshabilitar una encuesta (MICA)
  @Column({ default: true })
  habilitada: boolean; // Columna que indica si la encuesta está habilitada o no

  // Funcionalidad extra (MAIA): Fecha de vencimiento
  @Column({ name: 'fecha_vencimiento', type: 'timestamptz', nullable: true })
  fechaVencimiento?: Date;

  @OneToMany(() => Respuesta, (respuesta) => respuesta.encuesta)
  respuestas: Respuesta[]; // Relación uno a muchos con la entidad "Respuesta"
}
