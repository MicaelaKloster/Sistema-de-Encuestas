import { Module } from '@nestjs/common'; // Decorador para definir un módulo en NestJS
import { ConfigModule, ConfigService } from '@nestjs/config'; // Módulo y servicio para manejar configuraciones
import configuration from './config/configuration'; // Archivo de configuración personalizado
import { EncuestasModule } from './modules/encuestas/encuestas.module'; // Módulo de encuestas
import { RespuestasModule } from './modules/respuestas/respuestas.module'; // Módulo de respuestas
import { TypeOrmModule } from '@nestjs/typeorm'; // Módulo para la integración con TypeORM
//import { RespuestasModule } from './modules/respuestas/respuestas.module';

@Module({
  imports: [
    // Importa el módulo de encuestas
    EncuestasModule,
    // Importa el módulo de respuestas
    RespuestasModule,

    // Configuración global del módulo de configuración
    ConfigModule.forRoot({
      load: [configuration], // Carga la configuración personalizada desde un archivo
      isGlobal: true, // Hace que el módulo de configuración sea accesible globalmente
      //ignoreEnvFile: process.env.NODE_ENV === 'production', // Ignora el archivo .env si el entorno es producción
    }),

    // Configuración de TypeORM para la conexión con la base de datos
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importa el módulo de configuración para acceder a las variables de entorno
      inject: [ConfigService], // Inyecta el servicio de configuración
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Tipo de base de datos (PostgreSQL)
        host: configService.get('database.host'), // Host de la base de datos
        port: configService.get('database.port'), // Puerto de la base de datos
        username: configService.get('database.username'), // Usuario de la base de datos
        password: configService.get('database.password'), // Contraseña de la base de datos
        database: configService.get('database.name'), // Nombre de la base de datos
        synchronize: false, // Desactiva la sincronización automática (recomendado en producción)
        autoLoadEntities: true, // Carga automáticamente las entidades registradas
        logging: configService.get('database.logging'), // Habilita o deshabilita el registro de consultas
        logger: configService.get('database.logger'), // Define el tipo de logger para la base de datos
      }),
    }),
  ],
})
export class AppModule {} // Exporta la clase del módulo principal
