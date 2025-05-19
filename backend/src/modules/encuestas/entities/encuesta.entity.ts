// Importación de decoradores y utilidades de TypeORM
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// Importación de la entidad relacionada "Pregunta"
import { Pregunta } from './pregunta.entity';
// Importación del decorador "Exclude" para excluir propiedades en la serialización
import { Exclude } from 'class-transformer';

@Entity({ name: 'encuestas' }) // Define la clase como una entidad de la base de datos con el nombre "encuestas"
export class Encuesta {
  @PrimaryGeneratedColumn() // Define la columna "id" como clave primaria autogenerada
  id: number;

  @Column() // Define la columna "nombre" en la tabla
  nombre: string;

  @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta, {
    cascade: ['insert'], // Permite insertar automáticamente las preguntas relacionadas
  })
  preguntas: Pregunta[]; // Relación uno a muchos con la entidad "Pregunta"

  @Column({ name: 'codigo_respuesta' }) // Define la columna "codigo_respuesta" en la tabla
  codigoRespuesta: string;

  @Column({ name: 'codigo_resultados' }) // Define la columna "codigo_resultados" en la tabla
  @Exclude() // Excluye esta propiedad al serializar la entidad (por ejemplo, al devolverla en una API)
  codigoResultados: string;

  // Funcionalidad Extra para deshabilitar una encuesta (MICA)
  @Column({ default: true })
  habilitada: boolean; // Columna que indica si la encuesta está habilitada o no
}
