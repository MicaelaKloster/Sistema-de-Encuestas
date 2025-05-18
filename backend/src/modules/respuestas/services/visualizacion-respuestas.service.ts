import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Respuesta } from '../entities/respuesta.entity';
import { RespuestaAbierta } from '../entities/respuesta-abierta.entity';
import { RespuestaOpcion } from '../entities/respuesta-opciones.entity';
import { Encuesta } from '../../encuestas/entities/encuesta.entity';
import { Pregunta } from '../preguntas/entities/pregunta.entity';
import { Opcion } from '../../encuestas/entities/opcion.entity';
import { RegistrarRespuestasDto } from '../dto/registrar-respuestas.dto';
import { VisualizarRespuestasDto } from '../dto/visualizar-respuestas.dto';





 async visualizarRespuestas(codigoVisualizacion: string): Promise<VisualizarRespuestasDto> {
    // Encontrar la encuesta
    const encuesta = await this.encuestaRepository.findOne({
      where: { codigo_resultados: codigoVisualizacion },
      relations: ['preguntas', 'preguntas.opciones'],
    });

    if (!encuesta) {
      throw new NotFoundException('Encuesta no encontrada o enlace inválido');
    }

    // Obtener todas las respuestas de la encuesta
    const respuestas = await this.respuestaRepository.find({
      where: { id_encuesta: encuesta.id },
    });

    // Construir el resultado
    const resultado: VisualizarRespuestasDto = {
      id: encuesta.id,
      nombre: encuesta.nombre,
      codigo_respuesta: encuesta.codigo_respuesta,
      codigo_resultados: encuesta.codigo_resultados,
      fecha_creacion: encuesta.fecha_creacion,
      preguntas: [],
    };

    // Procesar cada pregunta
    for (const pregunta of encuesta.preguntas) {
      const preguntaConRespuestas = {
        id: pregunta.id,
        numero: pregunta.numero,
        texto: pregunta.texto,
        tipo: pregunta.tipo,
        opciones: [],
        respuestas_abiertas: [],
      };

      if (pregunta.tipo === 'ABIERTA') {
        // Obtener respuestas abiertas
        const respuestasAbiertas = await this.respuestaAbiertaRepository.find({
          where: { id_pregunta: pregunta.id },
        });
        preguntaConRespuestas.respuestas_abiertas = respuestasAbiertas.map(r => r.texto);
      } else {
        // Obtener estadísticas de opciones
        for (const opcion of pregunta.opciones) {
          const cantidadRespuestas = await this.respuestaOpcionRepository.count({
            where: { id_opcion: opcion.id },
          });

          preguntaConRespuestas.opciones.push({
            id: opcion.id,
            texto: opcion.texto,
            numero: opcion.numero,
            cantidad_respuestas: cantidadRespuestas,
          });
        }
      }

      resultado.preguntas.push(preguntaConRespuestas);
    }

    return resultado;
  }



