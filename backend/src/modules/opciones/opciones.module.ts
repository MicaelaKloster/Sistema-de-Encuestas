import { Module } from '@nestjs/common';
import { OpcionesController } from './controllers/opciones.controller';
import { OpcionesService } from './services/opciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opcion } from './entities/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Opcion])],
  controllers: [OpcionesController],
  providers: [OpcionesService],
})
export class OpcionesModule {}
