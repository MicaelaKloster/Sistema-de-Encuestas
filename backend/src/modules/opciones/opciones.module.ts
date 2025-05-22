import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opcion } from '../encuestas/entities/opcion.entity';
import { Pregunta } from '../encuestas/entities/pregunta.entity';
import { OpcionesService } from './services/opciones.service';
import { OpcionesController } from './controllers/opciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Opcion, Pregunta])],
  controllers: [OpcionesController],
  providers: [OpcionesService],
})
export class OpcionesModule {}
