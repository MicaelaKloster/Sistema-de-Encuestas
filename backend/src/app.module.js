'use strict';
var __esDecorate =
  (this && this.__esDecorate) ||
  function (
    ctor,
    descriptorIn,
    decorators,
    contextIn,
    initializers,
    extraInitializers,
  ) {
    function accept(f) {
      if (f !== void 0 && typeof f !== 'function')
        throw new TypeError('Function expected');
      return f;
    }
    var kind = contextIn.kind,
      key = kind === 'getter' ? 'get' : kind === 'setter' ? 'set' : 'value';
    var target =
      !descriptorIn && ctor
        ? contextIn['static']
          ? ctor
          : ctor.prototype
        : null;
    var descriptor =
      descriptorIn ||
      (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _,
      done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === 'access' ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) {
        if (done)
          throw new TypeError(
            'Cannot add initializers after decoration has completed',
          );
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(
        kind === 'accessor'
          ? { get: descriptor.get, set: descriptor.set }
          : descriptor[key],
        context,
      );
      if (kind === 'accessor') {
        if (result === void 0) continue;
        if (result === null || typeof result !== 'object')
          throw new TypeError('Object expected');
        if ((_ = accept(result.get))) descriptor.get = _;
        if ((_ = accept(result.set))) descriptor.set = _;
        if ((_ = accept(result.init))) initializers.unshift(_);
      } else if ((_ = accept(result))) {
        if (kind === 'field') initializers.unshift(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  };
var __runInitializers =
  (this && this.__runInitializers) ||
  function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue
        ? initializers[i].call(thisArg, value)
        : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
  };
var __setFunctionName =
  (this && this.__setFunctionName) ||
  function (f, name, prefix) {
    if (typeof name === 'symbol')
      name = name.description ? '['.concat(name.description, ']') : '';
    return Object.defineProperty(f, 'name', {
      configurable: true,
      value: prefix ? ''.concat(prefix, ' ', name) : name,
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppModule = void 0;
var common_1 = require('@nestjs/common'); // Decorador para definir un módulo en NestJS
var config_1 = require('@nestjs/config'); // Módulo y servicio para manejar configuraciones
var configuration_1 = require('./config/configuration'); // Archivo de configuración personalizado
var encuestas_module_1 = require('./modules/encuestas/encuestas.module'); // Módulo de encuestas
var typeorm_1 = require('@nestjs/typeorm'); // Módulo para la integración con TypeORM
var preguntas_module_1 = require('./modules/preguntas/preguntas.module');
var respuestas_module_1 = require('./modules/respuestas/respuestas.module');
var opciones_module_1 = require('./modules/opciones/opciones.module');
var AppModule = (function () {
  var _classDecorators = [
    (0, common_1.Module)({
      imports: [
        // Importa el módulo de encuestas y preguntas
        encuestas_module_1.EncuestasModule,
        preguntas_module_1.PreguntasModule,
        respuestas_module_1.RespuestasModule,
        opciones_module_1.OpcionesModule,
        // Configuración global del módulo de configuración
        config_1.ConfigModule.forRoot({
          load: [configuration_1.default], // Carga la configuración personalizada desde un archivo
          isGlobal: true, // Hace que el módulo de configuración sea accesible globalmente
          ignoreEnvFile: process.env.NODE_ENV === 'production', // Ignora el archivo .env si el entorno es producción
        }),
        // Configuración de TypeORM para la conexión con la base de datos
        typeorm_1.TypeOrmModule.forRootAsync({
          imports: [config_1.ConfigModule], // Importa el módulo de configuración para acceder a las variables de entorno
          inject: [config_1.ConfigService], // Inyecta el servicio de configuración
          useFactory: function (configService) {
            return {
              type: 'postgres', // Tipo de base de datos (PostgreSQL)
              host: configService.get('database.host'), // Host de la base de datos
              port: configService.get('database.port'), // Puerto de la base de datos
              username: configService.get('database.username'), // Usuario de la base de datos
              password: configService.get('database.password'), // Contraseña de la base de datos
              database: configService.get('database.name'), // Nombre de la base de datos
              synchronize: true, // Temporalmente habilitado para sincronizar la estructura de la base de datos
              autoLoadEntities: true, // Carga automáticamente las entidades registradas
              logging: configService.get('database.logging'), // Habilita o deshabilita el registro de consultas
              logger: configService.get('database.logger'), // Define el tipo de logger para la base de datos
            };
          },
        }),
      ],
    }),
  ];
  var _classDescriptor;
  var _classExtraInitializers = [];
  var _classThis;
  var AppModule = (_classThis = /** @class */ (function () {
    function AppModule_1() {}
    return AppModule_1;
  })());
  __setFunctionName(_classThis, 'AppModule');
  (function () {
    var _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    AppModule = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (AppModule = _classThis);
})(); // Exporta la clase del módulo principal
exports.AppModule = AppModule;
