import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OpcionRespuesta } from '../interfaces/respuesta.dto';
import { Pregunta } from '../interfaces/respuesta.dto';
import { Encuesta } from '../interfaces/respuesta.dto';
import { RespuestaUsuario } from '../interfaces/respuesta.dto';
import { RespuestaPreguntaDto } from '../interfaces/respuesta.dto';
import { RegistrarRespuestasDto } from '../interfaces/respuesta.dto';
import { EncuestaResponse } from '../interfaces/respuesta.dto';

@Injectable({ providedIn: 'root' })
export class RespuestasService {
  private httpClient = inject(HttpClient);

  obtenerEncuestaParaParticipacion(id: number, token: string): Observable<EncuestaResponse> {
    return this.httpClient.get<any>(`/api/v1/encuestas/estructura/${token}`)
      .pipe(
        catchError(this.handleError),
        map(response => ({
          message: 'Encuesta obtenida exitosamente',
          data: {
            id: response.id,
            nombre: response.nombre,
            preguntas: response.preguntas.map((pregunta: any) => ({
              id: pregunta.id,
              numero: pregunta.numero,
              texto: pregunta.texto,
              tipo: pregunta.tipo,
              obligatoria: true,
              opciones: pregunta.opciones || []
            }))
          }
        }))
      );
  }

  registrarRespuestas(id: number, codigo: string, payload: RegistrarRespuestasDto): Observable<any> {
    return this.httpClient.post(`/api/v1/respuestas/${id}/${codigo}`, payload)
      .pipe(catchError(this.handleError));
  }

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
    }>(`/api/v1/encuestas/resultados/${codigoResultados}`)
      .pipe(catchError(this.handleError));
  }

  // Método para exportar resultados a CSV
  exportarResultadosCSV(idEncuesta: number, codigoResultados: string): Observable<Blob> {
    return this.httpClient.get(`/api/v1/encuestas/${idEncuesta}/csv/${codigoResultados}`, {
      responseType: 'blob'
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error HTTP:', error);

    // Preservar el error original para mantener el status y otros datos
    // Solo agregar información adicional si es necesario
    if (error.error) {
      console.error('Detalles del error del servidor:', error.error);
    }

    // Retornar el error original para que el componente pueda acceder al status
    return throwError(() => error);
  }
}
