# 💻 Sistema de Encuestas Anónimas

**Trabajo Final Integrador** 
**Desarrollo de Aplicaciones Web - 2025**  
**Tecnicatura Universitaria en Desarrollo Web (UNER)**

---

## 💡 ¿De qué trata este proyecto?

Este proyecto lo hicimos como parte del trabajo final de la materia Desarrollo de Aplicaciones Web. La idea principal fue desarrollar un **sistema de encuestas anónimas** que pueda usarse sin necesidad de autenticación y que sea fácil de usar para que cualquier persona pueda crear encuestas, compartir un enlace para que otros respondan, y también tener un enlace aparte para ver los resultados.

---

## 👥 Equipo de Desarrollo

- Estefania Altamirano | Funcionalidad adicional: Código QR
- Ignacio Rocha | Funcionalidad adicional: Preguntas de Verdadero o Falso
- Maia Roszezuk | Funcionalidad adicional: Fecha de vencimiento
- Maria Emilia Van de Linde | Funcionalidad adicional: Exportar respuestas a CSV
- Micaela Kloster | Funcionalidad adicional: Habilitar/Deshabilitar encuestas

---

## ▶️ Video de Presentación

🔗 Link al video  

---

## 📌 Objetivos

- El objetivo principal fue poner en práctica los conocimientos adquiridos durante la cursada, desarrollando una aplicación web funcional que cumpla con los requerimientos pautados.
- Aplicar buenas prácticas de desarrollo backend y frontend.
- Garantizar una experiencia fluida y segura para los usuarios.
- Que cada integrante agregue una funcionalidad adicional al sistema.

---

## 📌 Funcionalidades Principales

- Creación de encuestas anónimas sin autenticación.
- Generación automática de dos enlaces por encuesta:
  - Enlace de participación (para responder).
  - Enlace de visualización (para ver las respuestas).
- Soporte para distintos tipos de preguntas:
  - Preguntas abiertas.
  - Preguntas de opción múltiple:
    - Selección simple.
    - Selección múltiple.
- No se guarda ningún dato personal y si se pierde el link de resultados, no hay forma de recuperarlo.

---

## ⚙️ Tecnologías Utilizadas

- **NestJS** para el backend.
- **TypeORM** para manejar la base de datos.
- **PostgreSQL** como base de datos.
- **Angular** para el frontend.
- **nginx** como servidor.
- **PM2** para correr el backend en producción.

---

## 📁 Cómo Ejecutar el Proyecto

1. Clonar este repositorio:
   ```bash
   https://github.com/MicaelaKloster/Sistema-de-Encuestas.git
   ```

2. Instalar dependencias backend y frontend:
   ```bash
   cd backend
   npm install

   cd frontend
   npm install
   ```

3. Configurar la base de datos PostgreSQL en `.env`y `ecosystem.config`.

4. Ejecutar backend:
   ```bash
   npm run deploy
   ```

5. Ejecutar frontend:
   ```bash
   npm run deploy:[sistema operativo que utiliza]
   ```

6. Acceder desde el navegador a `http://localhost:4200`.

---
©️ Este proyecto es de uso educativo y fue realizado como parte de una evaluación académica. Todos los derechos reservados.
