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
exports.RespuestaAbierta = void 0;
// Importación de decoradores y utilidades de TypeORM
var typeorm_1 = require('typeorm');
var pregunta_entity_1 = require('../../encuestas/entities/pregunta.entity');
var respuesta_entity_1 = require('./respuesta.entity');
var RespuestaAbierta = (function () {
  var _classDecorators = [(0, typeorm_1.Entity)('respuestas_abiertas')];
  var _classDescriptor;
  var _classExtraInitializers = [];
  var _classThis;
  var _id_decorators;
  var _id_initializers = [];
  var _id_extraInitializers = [];
  var _texto_decorators;
  var _texto_initializers = [];
  var _texto_extraInitializers = [];
  var _id_pregunta_decorators;
  var _id_pregunta_initializers = [];
  var _id_pregunta_extraInitializers = [];
  var _id_respuesta_decorators;
  var _id_respuesta_initializers = [];
  var _id_respuesta_extraInitializers = [];
  var _pregunta_decorators;
  var _pregunta_initializers = [];
  var _pregunta_extraInitializers = [];
  var _respuesta_decorators;
  var _respuesta_initializers = [];
  var _respuesta_extraInitializers = [];
  var RespuestaAbierta = (_classThis = /** @class */ (function () {
    function RespuestaAbierta_1() {
      this.id = __runInitializers(this, _id_initializers, void 0);
      this.texto =
        (__runInitializers(this, _id_extraInitializers),
        __runInitializers(this, _texto_initializers, void 0));
      this.id_pregunta =
        (__runInitializers(this, _texto_extraInitializers),
        __runInitializers(this, _id_pregunta_initializers, void 0));
      this.id_respuesta =
        (__runInitializers(this, _id_pregunta_extraInitializers),
        __runInitializers(this, _id_respuesta_initializers, void 0));
      this.pregunta =
        (__runInitializers(this, _id_respuesta_extraInitializers),
        __runInitializers(this, _pregunta_initializers, void 0));
      this.respuesta =
        (__runInitializers(this, _pregunta_extraInitializers),
        __runInitializers(this, _respuesta_initializers, void 0));
      __runInitializers(this, _respuesta_extraInitializers);
    }
    return RespuestaAbierta_1;
  })());
  __setFunctionName(_classThis, 'RespuestaAbierta');
  (function () {
    var _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
    _texto_decorators = [
      (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    ];
    _id_pregunta_decorators = [
      (0, typeorm_1.Column)('int', { nullable: true }),
    ];
    _id_respuesta_decorators = [
      (0, typeorm_1.Column)('int', { nullable: true }),
    ];
    _pregunta_decorators = [
      (0, typeorm_1.ManyToOne)(function () {
        return pregunta_entity_1.Pregunta;
      }),
      (0, typeorm_1.JoinColumn)({ name: 'id_pregunta' }),
    ];
    _respuesta_decorators = [
      (0, typeorm_1.ManyToOne)(function () {
        return respuesta_entity_1.Respuesta;
      }),
      (0, typeorm_1.JoinColumn)({ name: 'id_respuesta' }),
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
      _id_respuesta_decorators,
      {
        kind: 'field',
        name: 'id_respuesta',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'id_respuesta' in obj;
          },
          get: function (obj) {
            return obj.id_respuesta;
          },
          set: function (obj, value) {
            obj.id_respuesta = value;
          },
        },
        metadata: _metadata,
      },
      _id_respuesta_initializers,
      _id_respuesta_extraInitializers,
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
      null,
      _respuesta_decorators,
      {
        kind: 'field',
        name: 'respuesta',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'respuesta' in obj;
          },
          get: function (obj) {
            return obj.respuesta;
          },
          set: function (obj, value) {
            obj.respuesta = value;
          },
        },
        metadata: _metadata,
      },
      _respuesta_initializers,
      _respuesta_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    RespuestaAbierta = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (RespuestaAbierta = _classThis);
})();
exports.RespuestaAbierta = RespuestaAbierta;
