import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { TiposRespuestaEnum } from '../enums/tipos-pregunta.enum';
import { OpcionDTO } from '../interfaces/opcion.dto';

// Validador personalizado para asegurar que las preguntas de tipo opción tengan al menos una opción
export const opcionesNoVacias: ValidatorFn = (
  formGroup: AbstractControl,
): ValidationErrors | null => {
  const group = formGroup as FormGroup;
  const controlTipo = group.get('tipo'); // Control que indica el tipo de pregunta
  const controlOpciones = group.get('opciones'); // Control que contiene las opciones

  // Si no hay tipo o no hay opciones, no se valida (no hay error)
  if (!controlTipo?.value || !controlOpciones?.value) {
    return null;
  }

  // Si es una pregunta de opción y no tiene opciones, retorna error
  if (
    esMultipleChoice(controlTipo.value) &&
    !tieneItems(controlOpciones.value)
  ) {
    return { opcionesRequeridas: true }; // Error: se requieren opciones
  }

  return null; // No hay errores de validación
};

// Función auxiliar para saber si el tipo de pregunta es de opción múltiple o simple
function esMultipleChoice(tipo: TiposRespuestaEnum): boolean {
  return [
    TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE,
    TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE,
  ].includes(tipo);
}

// Función auxiliar para verificar que el array de opciones tenga al menos un elemento
function tieneItems(array: FormControl<OpcionDTO>[]): boolean {
  return array.length > 0;
}