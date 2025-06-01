import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-comienzo',
  imports: [ButtonModule, RouterModule],
  templateUrl: './comienzo.component.html',
  styleUrl: './comienzo.component.css',
})
export class ComienzoComponent {}
