# 🎨 Frontend - Sistema de Encuestas

Este es el **cliente web** de "Sistema de Encuestas", desarrollado en Angular con PrimeNG. Permite crear encuestas, agregar preguntas (abiertas o de opción múltiple), y gestionar respuestas mediante una interfaz simple y agradable.

---

## 🚀 Tecnologías usadas

- [Angular](https://angular.io/) — Framework SPA
- [PrimeNG](https://primeng.org/) — Componentes UI (botones, inputs, diálogo)
- [TypeScript](https://www.typescriptlang.org/) — Tipado moderno
- CSS personalizado — Diseño limpio y responsivo

---

## 📦 Estructura del proyecto

frontend/

├── src/

│ ├── app/

│ │ ├── navbar/ ← Barra superior

│ │ ├── banner/ ← Imagen + anuncio

│ │ ├── creacion-encuesta/ ← Formulario de creación

│ │ ├── gestion-pregunta-dialog/ ← Diálogo agregar/editar pregunta

│ │ ├── gestion-opcion-dialog/ ← Diálogo gestionar opciones

│ │ └── texto-error/ ← Componente de mensajes de error

│ ├── assets/ ← Imágenes y recursos estáticos

│ ├── environments/ ← Configuración de entorno

│ └── styles.css ← Estilos globales

└── README.md ← Este archivo

---

## 🛠️ Instalación y ejecución

Asegurate de tener Node.js (v16+) y Angular CLI instalados:

```bash
cd frontend
npm install
ng serve

La app se levantará en: http://localhost:4200
