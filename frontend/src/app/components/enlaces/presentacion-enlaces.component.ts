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
  confettiWaves: any[] = [];
  currentWave = 0;

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
        this.startConfettiAnimation();
      }, 400);
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

  // Método para iniciar la animación de confeti por ondas
  private startConfettiAnimation() {
    this.showAnimation = true;
    this.confettiWaves = [];
    this.currentWave = 0;

    // Crear 6 ondas de confeti con intensidad decreciente
    const waveIntensities = [1.0, 0.8, 0.6, 0.4, 0.25, 0.1];

    waveIntensities.forEach((intensity, index) => {
      setTimeout(() => {
        this.createConfettiWave(intensity, index);
      }, index * 800); // Cada onda aparece 800ms después de la anterior
    });

    // Terminar la animación después de que todas las ondas hayan terminado
    setTimeout(() => {
      this.showAnimation = false;
      this.confettiWaves = [];
    }, 12000); // 12 segundos total
  }

  // Método para crear una onda de confeti
  private createConfettiWave(intensity: number, waveIndex: number) {
    const wave = {
      id: waveIndex,
      intensity: intensity,
      particles: this.generateWaveParticles(intensity),
      active: true
    };

    this.confettiWaves.push(wave);

    // Desactivar esta onda después de su duración
    setTimeout(() => {
      const waveToRemove = this.confettiWaves.find(w => w.id === waveIndex);
      if (waveToRemove) {
        waveToRemove.active = false;
      }
    }, 4000 + (intensity * 2000)); // Duración variable según intensidad
  }

  // Método para generar partículas para una onda específica
  private generateWaveParticles(intensity: number) {
    const baseCount = {
      stars: 15,
      hearts: 10,
      celebration: 8,
      sparkles: 12,
      geometric: 40
    };

    return {
      stars: Array(Math.floor(baseCount.stars * intensity)).fill(0).map(() => this.generateRandomParticle()),
      hearts: Array(Math.floor(baseCount.hearts * intensity)).fill(0).map(() => this.generateRandomParticle()),
      celebration: Array(Math.floor(baseCount.celebration * intensity)).fill(0).map(() => this.generateRandomParticle()),
      sparkles: Array(Math.floor(baseCount.sparkles * intensity)).fill(0).map(() => this.generateRandomParticle()),
      geometric: Array(Math.floor(baseCount.geometric * intensity)).fill(0).map(() => this.generateRandomParticle())
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
      delay: Math.random() * 1.5,  // Delay aleatorio más corto (0-1.5 segundos)
      duration: 3 + Math.random() * 4, // Duración más larga (3-7 segundos)
      rotation: Math.random() * 360, // Rotación inicial aleatoria
      scale: 0.6 + Math.random() * 0.8, // Escala más consistente (0.6-1.4)
      color: this.getRandomColor(),
      velocity: 0.5 + Math.random() * 1.5, // Velocidad de caída (0.5-2)
      swing: Math.random() * 60 - 30, // Movimiento de balanceo (-30 a 30 grados)
      fadeOut: 0.8 + Math.random() * 0.2 // Momento de desvanecimiento (80-100% de la duración)
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

  // Métodos para obtener partículas de todas las ondas activas
  getAllWaveStars() {
    return this.confettiWaves
      .filter(wave => wave.active)
      .flatMap(wave => wave.particles.stars || []);
  }

  getAllWaveHearts() {
    return this.confettiWaves
      .filter(wave => wave.active)
      .flatMap(wave => wave.particles.hearts || []);
  }

  getAllWaveCelebration() {
    return this.confettiWaves
      .filter(wave => wave.active)
      .flatMap(wave => wave.particles.celebration || []);
  }

  getAllWaveSparkles() {
    return this.confettiWaves
      .filter(wave => wave.active)
      .flatMap(wave => wave.particles.sparkles || []);
  }

  getAllWaveGeometric() {
    return this.confettiWaves
      .filter(wave => wave.active)
      .flatMap(wave => wave.particles.geometric || []);
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