<<<<<<< HEAD
// respuesta.service.ts
=======
import { Injectable, inject } from '@angular/core';
>>>>>>> origin/main
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

<<<<<<< HEAD
// ✅ INTERFACES PARA USO INTERNO DEL FRONTEND
export type TipoRespuesta =
  | 'ABIERTA'
  | 'OPCION_MULTIPLE_SELECCION_SIMPLE'
  | 'OPCION_MULTIPLE_SELECCION_MULTIPLE'
  | 'VERDADERO_FALSO';
=======
export type TipoRespuesta = 'ABIERTA' | 'OPCION_MULTIPLE_SELECCION_SIMPLE' | 'OPCION_MULTIPLE_SELECCION_MULTIPLE' | 'VERDADERO_FALSO';
>>>>>>> origin/main

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

<<<<<<< HEAD
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
=======
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
>>>>>>> origin/main
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
<<<<<<< HEAD

      // ✅ AGREGADO - Log más detallado para debugging
=======
>>>>>>> origin/main
      if (error.error) {
        console.error('Detalles del error del servidor:', error.error);
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
