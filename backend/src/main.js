'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === 'function' ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g['throw'] = verb(1)),
      (g['return'] = verb(2)),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, '__esModule', { value: true });
// Importación de módulos y dependencias necesarias
var core_1 = require('@nestjs/core');
var app_module_1 = require('./app.module');
var helmet_1 = require('helmet');
var config_1 = require('@nestjs/config');
var common_1 = require('@nestjs/common');
var swagger_1 = require('@nestjs/swagger');
function bootstrap() {
  return __awaiter(this, void 0, void 0, function () {
    var app,
      configService,
      globalPrefix,
      swaggerHabilitado,
      config,
      document_1,
      port;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            core_1.NestFactory.create(app_module_1.AppModule),
          ];
        case 1:
          app = _a.sent();
          // Habilitar CORS para permitir solicitudes desde el frontend
          // app.enableCors({
          //   origin: process.env.FRONTEND_URL || 'http://localhost:4200',
          //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          //   credentials: true,
          // });
          // Uso de Helmet para mejorar la seguridad de la aplicación
          app.use((0, helmet_1.default)());
          configService = app.get(config_1.ConfigService);
          globalPrefix = configService.get('prefix');
          app.setGlobalPrefix(globalPrefix);
          // Habilitación de versionado de la API utilizando el esquema URI (e.g., /v1/)
          app.enableVersioning({
            type: common_1.VersioningType.URI, // Define el tipo de versionado como URI
            defaultVersion: '1', // Establece la versión predeterminada
          });
          // Configuración de validación global para las solicitudes entrantes
          app.useGlobalPipes(
            new common_1.ValidationPipe({
              whitelist: true, // Permite solo las propiedades definidas en los DTOs
              forbidNonWhitelisted: true, // Rechaza solicitudes con propiedades no permitidas
            }),
          );
          // Configuración de un interceptor global para serializar las respuestas
          app.useGlobalInterceptors(
            new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)),
          );
          swaggerHabilitado = configService.get('swaggerHabilitado');
          if (swaggerHabilitado) {
            config = new swagger_1.DocumentBuilder()
              .setTitle('Encuestas') // Título de la documentación
              .setDescription('Descripción de la API del sistema de encuestas') // Descripción
              .build();
            document_1 = swagger_1.SwaggerModule.createDocument(app, config);
            // Configuración del endpoint para acceder a la documentación de Swagger
            swagger_1.SwaggerModule.setup(globalPrefix, app, document_1);
          }
          port = configService.get('port');
          return [4 /*yield*/, app.listen(port)];
        case 2:
          _a.sent(); // La aplicación escucha en el puerto especificado
          return [2 /*return*/];
      }
    });
  });
}
// Llamada a la función principal para iniciar la aplicación
void bootstrap();
