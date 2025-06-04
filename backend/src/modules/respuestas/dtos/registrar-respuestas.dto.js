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
exports.RegistrarRespuestasDto = exports.RespuestaPreguntaDto = void 0;
var class_validator_1 = require('class-validator');
var class_transformer_1 = require('class-transformer');
// Representa la respuesta a una pregunta individual de la encuesta:
// id_pregunta: Un número obligatorio que identifica la pregunta (validado con @IsNumber() y @IsNotEmpty())
// tipo: Un string que debe ser uno de tres valores específicos (tipos de pregunta):
// 'ABIERTA': Para preguntas de respuesta libre
// 'OPCION_MULTIPLE_SELECCION_SIMPLE': Para preguntas con una sola opción seleccionable
// 'OPCION_MULTIPLE_SELECCION_MULTIPLE': Para preguntas con múltiples opciones seleccionables
// texto: Un campo opcional (@IsOptional()) de tipo string para almacenar la respuesta a preguntas abiertas
// opciones: Un campo opcional que contiene un array de números, para almacenar los IDs de las opciones seleccionadas en preguntas de opción múltiple
var RespuestaPreguntaDto = (function () {
  var _a;
  var _id_pregunta_decorators;
  var _id_pregunta_initializers = [];
  var _id_pregunta_extraInitializers = [];
  var _tipo_decorators;
  var _tipo_initializers = [];
  var _tipo_extraInitializers = [];
  var _texto_decorators;
  var _texto_initializers = [];
  var _texto_extraInitializers = [];
  var _opciones_decorators;
  var _opciones_initializers = [];
  var _opciones_extraInitializers = [];
  return (
    (_a = /** @class */ (function () {
      function RespuestaPreguntaDto() {
        this.id_pregunta = __runInitializers(
          this,
          _id_pregunta_initializers,
          void 0,
        );
        this.tipo =
          (__runInitializers(this, _id_pregunta_extraInitializers),
          __runInitializers(this, _tipo_initializers, void 0));
        this.texto =
          (__runInitializers(this, _tipo_extraInitializers),
          __runInitializers(this, _texto_initializers, void 0)); // preguntas abiertas
        this.opciones =
          (__runInitializers(this, _texto_extraInitializers),
          __runInitializers(this, _opciones_initializers, void 0)); // preguntas de opción múltiple
        __runInitializers(this, _opciones_extraInitializers);
      }
      return RespuestaPreguntaDto;
    })()),
    (function () {
      var _metadata =
        typeof Symbol === 'function' && Symbol.metadata
          ? Object.create(null)
          : void 0;
      _id_pregunta_decorators = [
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
      ];
      _tipo_decorators = [
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () {
          return String;
        }),
      ];
      _texto_decorators = [
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
      ];
      _opciones_decorators = [
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.IsNumber)({}, { each: true }),
        (0, class_transformer_1.Type)(function () {
          return Number;
        }),
      ];
      __esDecorate(
        null,
        null,
        _id_pregunta_decorators,
        {
          kind: 'field',
          name: 'id_pregunta',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'id_pregunta' in obj;
            },
            get: function (obj) {
              return obj.id_pregunta;
            },
            set: function (obj, value) {
              obj.id_pregunta = value;
            },
          },
          metadata: _metadata,
        },
        _id_pregunta_initializers,
        _id_pregunta_extraInitializers,
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
exports.RespuestaPreguntaDto = RespuestaPreguntaDto;
// Actúa como contenedor principal que será recibido por el controlador:
// respuestas: Un array obligatorio de objetos RespuestaPreguntaDto
// Usa @ValidateNested() para validar cada elemento del array según las reglas de RespuestaPreguntaDto
// Usa @Type(() => RespuestaPreguntaDto) para asegurar que cada elemento sea transformado correctamente
var RegistrarRespuestasDto = (function () {
  var _a;
  var _respuestas_decorators;
  var _respuestas_initializers = [];
  var _respuestas_extraInitializers = [];
  return (
    (_a = /** @class */ (function () {
      function RegistrarRespuestasDto() {
        this.respuestas = __runInitializers(
          this,
          _respuestas_initializers,
          void 0,
        );
        __runInitializers(this, _respuestas_extraInitializers);
      }
      return RegistrarRespuestasDto;
    })()),
    (function () {
      var _metadata =
        typeof Symbol === 'function' && Symbol.metadata
          ? Object.create(null)
          : void 0;
      _respuestas_decorators = [
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(function () {
          return RespuestaPreguntaDto;
        }),
        (0, class_validator_1.IsNotEmpty)(),
      ];
      __esDecorate(
        null,
        null,
        _respuestas_decorators,
        {
          kind: 'field',
          name: 'respuestas',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'respuestas' in obj;
            },
            get: function (obj) {
              return obj.respuestas;
            },
            set: function (obj, value) {
              obj.respuestas = value;
            },
          },
          metadata: _metadata,
        },
        _respuestas_initializers,
        _respuestas_extraInitializers,
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
exports.RegistrarRespuestasDto = RegistrarRespuestasDto;
