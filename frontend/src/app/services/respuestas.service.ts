 /**
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  private API_URL = 'http://localhost:3001/api/v1'; 

  constructor(private http: HttpClient) {}

  // Obtener encuesta para participar
  obtenerEncuestaParaParticipacion(id: number, token: string): Observable<any> {
    return this.http.get(`${this.API_URL}/respuestas/participar/${id}/${token}`);
  }

  // Enviar respuestas
  registrarRespuestas(id: number, codigo: string, payload: any): Observable<any> {
    return this.http.post(`${this.API_URL}/respuestas/${id}/${codigo}`, payload);
  }

  // Ver resultados
  visualizarResultados(codigoResultados: string): Observable<any> {
    return this.http.get(`${this.API_URL}/respuestas/visualizar/${codigoResultados}`);
  }
}
   */

// respuesta.service.ts 
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interfaces definidas directamente en el servicio
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

export interface EncuestaResponse {
  message: string;
  data: Encuesta;
}

export interface EnviarRespuestasPayload {
  respuestas: RespuestaUsuario[];
}

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  private API_URL = 'http://localhost:3001/api/v1'; 

  constructor(private http: HttpClient) {}

  // Obtener encuesta para participar
  obtenerEncuestaParaParticipacion(id: number, token: string): Observable<EncuestaResponse> {
    return this.http.get<EncuestaResponse>(`${this.API_URL}/respuestas/participar/${id}/${token}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Enviar respuestas
  registrarRespuestas(id: number, codigo: string, payload: EnviarRespuestasPayload): Observable<any> {
    return this.http.post(`${this.API_URL}/respuestas/${id}/${codigo}`, payload)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Ver resultados 
  visualizarResultados(tokenVisualizacion: string): Observable<any> {
    return this.http.get(`${this.API_URL}/respuestas/resultados/${tokenVisualizacion}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
