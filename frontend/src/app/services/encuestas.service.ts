import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateEncuestaDTO } from '../interfaces/create-encuesta.dto';
import { Observable } from 'rxjs';
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
import { EncuestaDTO } from '../interfaces/encuesta.dto';

@Injectable({ providedIn: 'root' }) // Hace que el servicio esté disponible en toda la app
export class EncuestasService {
  private httpClient = inject(HttpClient); // Inyección del servicio HttpClient para hacer peticiones HTTP

  // Método para crear una nueva encuesta
  crearEncuesta(dto: CreateEncuestaDTO): Observable<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
  }> {
    // Realiza una petición POST al backend para crear la encuesta
    return this.httpClient.post<{
      id: number;
      codigoRespuesta: string;
      codigoResultados: string;
    }>('/api/v1/encuestas', dto);
  }

  // Método para obtener una encuesta por ID, código y tipo de código
  traerEncuesta(
    idEncuesta: number,
    codigo: string,
    tipo: CodigoTipoEnum,
  ): Observable<EncuestaDTO> {
    // Realiza una petición GET al backend para traer los datos de la encuesta
    return this.httpClient.get<EncuestaDTO>(
      '/api/v1/encuestas/' + idEncuesta + '?codigo=' + codigo + '&tipo=' + tipo,
    );
  }

  // Método de prueba para traer una encuesta y mostrar el resultado por consola
  test() {
    this.traerEncuesta(1, 'codigo-test', CodigoTipoEnum.RESPUESTA).subscribe({
      next: (res) => console.log(res), // Muestra la respuesta si es exitosa
      error: (err) => console.log(err), // Muestra el error si ocurre
    });
  }
}