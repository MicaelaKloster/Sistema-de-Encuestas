// Importación de decoradores y módulos necesarios de NestJS
import { Module } from '@nestjs/common';
import { RespuestasController } from './controllers/respuestas.controller'; // Controlador para manejar las rutas relacionadas con respuesta
import { RespuestasService } from './services/respuestas.service'; // Servicio para la lógica de negocio de respuesta
import { TypeOrmModule } from '@nestjs/typeorm'; // Módulo de TypeORM para la integración con la base de datos
import { Respuesta } from './entities/respuesta.entity'; // Entidad que representa la tabla "Respuesta" en la base de datos
import { RespuestaAbierta } from './entities/respuesta-abierta.entity'; //Entidad que representa la tabla "Respuesta Abierta" en la base de datos
import { RespuestaOpcion } from './entities/respuesta-opcion.entity'; //Entidad que representa la tabla "RespuestaOpciones" en la base de datos
import { Encuesta } from '../encuestas/entities/encuesta.entity'; // Entidad que representa la tabla "Encuesta" en la base de datos
import { Pregunta } from '../encuestas/entities/pregunta.entity'; // Entidad que representa la tabla "Pregunta" en la base de datos
import { Opcion } from '../encuestas/entities/opcion.entity'; // Entidad que representa la tabla "Opción" en la base de datos

@Module({
  // Importación de módulos necesarios para este módulo
  imports: [
    // Configuración de TypeORM para trabajar con las entidades relacionadas
    TypeOrmModule.forFeature([
      Encuesta,
      Pregunta,
      Opcion,
      Respuesta,
      RespuestaAbierta,
      RespuestaOpcion,
    ]),
  ],
  // Declaración de los controladores que manejarán las rutas de este módulo
  // Declaración de los proveedores que contienen la lógica de negocio
  controllers: [RespuestasController],
  providers: [RespuestasService],
  exports: [RespuestasService],
})
// Exportación del módulo de encuestas para que pueda ser utilizado en otros módulos
export class RespuestasModule {}
