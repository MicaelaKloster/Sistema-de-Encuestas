import {
  Component,
  effect,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextoErrorComponent } from '../texto-error/texto-error.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

// Componente para gestionar el diálogo de agregar una opción a una pregunta
@Component({
  selector: 'app-gestion-opcion-dialog',
  imports: [
    DialogModule,
    ReactiveFormsModule,
    FloatLabelModule,
    TextoErrorComponent,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './gestion-opcion-dialog.component.html',
  styleUrl: './gestion-opcion-dialog.component.css',
})
export class GestionOpcionDialogComponent {
  visible = model.required<boolean>(); // Controla la visibilidad del diálogo

  agregarOpcion = output<string>(); // Evento de salida para agregar una opción

  form: FormGroup; // Formulario reactivo para la opción

  private messageService: MessageService = inject(MessageService); // Servicio para mostrar mensajes

  constructor() {
    // Inicializa el formulario con un campo de texto requerido
    this.form = new FormGroup({
      texto: new FormControl<string>('', Validators.required),
    });

    // Efecto que resetea el formulario cada vez que el diálogo se hace visible
    effect(() => {
      if (this.visible()) {
        this.form.reset();
      }
    });
  }

  // Getter para el control de texto del formulario
  get texto(): FormControl<string> {
    return this.form.get('texto') as FormControl<string>;
  }

  // Método para agregar la opción si el formulario es válido
  agregar() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Hay errores en el formulario',
        life: 4000
      });
      return;
    }

    const opcion: string = this.form.get('texto')?.value;
    this.agregarOpcion.emit(opcion); // Emite la opción al componente padre
    this.cerrar(); // Cierra el diálogo
  }

  // Método para cerrar el diálogo
  cerrar() {
    this.visible.set(false);
  }
}
