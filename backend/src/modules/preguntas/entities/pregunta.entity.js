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
exports.Pregunta = void 0;
var typeorm_1 = require('typeorm');
var tipos_respuesta_enum_1 = require('../../encuestas/enums/tipos-respuesta.enum');
var encuesta_entity_1 = require('../../encuestas/entities/encuesta.entity');
var opcion_entity_1 = require('../../encuestas/entities/opcion.entity');
var Pregunta = (function () {
  var _classDecorators = [(0, typeorm_1.Entity)({ name: 'preguntas' })];
  var _classDescriptor;
  var _classExtraInitializers = [];
  var _classThis;
  var _id_decorators;
  var _id_initializers = [];
  var _id_extraInitializers = [];
  var _numero_decorators;
  var _numero_initializers = [];
  var _numero_extraInitializers = [];
  var _texto_decorators;
  var _texto_initializers = [];
  var _texto_extraInitializers = [];
  var _tipo_decorators;
  var _tipo_initializers = [];
  var _tipo_extraInitializers = [];
  var _encuesta_decorators;
  var _encuesta_initializers = [];
  var _encuesta_extraInitializers = [];
  var _opciones_decorators;
  var _opciones_initializers = [];
  var _opciones_extraInitializers = [];
  var Pregunta = (_classThis = /** @class */ (function () {
    function Pregunta_1() {
      this.id = __runInitializers(this, _id_initializers, void 0);
      this.numero =
        (__runInitializers(this, _id_extraInitializers),
        __runInitializers(this, _numero_initializers, void 0));
      this.texto =
        (__runInitializers(this, _numero_extraInitializers),
        __runInitializers(this, _texto_initializers, void 0));
      this.tipo =
        (__runInitializers(this, _texto_extraInitializers),
        __runInitializers(this, _tipo_initializers, void 0));
      this.encuesta =
        (__runInitializers(this, _tipo_extraInitializers),
        __runInitializers(this, _encuesta_initializers, void 0));
      this.opciones =
        (__runInitializers(this, _encuesta_extraInitializers),
        __runInitializers(this, _opciones_initializers, void 0));
      __runInitializers(this, _opciones_extraInitializers);
    }
    return Pregunta_1;
  })());
  __setFunctionName(_classThis, 'Pregunta');
  (function () {
    var _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
    _numero_decorators = [(0, typeorm_1.Column)()];
    _texto_decorators = [(0, typeorm_1.Column)()];
    _tipo_decorators = [
      (0, typeorm_1.Column)({
        type: 'enum',
        enum: tipos_respuesta_enum_1.TiposRespuestaEnum,
        name: 'tipo_respuesta', // Nombre de la columna en la base de datos
      }),
    ];
    _encuesta_decorators = [
      (0, typeorm_1.ManyToOne)(
        function () {
          return encuesta_entity_1.Encuesta;
        },
        function (encuesta) {
          return encuesta.preguntas;
        },
      ),
    ];
    _opciones_decorators = [
      (0, typeorm_1.OneToMany)(
        function () {
          return opcion_entity_1.Opcion;
        },
        function (opcion) {
          return opcion.pregunta;
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
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    Pregunta = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (Pregunta = _classThis);
})();
exports.Pregunta = Pregunta;
