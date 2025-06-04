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
exports.RespuestasModule = void 0;
// Importación de decoradores y módulos necesarios de NestJS
var common_1 = require('@nestjs/common');
var respuestas_controller_1 = require('./controllers/respuestas.controller'); // Controlador para manejar las rutas relacionadas con respuesta
var respuestas_service_1 = require('./services/respuestas.service'); // Servicio para la lógica de negocio de respuesta
var typeorm_1 = require('@nestjs/typeorm'); // Módulo de TypeORM para la integración con la base de datos
var respuesta_entity_1 = require('./entities/respuesta.entity'); // Entidad que representa la tabla "Respuesta" en la base de datos
var respuesta_abierta_entity_1 = require('./entities/respuesta-abierta.entity'); //Entidad que representa la tabla "Respuesta Abierta" en la base de datos
var respuesta_opcion_entity_1 = require('./entities/respuesta-opcion.entity'); //Entidad que representa la tabla "RespuestaOpciones" en la base de datos
var encuesta_entity_1 = require('../encuestas/entities/encuesta.entity'); // Entidad que representa la tabla "Encuesta" en la base de datos
var pregunta_entity_1 = require('../encuestas/entities/pregunta.entity'); // Entidad que representa la tabla "Pregunta" en la base de datos
var opcion_entity_1 = require('../encuestas/entities/opcion.entity'); // Entidad que representa la tabla "Opción" en la base de datos
var RespuestasModule = (function () {
  var _classDecorators = [
    (0, common_1.Module)({
      // Importación de módulos necesarios para este módulo
      imports: [
        // Configuración de TypeORM para trabajar con las entidades relacionadas
        typeorm_1.TypeOrmModule.forFeature([
          encuesta_entity_1.Encuesta,
          pregunta_entity_1.Pregunta,
          opcion_entity_1.Opcion,
          respuesta_entity_1.Respuesta,
          respuesta_abierta_entity_1.RespuestaAbierta,
          respuesta_opcion_entity_1.RespuestaOpcion,
        ]),
      ],
      // Declaración de los controladores que manejarán las rutas de este módulo
      // Declaración de los proveedores que contienen la lógica de negocio
      controllers: [respuestas_controller_1.RespuestasController],
      providers: [respuestas_service_1.RespuestasService],
      exports: [respuestas_service_1.RespuestasService],
    }),
  ];
  var _classDescriptor;
  var _classExtraInitializers = [];
  var _classThis;
  var RespuestasModule = (_classThis = /** @class */ (function () {
    function RespuestasModule_1() {}
    return RespuestasModule_1;
  })());
  __setFunctionName(_classThis, 'RespuestasModule');
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
    RespuestasModule = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (RespuestasModule = _classThis);
})();
exports.RespuestasModule = RespuestasModule;
