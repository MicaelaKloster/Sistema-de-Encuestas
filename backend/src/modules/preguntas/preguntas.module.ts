import { Module } from '@nestjs/common';
import { PreguntasController } from './controllers/preguntas.controller';
import { PreguntasService } from './services/preguntas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregunta } from './entities/pregunta.entity';
import { Opcion } from '../opciones/entities/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pregunta, Opcion])],
  controllers: [PreguntasController],
  providers: [PreguntasService],
})
export class PreguntasModule {}
