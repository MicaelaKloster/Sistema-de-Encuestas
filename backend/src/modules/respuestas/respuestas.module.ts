import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestasController } from './controllers/respuestas.controller';
import { RespuestasService } from './services/respuestas.service';
import { Encuesta } from '../encuestas/entities/encuesta.entity';
import { Pregunta } from '../preguntas/entities/pregunta.entity';
import { Opcion } from '../opciones/entities/option.entity';
import { Respuesta } from './entities/respuesta.entity';
import { RespuestaAbierta } from './entities/respuesta-abierta.entity';
import { RespuestaOpcion } from './entities/respuesta-opcion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Encuesta,
      Pregunta,
      Opcion,
      Respuesta,
      RespuestaAbierta,
      RespuestaOpcion,
    ]),
  ],
  controllers: [RespuestasController],
  providers: [RespuestasService],
})
export class RespuestasModule {}
