// Importación de módulos y dependencias necesarias
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Creación de la aplicación NestJS a partir del módulo principal
  const app = await NestFactory.create(AppModule);

  // Uso de Helmet para mejorar la seguridad de la aplicación
  app.use(helmet());

  // Obtención del servicio de configuración para acceder a variables de entorno
  const configService = app.get(ConfigService);

  // Configuración del prefijo global para las rutas de la API
  const globalPrefix: string = configService.get('prefix') as string;
  app.setGlobalPrefix(globalPrefix);

  // Habilitación de versionado de la API utilizando el esquema URI (e.g., /v1/)
  app.enableVersioning({
    type: VersioningType.URI, // Define el tipo de versionado como URI
    defaultVersion: '1', // Establece la versión predeterminada
  });

  // Configuración de validación global para las solicitudes entrantes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Permite solo las propiedades definidas en los DTOs
      forbidNonWhitelisted: true, // Rechaza solicitudes con propiedades no permitidas
    }),
  );

  // Configuración de un interceptor global para serializar las respuestas
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Verificación si Swagger está habilitado mediante una variable de entorno
  const swaggerHabilitado: boolean = configService.get(
    'swaggerHabilitado',
  ) as boolean;

  if (swaggerHabilitado) {
    // Configuración de Swagger para la documentación de la API
    const config = new DocumentBuilder()
      .setTitle('Encuestas') // Título de la documentación
      .setDescription('Descripción de la API del sistema de encuestas') // Descripción
      .build();
    const document = SwaggerModule.createDocument(app, config);
    // Configuración del endpoint para acceder a la documentación de Swagger
    SwaggerModule.setup(globalPrefix, app, document);
  }

  // Obtención del puerto desde las variables de entorno y arranque del servidor
  const port: number = configService.get<number>('port') as number;
  await app.listen(port); // La aplicación escucha en el puerto especificado
}

// Llamada a la función principal para iniciar la aplicación
bootstrap();
