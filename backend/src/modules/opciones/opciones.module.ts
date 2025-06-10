import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opcion } from '../encuestas/entities/opcion.entity';
import { Pregunta } from '../encuestas/entities/pregunta.entity';
import { OpcionesService } from './services/opciones.service';
import { OpcionesController } from './controllers/opciones.controller';

/**
 * Módulo de Opciones.
 * Este módulo gestiona las opciones asociadas a las preguntas de las encuestas.
 * Importa las entidades Opcion y Pregunta para interactuar con la base de datos.
 * Provee el servicio y el controlador de opciones.
 */
@Module({
  // Importa los repositorios de Opcion y Pregunta para su uso en el servicio
  imports: [TypeOrmModule.forFeature([Opcion, Pregunta])],
  // Declara el controlador que maneja las rutas HTTP relacionadas con opciones
  controllers: [OpcionesController],
  // Provee el servicio que contiene la lógica de negocio para las opciones
  providers: [OpcionesService],
})
export class OpcionesModule {}
