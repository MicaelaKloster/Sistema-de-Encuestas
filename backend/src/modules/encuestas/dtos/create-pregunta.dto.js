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
exports.CreatePreguntaDto = void 0;
var swagger_1 = require('@nestjs/swagger'); // Decorador para documentar propiedades en Swagger
var class_validator_1 = require('class-validator'); // Validadores para las propiedades del DTO
var tipos_respuesta_enum_1 = require('../enums/tipos-respuesta.enum'); // Enumerador para los tipos de respuesta permitidos
var class_transformer_1 = require('class-transformer'); // Utilidad para transformar y validar objetos anidados
var create_opcion_dto_1 = require('./create-opcion.dto'); // DTO para las opciones de una pregunta
// Clase DTO (Data Transfer Object) para crear una pregunta
var CreatePreguntaDto = (function () {
  var _a;
  var _numero_decorators;
  var _numero_initializers = [];
  var _numero_extraInitializers = [];
  var _texto_decorators;
  var _texto_initializers = [];
  var _texto_extraInitializers = [];
  var _tipo_decorators;
  var _tipo_initializers = [];
  var _tipo_extraInitializers = [];
  var _opciones_decorators;
  var _opciones_initializers = [];
  var _opciones_extraInitializers = [];
  return (
    (_a = /** @class */ (function () {
      function CreatePreguntaDto() {
        this.numero = __runInitializers(this, _numero_initializers, void 0); // Número que representa el orden o posición de la pregunta
        this.texto =
          (__runInitializers(this, _numero_extraInitializers),
          __runInitializers(this, _texto_initializers, void 0)); // Texto de la pregunta
        this.tipo =
          (__runInitializers(this, _texto_extraInitializers),
          __runInitializers(this, _tipo_initializers, void 0)); // Tipo de respuesta permitido para la pregunta
        this.opciones =
          (__runInitializers(this, _tipo_extraInitializers),
          __runInitializers(this, _opciones_initializers, void 0)); // Opciones asociadas a la pregunta (opcional)
        __runInitializers(this, _opciones_extraInitializers);
      }
      return CreatePreguntaDto;
    })()),
    (function () {
      var _metadata =
        typeof Symbol === 'function' && Symbol.metadata
          ? Object.create(null)
          : void 0;
      _numero_decorators = [
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
      ];
      _texto_decorators = [
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
      ];
      _tipo_decorators = [
        (0, swagger_1.ApiProperty)({
          enum: tipos_respuesta_enum_1.TiposRespuestaEnum,
        }),
        (0, class_validator_1.IsEnum)(
          tipos_respuesta_enum_1.TiposRespuestaEnum,
        ),
        (0, class_validator_1.IsNotEmpty)(),
      ];
      _opciones_decorators = [
        (0, swagger_1.ApiProperty)({
          type: [create_opcion_dto_1.CreateOpcionDto],
          required: false,
        }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(function () {
          return create_opcion_dto_1.CreateOpcionDto;
        }),
      ];
      __esDecorate(
        null,
        null,
        _numero_decorators,
        {
          kind: 'field',
          name: 'numero',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'numero' in obj;
            },
            get: function (obj) {
              return obj.numero;
            },
            set: function (obj, value) {
              obj.numero = value;
            },
          },
          metadata: _metadata,
        },
        _numero_initializers,
        _numero_extraInitializers,
      );
      __esDecorate(
        null,
        null,
        _texto_decorators,
        {
          kind: 'field',
          name: 'texto',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'texto' in obj;
            },
            get: function (obj) {
              return obj.texto;
            },
            set: function (obj, value) {
              obj.texto = value;
            },
          },
          metadata: _metadata,
        },
        _texto_initializers,
        _texto_extraInitializers,
      );
      __esDecorate(
        null,
        null,
        _tipo_decorators,
        {
          kind: 'field',
          name: 'tipo',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'tipo' in obj;
            },
            get: function (obj) {
              return obj.tipo;
            },
            set: function (obj, value) {
              obj.tipo = value;
            },
          },
          metadata: _metadata,
        },
        _tipo_initializers,
        _tipo_extraInitializers,
      );
      __esDecorate(
        null,
        null,
        _opciones_decorators,
        {
          kind: 'field',
          name: 'opciones',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'opciones' in obj;
            },
            get: function (obj) {
              return obj.opciones;
            },
            set: function (obj, value) {
              obj.opciones = value;
            },
          },
          metadata: _metadata,
        },
        _opciones_initializers,
        _opciones_extraInitializers,
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
exports.CreatePreguntaDto = CreatePreguntaDto;
