import { OpcionDTO } from './opcion.dto';

// Tipo para crear una nueva opción, basado en OpcionDTO pero solo con las propiedades 'numero' y 'texto'
export type CreateOpcionDTO = Pick<OpcionDTO, 'numero' | 'texto'>;
