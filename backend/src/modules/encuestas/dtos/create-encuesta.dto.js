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
Object.defineProperty(exports, '__esModule', { value: true });
exports.CreateEncuestaDto = void 0;
var swagger_1 = require('@nestjs/swagger'); // Decorador para documentar propiedades en Swagger
var class_transformer_1 = require('class-transformer'); // Utilidad para transformar y validar objetos anidados
var class_validator_1 = require('class-validator'); // Validadores para las propiedades del DTO
var create_pregunta_dto_1 = require('./create-pregunta.dto'); // DTO para las preguntas de la encuesta
// Clase DTO (Data Transfer Object) para crear una encuesta
var CreateEncuestaDto = (function () {
  var _a;
  var _nombre_decorators;
  var _nombre_initializers = [];
  var _nombre_extraInitializers = [];
  var _preguntas_decorators;
  var _preguntas_initializers = [];
  var _preguntas_extraInitializers = [];
  var _fechaVencimiento_decorators;
  var _fechaVencimiento_initializers = [];
  var _fechaVencimiento_extraInitializers = [];
  var _enlaceCorto_decorators;
  var _enlaceCorto_initializers = [];
  var _enlaceCorto_extraInitializers = [];
  var _codigoQR_decorators;
  var _codigoQR_initializers = [];
  var _codigoQR_extraInitializers = [];
  return (
    (_a = /** @class */ (function () {
      function CreateEncuestaDto() {
        this.nombre = __runInitializers(this, _nombre_initializers, void 0); // Nombre de la encuesta
        this.preguntas =
          (__runInitializers(this, _nombre_extraInitializers),
          __runInitializers(this, _preguntas_initializers, void 0)); // Lista de preguntas asociadas a la encuesta
        this.fechaVencimiento =
          (__runInitializers(this, _preguntas_extraInitializers),
          __runInitializers(this, _fechaVencimiento_initializers, void 0));
        //Propiedad para el enlace corto
        this.enlaceCorto =
          (__runInitializers(this, _fechaVencimiento_extraInitializers),
          __runInitializers(this, _enlaceCorto_initializers, void 0)); // generado automaticamente
        // Propiedad para el código QR
        this.codigoQR =
          (__runInitializers(this, _enlaceCorto_extraInitializers),
          __runInitializers(this, _codigoQR_initializers, void 0)); // generado automáticamente
        __runInitializers(this, _codigoQR_extraInitializers);
      }
      return CreateEncuestaDto;
    })()),
    (function () {
      var _metadata =
        typeof Symbol === 'function' && Symbol.metadata
          ? Object.create(null)
          : void 0;
      _nombre_decorators = [
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
      ];
      _preguntas_decorators = [
        (0, swagger_1.ApiProperty)({
          type: [create_pregunta_dto_1.CreatePreguntaDto],
        }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.ArrayMinSize)(1),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(function () {
          return create_pregunta_dto_1.CreatePreguntaDto;
        }),
      ];
      _fechaVencimiento_decorators = [
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsDateString)(),
      ];
      _enlaceCorto_decorators = [
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsString)(),
      ];
      _codigoQR_decorators = [
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsString)(),
      ];
      __esDecorate(
        null,
        null,
        _nombre_decorators,
        {
          kind: 'field',
          name: 'nombre',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'nombre' in obj;
            },
            get: function (obj) {
              return obj.nombre;
            },
            set: function (obj, value) {
              obj.nombre = value;
            },
          },
          metadata: _metadata,
        },
        _nombre_initializers,
        _nombre_extraInitializers,
      );
      __esDecorate(
        null,
        null,
        _preguntas_decorators,
        {
          kind: 'field',
          name: 'preguntas',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'preguntas' in obj;
            },
            get: function (obj) {
              return obj.preguntas;
            },
            set: function (obj, value) {
              obj.preguntas = value;
            },
          },
          metadata: _metadata,
        },
        _preguntas_initializers,
        _preguntas_extraInitializers,
      );
      __esDecorate(
        null,
        null,
        _fechaVencimiento_decorators,
        {
          kind: 'field',
          name: 'fechaVencimiento',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'fechaVencimiento' in obj;
            },
            get: function (obj) {
              return obj.fechaVencimiento;
            },
            set: function (obj, value) {
              obj.fechaVencimiento = value;
            },
          },
          metadata: _metadata,
        },
        _fechaVencimiento_initializers,
        _fechaVencimiento_extraInitializers,
      );
      __esDecorate(
        null,
        null,
        _enlaceCorto_decorators,
        {
          kind: 'field',
          name: 'enlaceCorto',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'enlaceCorto' in obj;
            },
            get: function (obj) {
              return obj.enlaceCorto;
            },
            set: function (obj, value) {
              obj.enlaceCorto = value;
            },
          },
          metadata: _metadata,
        },
        _enlaceCorto_initializers,
        _enlaceCorto_extraInitializers,
      );
      __esDecorate(
        null,
        null,
        _codigoQR_decorators,
        {
          kind: 'field',
          name: 'codigoQR',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'codigoQR' in obj;
            },
            get: function (obj) {
              return obj.codigoQR;
            },
            set: function (obj, value) {
              obj.codigoQR = value;
            },
          },
          metadata: _metadata,
        },
        _codigoQR_initializers,
        _codigoQR_extraInitializers,
      );
      if (_metadata)
        Object.defineProperty(_a, Symbol.metadata, {
          enumerable: true,
          configurable: true,
          writable: true,
          value: _metadata,
        });
    })(),
    _a
  );
})();
exports.CreateEncuestaDto = CreateEncuestaDto;
