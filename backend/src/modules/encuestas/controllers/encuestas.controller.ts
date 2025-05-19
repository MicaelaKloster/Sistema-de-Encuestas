import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { EncuestasService } from '../services/encuestas.service';
import { CreateEncuestaDto } from '../dtos/create-encuesta.dto';
import { ObtenerEncuestaDto } from '../dtos/obtener-encuesta.dto';
import { Encuesta } from '../entities/encuesta.entity';
import { UpdateEncuestaDto } from '../dtos/update-encuesta.dto';

@Controller('encuestas')
export class EncuestasController {
  constructor(private readonly encuestasService: EncuestasService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crearEncuesta(@Body() dto: CreateEncuestaDto): Promise<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
  }> {
    return await this.encuestasService.crearEncuesta(dto);
  }

  @Get(':id')
  async obtenerEncuesta(
    @Param('id') id: number,
    @Query() dto: ObtenerEncuestaDto,
  ): Promise<Encuesta> {
    return await this.encuestasService.obtenerEncuesta(
      id,
      dto.codigo,
      dto.tipo,
    );
  }

  @Patch(':id/habilitar')
  async cambiarEstadoEncuesta(
    @Param('id') id: number,
    @Body('habilitada') habilitada: boolean,
  ): Promise<{ mensaje: string }> {
    return await this.encuestasService.actualizarEstadoEncuesta(id, habilitada);
  }

  @Patch(':id')
  async actualizarEncuesta(
    @Param('id') id: number,
    @Body() dto: UpdateEncuestaDto,
  ): Promise<Encuesta> {
    return await this.encuestasService.actualizarEncuesta(id, dto);
  }
}
