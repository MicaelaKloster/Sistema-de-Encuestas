// Importación de decoradores y módulos necesarios de NestJS
import { Module } from '@nestjs/common';
import { EncuestasController } from './controllers/encuestas.controller'; // Controlador para manejar las rutas relacionadas con encuestas
import { EncuestasService } from './services/encuestas.service'; // Servicio para la lógica de negocio de encuestas
import { TypeOrmModule } from '@nestjs/typeorm'; // Módulo de TypeORM para la integración con la base de datos
import { Encuesta } from './entities/encuesta.entity'; // Entidad que representa la tabla "Encuesta" en la base de datos
import { Pregunta } from './entities/pregunta.entity'; // Entidad que representa la tabla "Pregunta" en la base de datos
import { Opcion } from './entities/opcion.entity'; // Entidad que representa la tabla "Opción" en la base de datos

@Module({
  // Importación de módulos necesarios para este módulo
  imports: [
    // Configuración de TypeORM para trabajar con las entidades relacionadas
    TypeOrmModule.forFeature([Encuesta, Pregunta, Opcion]),
  ],
  // Declaración de los controladores que manejarán las rutas de este módulo
  controllers: [EncuestasController],
  // Declaración de los proveedores que contienen la lógica de negocio
  providers: [EncuestasService],
})
// Exportación del módulo de encuestas para que pueda ser utilizado en otros módulos
export class EncuestasModule {}
