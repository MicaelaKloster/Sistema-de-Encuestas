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
exports.Opcion = void 0;
// Importación del decorador "Exclude" para excluir propiedades en la serialización
var class_transformer_1 = require('class-transformer');
// Importación de decoradores y utilidades de TypeORM
var typeorm_1 = require('typeorm');
// Importación de la entidad relacionada "Pregunta"
var pregunta_entity_1 = require('./pregunta.entity');
//import { RespuestaOpcion } from 'src/modules/respuestas/entities/respuesta-opcion.entity';
var Opcion = (function () {
  var _classDecorators = [(0, typeorm_1.Entity)({ name: 'opciones' })];
  var _classDescriptor;
  var _classExtraInitializers = [];
  var _classThis;
  var _id_decorators;
  var _id_initializers = [];
  var _id_extraInitializers = [];
  var _texto_decorators;
  var _texto_initializers = [];
  var _texto_extraInitializers = [];
  var _numero_decorators;
  var _numero_initializers = [];
  var _numero_extraInitializers = [];
  var _pregunta_decorators;
  var _pregunta_initializers = [];
  var _pregunta_extraInitializers = [];
  var Opcion = (_classThis = /** @class */ (function () {
    function Opcion_1() {
      this.id = __runInitializers(this, _id_initializers, void 0);
      this.texto =
        (__runInitializers(this, _id_extraInitializers),
        __runInitializers(this, _texto_initializers, void 0));
      this.numero =
        (__runInitializers(this, _texto_extraInitializers),
        __runInitializers(this, _numero_initializers, void 0));
      this.pregunta =
        (__runInitializers(this, _numero_extraInitializers),
        __runInitializers(this, _pregunta_initializers, void 0)); // Referencia a la pregunta a la que pertenece esta opción
      __runInitializers(this, _pregunta_extraInitializers);
    }
    return Opcion_1;
  })());
  __setFunctionName(_classThis, 'Opcion');
  (function () {
    var _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
    _texto_decorators = [(0, typeorm_1.Column)({ nullable: true })];
    _numero_decorators = [(0, typeorm_1.Column)({ nullable: true })];
    _pregunta_decorators = [
      (0, typeorm_1.ManyToOne)(function () {
        return pregunta_entity_1.Pregunta;
      }),
      (0, typeorm_1.JoinColumn)({ name: 'id_pregunta' }),
      (0, class_transformer_1.Exclude)(),
    ];
    __esDecorate(
      null,
      null,
      _id_decorators,
      {
        kind: 'field',
        name: 'id',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'id' in obj;
          },
          get: function (obj) {
            return obj.id;
          },
          set: function (obj, value) {
            obj.id = value;
          },
        },
        metadata: _metadata,
      },
      _id_initializers,
      _id_extraInitializers,
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
      _pregunta_decorators,
      {
        kind: 'field',
        name: 'pregunta',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'pregunta' in obj;
          },
          get: function (obj) {
            return obj.pregunta;
          },
          set: function (obj, value) {
            obj.pregunta = value;
          },
        },
        metadata: _metadata,
      },
      _pregunta_initializers,
      _pregunta_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    Opcion = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (Opcion = _classThis);
})();
exports.Opcion = Opcion;
