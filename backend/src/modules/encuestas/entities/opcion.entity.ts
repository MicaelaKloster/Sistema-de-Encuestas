// Importación del decorador "Exclude" para excluir propiedades en la serialización
import { Exclude } from 'class-transformer';
// Importación de decoradores y utilidades de TypeORM
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  //OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Importación de la entidad relacionada "Pregunta"
import { Pregunta } from './pregunta.entity';
//import { RespuestaOpcion } from 'src/modules/respuestas/entities/respuesta-opcion.entity';

@Entity({ name: 'opciones' }) // Define la clase como una entidad de la base de datos con el nombre "opciones"
export class Opcion {
  @PrimaryGeneratedColumn() // Define la columna "id" como clave primaria autogenerada
  id: number;

  @Column() // Define la columna "texto" en la tabla
  texto: string;

  @Column() // Define la columna "numero" en la tabla
  numero: number;

  @ManyToOne(() => Pregunta) // Relación muchos a uno con la entidad "Pregunta"
  @JoinColumn({ name: 'id_pregunta' }) // Define la columna "id_pregunta" como la clave foránea
  @Exclude() // Excluye esta propiedad al serializar la entidad (por ejemplo, al devolverla en una API)
  pregunta: Pregunta; // Referencia a la pregunta a la que pertenece esta opción

  // EXTRA POR MÓDULO RESPUESTAS
  // @OneToMany(() => RespuestaOpcion, (r) => r.opcion)
  // respuestas: RespuestaOpcion[];
}
