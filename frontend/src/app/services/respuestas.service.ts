import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncuestaDTO } from '../interfaces/encuesta.dto';
import { RegistrarRespuestasDTO } from '../interfaces/respuesta.dto';

@Injectable({ providedIn: 'root' })
export class RespuestasService {
  private httpClient = inject(HttpClient);

  // Método para obtener una encuesta por su código de participación
  obtenerEncuestaParaParticipar(codigo: string): Observable<{
    id: number;
    nombre: string;
    preguntas: any[];
  }> {
    return this.httpClient.get<{
      id: number;
      nombre: string;
      preguntas: any[];
    }>(`/api/v1/encuestas/participar/${codigo}`);
  }

  // Método para registrar las respuestas de una encuesta
  registrarRespuestas(
    id: number,
    tokenParticipacion: string,
    respuestas: RegistrarRespuestasDTO
  ): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      `/api/v1/respuestas/participar/${id}/${tokenParticipacion}`,
      respuestas
    );
  }

  // Método para obtener los resultados de una encuesta por código de resultados
  obtenerResultadosEncuesta(codigoResultados: string): Observable<{
    message: string;
    data: {
      id: number;
      nombre: string;
      codigoRespuesta: string;
      codigoResultados: string;
      preguntas: any[];
    };
  }> {
    return this.httpClient.get<{
      message: string;
      data: {
        id: number;
        nombre: string;
        codigoRespuesta: string;
        codigoResultados: string;
        preguntas: any[];
      };
    }>(`/api/v1/encuestas/resultados/${codigoResultados}`);
  }
}
