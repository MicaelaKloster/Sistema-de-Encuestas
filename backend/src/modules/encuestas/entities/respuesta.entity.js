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
exports.Respuesta = void 0;
var typeorm_1 = require('typeorm');
var encuesta_entity_1 = require('../../encuestas/entities/encuesta.entity');
var respuesta_abierta_entity_1 = require('../../respuestas/entities/respuesta-abierta.entity');
var respuesta_opcion_entity_1 = require('../../respuestas/entities/respuesta-opcion.entity');
var Respuesta = (function () {
  var _classDecorators = [(0, typeorm_1.Entity)('respuestas')];
  var _classDescriptor;
  var _classExtraInitializers = [];
  var _classThis;
  var _id_decorators;
  var _id_initializers = [];
  var _id_extraInitializers = [];
  var _id_encuesta_decorators;
  var _id_encuesta_initializers = [];
  var _id_encuesta_extraInitializers = [];
  var _encuesta_decorators;
  var _encuesta_initializers = [];
  var _encuesta_extraInitializers = [];
  var _respuestasAbiertas_decorators;
  var _respuestasAbiertas_initializers = [];
  var _respuestasAbiertas_extraInitializers = [];
  var _respuestasOpciones_decorators;
  var _respuestasOpciones_initializers = [];
  var _respuestasOpciones_extraInitializers = [];
  var Respuesta = (_classThis = /** @class */ (function () {
    function Respuesta_1() {
      this.id = __runInitializers(this, _id_initializers, void 0);
      this.id_encuesta =
        (__runInitializers(this, _id_extraInitializers),
        __runInitializers(this, _id_encuesta_initializers, void 0));
      this.encuesta =
        (__runInitializers(this, _id_encuesta_extraInitializers),
        __runInitializers(this, _encuesta_initializers, void 0));
      this.respuestasAbiertas =
        (__runInitializers(this, _encuesta_extraInitializers),
        __runInitializers(this, _respuestasAbiertas_initializers, void 0));
      this.respuestasOpciones =
        (__runInitializers(this, _respuestasAbiertas_extraInitializers),
        __runInitializers(this, _respuestasOpciones_initializers, void 0));
      __runInitializers(this, _respuestasOpciones_extraInitializers);
    }
    return Respuesta_1;
  })());
  __setFunctionName(_classThis, 'Respuesta');
  (function () {
    var _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
    _id_encuesta_decorators = [(0, typeorm_1.Column)('int')];
    _encuesta_decorators = [
      (0, typeorm_1.ManyToOne)(function () {
        return encuesta_entity_1.Encuesta;
      }),
      (0, typeorm_1.JoinColumn)({ name: 'id_encuesta' }),
    ];
    _respuestasAbiertas_decorators = [
      (0, typeorm_1.OneToMany)(
        function () {
          return respuesta_abierta_entity_1.RespuestaAbierta;
        },
        function (ra) {
          return ra.respuesta;
        },
      ),
    ];
    _respuestasOpciones_decorators = [
      (0, typeorm_1.OneToMany)(
        function () {
          return respuesta_opcion_entity_1.RespuestaOpcion;
        },
        function (ro) {
          return ro.respuesta;
        },
      ),
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
      _id_encuesta_decorators,
      {
        kind: 'field',
        name: 'id_encuesta',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'id_encuesta' in obj;
          },
          get: function (obj) {
            return obj.id_encuesta;
          },
          set: function (obj, value) {
            obj.id_encuesta = value;
          },
        },
        metadata: _metadata,
      },
      _id_encuesta_initializers,
      _id_encuesta_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _encuesta_decorators,
      {
        kind: 'field',
        name: 'encuesta',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'encuesta' in obj;
          },
          get: function (obj) {
            return obj.encuesta;
          },
          set: function (obj, value) {
            obj.encuesta = value;
          },
        },
        metadata: _metadata,
      },
      _encuesta_initializers,
      _encuesta_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _respuestasAbiertas_decorators,
      {
        kind: 'field',
        name: 'respuestasAbiertas',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'respuestasAbiertas' in obj;
          },
          get: function (obj) {
            return obj.respuestasAbiertas;
          },
          set: function (obj, value) {
            obj.respuestasAbiertas = value;
          },
        },
        metadata: _metadata,
      },
      _respuestasAbiertas_initializers,
      _respuestasAbiertas_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _respuestasOpciones_decorators,
      {
        kind: 'field',
        name: 'respuestasOpciones',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'respuestasOpciones' in obj;
          },
          get: function (obj) {
            return obj.respuestasOpciones;
          },
          set: function (obj, value) {
            obj.respuestasOpciones = value;
          },
        },
        metadata: _metadata,
      },
      _respuestasOpciones_initializers,
      _respuestasOpciones_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    Respuesta = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (Respuesta = _classThis);
})();
exports.Respuesta = Respuesta;
