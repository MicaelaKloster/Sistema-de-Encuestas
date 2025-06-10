import { Component, computed, input, signal } from '@angular/core';

/**
 * Componente Seccion.
 * Permite definir un contenedor con anchos y márgenes configurables,
 * útil para estructurar secciones de la interfaz con estilos consistentes.
 */
@Component({
  selector: 'app-seccion',
  imports: [],
  templateUrl: './seccion.component.html',
  styleUrl: './seccion.component.css'
})
export class SeccionComponent {
  // Propiedades de entrada para configurar el ancho mínimo, máximo y los márgenes laterales
  minWidth = input<string>('40vw');
  maxWidth = input<string>('70vw');
  leftMargin = input<string>('15vw');
  rightMargin = input<string>('15vw');

  /**
   * Computa el objeto de estilos CSS a aplicar al contenedor,
   * utilizando los valores de entrada definidos.
   */
  style = computed(() => {
    return {
      'min-width': this.minWidth(),
      'max-width': this.maxWidth(),
      'margin-left': this.leftMargin(),
      'margin-right': this.rightMargin(),
    };
  });
}
