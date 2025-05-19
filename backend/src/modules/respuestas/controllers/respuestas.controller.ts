import {
  Controller,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RespuestasService } from '../services/respuestas.service';
import { RegistrarRespuestasDto } from '../dtos/registrar-respuestas.dto';

@Controller('respuestas')
export class RespuestasController {
  constructor(private readonly respuestasService: RespuestasService) {}

  @Post(':tokenParticipacion')
  @HttpCode(HttpStatus.CREATED)
  async registrarRespuestas(
    @Param('tokenParticipacion') tokenParticipacion: string,
    @Body() registrarRespuestasDto: RegistrarRespuestasDto,
  ): Promise<{ message: string }> {
    await this.respuestasService.registrarRespuestas(
      tokenParticipacion,
      registrarRespuestasDto,
    );
    return { message: 'Respuestas registradas exitosamente' };
  }
}
