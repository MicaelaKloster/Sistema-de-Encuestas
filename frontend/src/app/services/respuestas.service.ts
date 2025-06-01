// respuesta.service.ts
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// ✅ INTERFACES PARA USO INTERNO DEL FRONTEND
export type TipoRespuesta =
  | 'ABIERTA'
  | 'OPCION_MULTIPLE_SELECCION_SIMPLE'
  | 'OPCION_MULTIPLE_SELECCION_MULTIPLE'
  | 'VERDADERO_FALSO';

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

// ✅ INTERFACE PARA USO INTERNO - mantiene la estructura que usa tu componente
export interface RespuestaUsuario {
  numeroPregunta: number;
  opciones: number[];
  texto: string;
}

// ✅ NUEVAS INTERFACES ALINEADAS CON EL BACKEND
export interface RespuestaPreguntaDto {
  id_pregunta: number;
  tipo: TipoRespuesta;
  texto?: string;
  opciones?: number[];
}

export interface RegistrarRespuestasDto {
  respuestas: RespuestaPreguntaDto[];
}

// ✅ INTERFACES PARA RESPUESTAS DE LA API
export interface EncuestaResponse {
  message: string;
  data: Encuesta;
}

@Injectable({
  providedIn: 'root',
})
export class RespuestaService {
  private API_URL = 'http://localhost:3001/api/v1';

  constructor(private http: HttpClient) {}

  //Obtener encuesta para participar
  obtenerEncuestaParaParticipacion(
    id: number,
    token: string,
  ): Observable<EncuestaResponse> {
    return this.http
      .get<EncuestaResponse>(
        `${this.API_URL}/encuestas/participar/${id}/${token}`,
      )
      .pipe(catchError(this.handleError));
  }

  // ✅ MÉTODO ACTUALIZADO - ahora acepta el DTO correcto
  registrarRespuestas(
    id: number,
    codigo: string,
    payload: RegistrarRespuestasDto,
  ): Observable<any> {
    return this.http
      .post(`${this.API_URL}/respuestas/${id}/${codigo}`, payload)
      .pipe(catchError(this.handleError));
  }

  // Ver resultados
  visualizarResultados(tokenVisualizacion: string): Observable<any> {
    return this.http
      .get(`${this.API_URL}/respuestas/resultados/${tokenVisualizacion}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;

      // ✅ AGREGADO - Log más detallado para debugging
      if (error.error) {
        console.error('Detalles del error del servidor:', error.error);
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
