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
exports.Encuesta = void 0;
// Importación de decoradores y utilidades de TypeORM
var typeorm_1 = require('typeorm');
// Importación de la entidad relacionada "Pregunta"
var pregunta_entity_1 = require('./pregunta.entity');
// Importación de la entidad relacionada "Respuesta"
var respuesta_entity_1 = require('../../respuestas/entities/respuesta.entity');
// Importación del decorador "Exclude" para excluir propiedades en la serialización
var class_transformer_1 = require('class-transformer');
var Encuesta = (function () {
  var _classDecorators = [(0, typeorm_1.Entity)({ name: 'encuestas' })];
  var _classDescriptor;
  var _classExtraInitializers = [];
  var _classThis;
  var _id_decorators;
  var _id_initializers = [];
  var _id_extraInitializers = [];
  var _nombre_decorators;
  var _nombre_initializers = [];
  var _nombre_extraInitializers = [];
  var _fechaActualizacion_decorators;
  var _fechaActualizacion_initializers = [];
  var _fechaActualizacion_extraInitializers = [];
  var _preguntas_decorators;
  var _preguntas_initializers = [];
  var _preguntas_extraInitializers = [];
  var _codigoRespuesta_decorators;
  var _codigoRespuesta_initializers = [];
  var _codigoRespuesta_extraInitializers = [];
  var _codigoResultados_decorators;
  var _codigoResultados_initializers = [];
  var _codigoResultados_extraInitializers = [];
  var _habilitada_decorators;
  var _habilitada_initializers = [];
  var _habilitada_extraInitializers = [];
  var _fechaVencimiento_decorators;
  var _fechaVencimiento_initializers = [];
  var _fechaVencimiento_extraInitializers = [];
  var _respuestas_decorators;
  var _respuestas_initializers = [];
  var _respuestas_extraInitializers = [];
  var Encuesta = (_classThis = /** @class */ (function () {
    function Encuesta_1() {
      this.id = __runInitializers(this, _id_initializers, void 0);
      this.nombre =
        (__runInitializers(this, _id_extraInitializers),
        __runInitializers(this, _nombre_initializers, void 0));
      this.fechaActualizacion =
        (__runInitializers(this, _nombre_extraInitializers),
        __runInitializers(this, _fechaActualizacion_initializers, void 0));
      this.preguntas =
        (__runInitializers(this, _fechaActualizacion_extraInitializers),
        __runInitializers(this, _preguntas_initializers, void 0)); // Relación uno a muchos con la entidad "Pregunta"
      this.codigoRespuesta =
        (__runInitializers(this, _preguntas_extraInitializers),
        __runInitializers(this, _codigoRespuesta_initializers, void 0));
      this.codigoResultados =
        (__runInitializers(this, _codigoRespuesta_extraInitializers),
        __runInitializers(this, _codigoResultados_initializers, void 0));
      // Funcionalidad Extra para deshabilitar una encuesta (MICA)
      this.habilitada =
        (__runInitializers(this, _codigoResultados_extraInitializers),
        __runInitializers(this, _habilitada_initializers, void 0)); // Columna que indica si la encuesta está habilitada o no
      // Funcionalidad extra (MAIA): Fecha de vencimiento
      this.fechaVencimiento =
        (__runInitializers(this, _habilitada_extraInitializers),
        __runInitializers(this, _fechaVencimiento_initializers, void 0));
      this.respuestas =
        (__runInitializers(this, _fechaVencimiento_extraInitializers),
        __runInitializers(this, _respuestas_initializers, void 0)); // Relación uno a muchos con la entidad "Respuesta"
      __runInitializers(this, _respuestas_extraInitializers);
    }
    return Encuesta_1;
  })());
  __setFunctionName(_classThis, 'Encuesta');
  (function () {
    var _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
    _nombre_decorators = [(0, typeorm_1.Column)({ nullable: true })];
    _fechaActualizacion_decorators = [
      (0, typeorm_1.Column)({
        nullable: true,
        type: 'timestamp',
        default: function () {
          return 'CURRENT_TIMESTAMP';
        },
      }),
    ];
    _preguntas_decorators = [
      (0, typeorm_1.OneToMany)(
        function () {
          return pregunta_entity_1.Pregunta;
        },
        function (pregunta) {
          return pregunta.encuesta;
        },
        {
          cascade: ['insert'], // Permite insertar automáticamente las preguntas relacionadas
        },
      ),
    ];
    _codigoRespuesta_decorators = [
      (0, typeorm_1.Column)({ name: 'codigo_respuesta', nullable: true }),
    ];
    _codigoResultados_decorators = [
      (0, typeorm_1.Column)({ name: 'codigo_resultados', nullable: true }),
      (0, class_transformer_1.Exclude)(),
    ];
    _habilitada_decorators = [(0, typeorm_1.Column)({ default: true })];
    _fechaVencimiento_decorators = [
      (0, typeorm_1.Column)({
        name: 'fecha_vencimiento',
        type: 'timestamptz',
        nullable: true,
      }),
    ];
    _respuestas_decorators = [
      (0, typeorm_1.OneToMany)(
        function () {
          return respuesta_entity_1.Respuesta;
        },
        function (respuesta) {
          return respuesta.encuesta;
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
      _fechaActualizacion_decorators,
      {
        kind: 'field',
        name: 'fechaActualizacion',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'fechaActualizacion' in obj;
          },
          get: function (obj) {
            return obj.fechaActualizacion;
          },
          set: function (obj, value) {
            obj.fechaActualizacion = value;
          },
        },
        metadata: _metadata,
      },
      _fechaActualizacion_initializers,
      _fechaActualizacion_extraInitializers,
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
      _codigoRespuesta_decorators,
      {
        kind: 'field',
        name: 'codigoRespuesta',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'codigoRespuesta' in obj;
          },
          get: function (obj) {
            return obj.codigoRespuesta;
          },
          set: function (obj, value) {
            obj.codigoRespuesta = value;
          },
        },
        metadata: _metadata,
      },
      _codigoRespuesta_initializers,
      _codigoRespuesta_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _codigoResultados_decorators,
      {
        kind: 'field',
        name: 'codigoResultados',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'codigoResultados' in obj;
          },
          get: function (obj) {
            return obj.codigoResultados;
          },
          set: function (obj, value) {
            obj.codigoResultados = value;
          },
        },
        metadata: _metadata,
      },
      _codigoResultados_initializers,
      _codigoResultados_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _habilitada_decorators,
      {
        kind: 'field',
        name: 'habilitada',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'habilitada' in obj;
          },
          get: function (obj) {
            return obj.habilitada;
          },
          set: function (obj, value) {
            obj.habilitada = value;
          },
        },
        metadata: _metadata,
      },
      _habilitada_initializers,
      _habilitada_extraInitializers,
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
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    Encuesta = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (Encuesta = _classThis);
})();
exports.Encuesta = Encuesta;
