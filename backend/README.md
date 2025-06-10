# ⚙️ Backend - Sistema de Encuestas Anónimas

Este es el backend de "Sistema de Encuestas" desarrollado con NestJS y que se conecta a una base de datos PostgreSQL usando TypeORM.

---

## 🚀 Tecnologías usadas

- **NestJS** – Framework para el backend (Node.js + TypeScript)  
- **TypeORM** – ORM para manejar la base de datos  
- **PostgreSQL** – Base de datos relacional   
- **PM2** – Para correr en producción  

---

## 🛠️ Instalación y ejecución

Instalar las dependencias y configurar el archivo .env y ecosystem.config completando con tus datos. Por ultimo, iniciá el servidor en desarrollo:

```bash
   cd backend
   npm install
   npm run start:dev
```

---

## 📌 Endpoints principales

```POST /encuestas``` → Crea una nueva encuesta 

```POST /respuestas/:id/:tokenParticipacion``` → Envía las respuestas a una encuesta validando el token de participación.

```GET /resultados/:tokenVisualizacion``` → Obtiene los resultados de una encuesta por token de visualización 

---

## 🧪 Pruebas realizadas con Postman

🔗 https://www.postman.com/avionics-geoscientist-88904743/tp/collection/usfuvk2/tp-daw-sist-de-encuestas?action=share&creator=35951605
