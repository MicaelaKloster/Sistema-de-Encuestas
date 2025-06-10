// Importación de decoradores y utilidades de TypeORM
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Importación del enumerador para los tipos de respuesta
import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum';
// Importación del decorador "Exclude" para excluir propiedades en la serialización
import { Exclude } from 'class-transformer';
// Importación de la entidad relacionada "Encuesta"
import { Encuesta } from './encuesta.entity';
// Importación de la entidad relacionada "Opcion"
import { Opcion } from './opcion.entity';

@Entity({ name: 'preguntas' }) // Define la clase como una entidad de la base de datos con el nombre "preguntas"
export class Pregunta {
  @PrimaryGeneratedColumn() // Define la columna "id" como clave primaria autogenerada
  id: number;

  @Column({ nullable: true }) // Define la columna "numero" en la tabla, permitiendo valores nulos temporalmente
  numero: number;

  @Column({ nullable: true }) // Define la columna "texto" en la tabla, permitiendo valores nulos temporalmente
  texto: string;

  @Column({
    type: 'enum',
    enum: TiposRespuestaEnum,
    name: 'tipo', // Nombre de la columna en la base de datos
    nullable: true, // Permitir valores nulos temporalmente
    default: TiposRespuestaEnum.ABIERTA, // Valor por defecto para registros existentes
  }) // Define la columna "tipo" como un enumerador
  tipo: TiposRespuestaEnum; // Especifica el tipo de respuesta permitido para la pregunta

  @ManyToOne(() => Encuesta) // Relación muchos a uno con la entidad "Encuesta"
  @JoinColumn({ name: 'id_encuesta' }) // Define la columna "id_encuesta" como la clave foránea
  @Exclude() // Excluye esta propiedad al serializar la entidad (por ejemplo, al devolverla en una API)
  encuesta: Encuesta; // Referencia a la encuesta a la que pertenece esta pregunta

  @OneToMany(() => Opcion, (opcion) => opcion.pregunta, { cascade: ['insert'] }) // Relación uno a muchos con la entidad "Opcion"
  opciones: Opcion[]; // Lista de opciones asociadas a la pregunta
}
