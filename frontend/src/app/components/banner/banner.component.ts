import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-banner',
  imports: [ButtonModule, RouterModule, NavbarComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

}
