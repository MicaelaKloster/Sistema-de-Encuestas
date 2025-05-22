// Importación de decoradores y módulos necesarios de NestJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Módulo de TypeORM para la integración con la base de datos
import { Pregunta } from '../encuestas/entities/pregunta.entity'; // Entidad que representa la tabla "Pregunta" en la base de datos
import { Opcion } from '../encuestas/entities/opcion.entity'; // Entidad que representa la tabla "Opción" en la base de datos
import { PreguntasService } from '../preguntas/services/preguntas.service'; // Servicio para la lógica de negocio de preguntas
import { PreguntasController } from '../preguntas/controllers/preguntas.controller'; // Controlador para manejar las rutas relacionadas con preguntas

@Module({
  // Importación de módulos necesarios para este módulo
  imports: [
    // Configuración de TypeORM para trabajar con las entidades relacionadas
    TypeOrmModule.forFeature([Pregunta, Opcion]),
  ],
  // Declaración de los controladores que manejarán las rutas de este módulo
  controllers: [PreguntasController],
  // Declaración de los proveedores que contienen la lógica de negocio
  providers: [PreguntasService],
})
// Exportación del módulo de preguntas para que pueda ser utilizado en otros módulos
export class PreguntasModule {}
