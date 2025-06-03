import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Clipboard } from '@angular/cdk/clipboard';
import { QRCodeComponent } from 'angularx-qrcode';
import { Router } from '@angular/router';


@Component({
  selector: 'app-presentacion-enlaces',
  imports: [
    CommonModule,
    QRCodeComponent,
    RouterModule,
    ButtonModule],
  templateUrl: './presentacion-enlaces.component.html',
  styleUrl: './presentacion-enlaces.component.css',
})
export class PresentacionEnlacesComponent implements OnInit {

  // Servicios y utilidades inyectados
  private route = inject(ActivatedRoute); // Obtener parámetros de la URL
  private router = inject(Router); // Redireccionar
  private clipboard = inject(Clipboard); // Copiar enlaces

  // Variables para almacenar los códigos recibidos por la URL
  codigoRespuesta = '';
  codigoResultados = '';
  idEncuesta = '';

  // Variables para almacenar los enlaces generados
  enlaceParticipacion = '';
  enlaceResultados = '';

  // Variables para la animación de confeti festivo MASIVO
  showAnimation = false;

  // Variables para la notificación de copia
  showCopyNotification = false;
  confetti: any = {};

  // Colores festivos para el confeti
  colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
    '#A3E4D7', '#FAD7A0', '#D5A6BD', '#AED6F1', '#A9DFBF'
  ];

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    // Inicializar el confeti después de que el componente esté completamente cargado
    this.initializeConfetti();

    this.route.queryParamMap.subscribe((params) => {
      // Obtiene los valores de los parámetros o string vacío si no están
      this.codigoRespuesta = params.get('codigo-respuesta') ?? '';
      this.codigoResultados = params.get('codigo-resultados') ?? '';
      this.idEncuesta = params.get('id-encuesta') ?? '';

      // Genera los enlaces completos usando la URL base (location.origin)
      this.enlaceParticipacion = `${location.origin}/responder/${this.idEncuesta}/${this.codigoRespuesta}`;
      this.enlaceResultados = `${location.origin}/resultados/${this.codigoResultados}`;

      // Activar la animación de confeti festivo después de un pequeño delay
      setTimeout(() => {
        this.showAnimation = true;
        // Desactivar la animación después de 5 segundos para disfrutar más la celebración
        setTimeout(() => {
          this.showAnimation = false;
        }, 5000);
      }, 500);
    });
  }

  // Método para inicializar el confeti de forma segura
  private initializeConfetti() {
    this.confetti = {
      stars: {
        top: Array(15).fill(0).map(() => this.generateRandomParticle()),
        topRight: Array(12).fill(0).map(() => this.generateRandomParticle()),
        right: Array(15).fill(0).map(() => this.generateRandomParticle()),
        bottomRight: Array(12).fill(0).map(() => this.generateRandomParticle()),
        bottom: Array(15).fill(0).map(() => this.generateRandomParticle()),
        bottomLeft: Array(12).fill(0).map(() => this.generateRandomParticle()),
        left: Array(15).fill(0).map(() => this.generateRandomParticle()),
        topLeft: Array(12).fill(0).map(() => this.generateRandomParticle())
      },
      hearts: {
        top: Array(10).fill(0).map(() => this.generateRandomParticle()),
        topRight: Array(8).fill(0).map(() => this.generateRandomParticle()),
        right: Array(10).fill(0).map(() => this.generateRandomParticle()),
        bottomRight: Array(8).fill(0).map(() => this.generateRandomParticle()),
        bottom: Array(10).fill(0).map(() => this.generateRandomParticle()),
        bottomLeft: Array(8).fill(0).map(() => this.generateRandomParticle()),
        left: Array(10).fill(0).map(() => this.generateRandomParticle()),
        topLeft: Array(8).fill(0).map(() => this.generateRandomParticle())
      },
      celebration: {
        top: Array(8).fill(0).map(() => this.generateRandomParticle()),
        topRight: Array(6).fill(0).map(() => this.generateRandomParticle()),
        right: Array(8).fill(0).map(() => this.generateRandomParticle()),
        bottomRight: Array(6).fill(0).map(() => this.generateRandomParticle()),
        bottom: Array(8).fill(0).map(() => this.generateRandomParticle()),
        bottomLeft: Array(6).fill(0).map(() => this.generateRandomParticle()),
        left: Array(8).fill(0).map(() => this.generateRandomParticle()),
        topLeft: Array(6).fill(0).map(() => this.generateRandomParticle())
      },
      sparkles: {
        top: Array(12).fill(0).map(() => this.generateRandomParticle()),
        topRight: Array(10).fill(0).map(() => this.generateRandomParticle()),
        right: Array(12).fill(0).map(() => this.generateRandomParticle()),
        bottomRight: Array(10).fill(0).map(() => this.generateRandomParticle()),
        bottom: Array(12).fill(0).map(() => this.generateRandomParticle()),
        bottomLeft: Array(10).fill(0).map(() => this.generateRandomParticle()),
        left: Array(12).fill(0).map(() => this.generateRandomParticle()),
        topLeft: Array(10).fill(0).map(() => this.generateRandomParticle())
      },
      geometric: {
        circles: Array(40).fill(0).map(() => this.generateRandomParticle()),
        squares: Array(35).fill(0).map(() => this.generateRandomParticle()),
        triangles: Array(30).fill(0).map(() => this.generateRandomParticle()),
        diamonds: Array(25).fill(0).map(() => this.generateRandomParticle())
      }
    };
  }

  // Método para copiar el texto(enlace) al portapapeles con notificación llamativa
  copiar(texto: string) {
    this.clipboard.copy(texto);

    // Mostrar notificación llamativa
    this.showCopyNotification = true;

    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
      this.showCopyNotification = false;
    }, 3000);
  }

  // Método para obtener un color aleatorio para el confeti
  getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  // Método para obtener una posición aleatoria horizontal
  getRandomPosition(): number {
    return Math.floor(Math.random() * 100);
  }

  // Método para obtener una posición aleatoria en los bordes
  getRandomEdgePosition(): number {
    const edges = [0, 100]; // Solo bordes superior e inferior
    return edges[Math.floor(Math.random() * edges.length)];
  }

  // Método para generar una partícula con posición aleatoria
  generateRandomParticle() {
    return {
      left: Math.random() * 100, // Posición horizontal aleatoria (0-100%)
      top: Math.random() * 100,  // Posición vertical aleatoria (0-100%)
      delay: Math.random() * 2,  // Delay aleatorio (0-2 segundos)
      duration: 2 + Math.random() * 3, // Duración aleatoria (2-5 segundos)
      rotation: Math.random() * 360, // Rotación inicial aleatoria
      scale: 0.5 + Math.random() * 1, // Escala aleatoria (0.5-1.5)
      color: this.getRandomColor()
    };
  }

  // Métodos para obtener todas las partículas de cada tipo
  getAllStars() {
    return [
      ...this.confetti.stars.top,
      ...this.confetti.stars.topRight,
      ...this.confetti.stars.right,
      ...this.confetti.stars.bottomRight,
      ...this.confetti.stars.bottom,
      ...this.confetti.stars.bottomLeft,
      ...this.confetti.stars.left,
      ...this.confetti.stars.topLeft
    ];
  }

  getAllHearts() {
    return [
      ...this.confetti.hearts.top,
      ...this.confetti.hearts.topRight,
      ...this.confetti.hearts.right,
      ...this.confetti.hearts.bottomRight,
      ...this.confetti.hearts.bottom,
      ...this.confetti.hearts.bottomLeft,
      ...this.confetti.hearts.left,
      ...this.confetti.hearts.topLeft
    ];
  }

  getAllCelebration() {
    return [
      ...this.confetti.celebration.top,
      ...this.confetti.celebration.topRight,
      ...this.confetti.celebration.right,
      ...this.confetti.celebration.bottomRight,
      ...this.confetti.celebration.bottom,
      ...this.confetti.celebration.bottomLeft,
      ...this.confetti.celebration.left,
      ...this.confetti.celebration.topLeft
    ];
  }

  getAllSparkles() {
    return [
      ...this.confetti.sparkles.top,
      ...this.confetti.sparkles.topRight,
      ...this.confetti.sparkles.right,
      ...this.confetti.sparkles.bottomRight,
      ...this.confetti.sparkles.bottom,
      ...this.confetti.sparkles.bottomLeft,
      ...this.confetti.sparkles.left,
      ...this.confetti.sparkles.topLeft
    ];
  }

  getAllGeometric() {
    return [
      ...this.confetti.geometric.circles,
      ...this.confetti.geometric.squares,
      ...this.confetti.geometric.triangles,
      ...this.confetti.geometric.diamonds
    ];
  }

  // Método para obtener la clase CSS de las formas geométricas
  getGeometricClass(index: number): string {
    const shapes = ['circle', 'square', 'triangle', 'diamond'];
    const totalCircles = this.confetti.geometric.circles.length;
    const totalSquares = this.confetti.geometric.squares.length;
    const totalTriangles = this.confetti.geometric.triangles.length;

    if (index < totalCircles) return 'circle';
    if (index < totalCircles + totalSquares) return 'square';
    if (index < totalCircles + totalSquares + totalTriangles) return 'triangle';
    return 'diamond';
  }

  // Método para obtener la posición del cuadro blanco en el viewport
  getBoxPosition() {
    if (typeof window !== 'undefined') {
      const element = document.querySelector('.contenedor');
      if (element) {
        const rect = element.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height
        };
      }
    }
    return { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
  }

  // Método para volver a la página de inicio
  volverInicio() {
    this.router.navigate(['']);
  }
}