import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export type TipoRespuesta = 'ABIERTA' | 'OPCION_MULTIPLE_SELECCION_SIMPLE' | 'OPCION_MULTIPLE_SELECCION_MULTIPLE' | 'VERDADERO_FALSO';

export interface OpcionRespuesta {
  id: number;
  numero: number;
  texto: string;
}

export interface Pregunta {
  id: number;
  numero: number;
  texto: string;
  tipo: TipoRespuesta;
  obligatoria: boolean;
  opciones?: OpcionRespuesta[];
}

export interface Encuesta {
  id: number;
  nombre: string;
  descripcion?: string;
  preguntas: Pregunta[];
}

export interface RespuestaUsuario {
  numeroPregunta: number;
  opciones: number[];
  texto: string;
}

export interface RespuestaPreguntaDto {
  id_pregunta: number;
  tipo: TipoRespuesta;
  texto?: string;
  opciones?: number[];
}

export interface RegistrarRespuestasDto {
  respuestas: RespuestaPreguntaDto[];
}

export interface EncuestaResponse {
  message: string;
  data: Encuesta;
}

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
    let errorMessage = 'Ha ocurrido un error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
      if (error.error) {
        console.error('Detalles del error del servidor:', error.error);
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
