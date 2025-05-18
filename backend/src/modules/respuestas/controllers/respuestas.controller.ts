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
//import { VisualizarRespuestasDto } from './dto/visualizar-respuestas.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('respuestas')
@Controller('respuestas')
export class RespuestasController {
  constructor(private readonly respuestasService: RespuestasService) {}

  @Post(':tokenParticipacion')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar respuestas: ' })
  @ApiParam({
    name: 'tokenParticipacion',
    description: 'Token de participación',
    example: 'abc123def456',
  })
  @ApiBody({ type: RegistrarRespuestasDto })
  @ApiResponse({
    status: 201,
    description: '¡Sus respuestas fueron registradas con éxito!',
  })
  @ApiResponse({
    status: 404,
    description: 'Error: la encuesta no fue encontrada o el enlace es inválido',
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos ingresados son inválidos',
  })
  async registrarRespuestas(
    @Param('tokenParticipacion') tokenParticipacion: string,
    @Body() registrarRespuestasDto: RegistrarRespuestasDto,
  ): Promise<{ message: string }> {
    await this.respuestasService.registrarRespuestas(
      tokenParticipacion,
      registrarRespuestasDto,
    );
    return { message: '¡Sus respuestas fueron registradas con éxito!' };
  }
}
