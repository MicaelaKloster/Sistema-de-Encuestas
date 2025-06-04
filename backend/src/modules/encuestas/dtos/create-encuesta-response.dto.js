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
exports.CreateEncuestaResponseDto = void 0;
var swagger_1 = require('@nestjs/swagger');
var CreateEncuestaResponseDto = (function () {
  var _a;
  var _id_decorators;
  var _id_initializers = [];
  var _id_extraInitializers = [];
  var _codigoRespuesta_decorators;
  var _codigoRespuesta_initializers = [];
  var _codigoRespuesta_extraInitializers = [];
  var _codigoResultados_decorators;
  var _codigoResultados_initializers = [];
  var _codigoResultados_extraInitializers = [];
  var _enlaceParticipacion_decorators;
  var _enlaceParticipacion_initializers = [];
  var _enlaceParticipacion_extraInitializers = [];
  var _enlaceVisualizacion_decorators;
  var _enlaceVisualizacion_initializers = [];
  var _enlaceVisualizacion_extraInitializers = [];
  var _enlaceCorto_decorators;
  var _enlaceCorto_initializers = [];
  var _enlaceCorto_extraInitializers = [];
  var _codigoQR_decorators;
  var _codigoQR_initializers = [];
  var _codigoQR_extraInitializers = [];
  var _fechaVencimiento_decorators;
  var _fechaVencimiento_initializers = [];
  var _fechaVencimiento_extraInitializers = [];
  return (
    (_a = /** @class */ (function () {
      function CreateEncuestaResponseDto() {
        this.id = __runInitializers(this, _id_initializers, void 0);
        this.codigoRespuesta =
          (__runInitializers(this, _id_extraInitializers),
          __runInitializers(this, _codigoRespuesta_initializers, void 0));
        this.codigoResultados =
          (__runInitializers(this, _codigoRespuesta_extraInitializers),
          __runInitializers(this, _codigoResultados_initializers, void 0));
        this.enlaceParticipacion =
          (__runInitializers(this, _codigoResultados_extraInitializers),
          __runInitializers(this, _enlaceParticipacion_initializers, void 0));
        this.enlaceVisualizacion =
          (__runInitializers(this, _enlaceParticipacion_extraInitializers),
          __runInitializers(this, _enlaceVisualizacion_initializers, void 0));
        this.enlaceCorto =
          (__runInitializers(this, _enlaceVisualizacion_extraInitializers),
          __runInitializers(this, _enlaceCorto_initializers, void 0));
        this.codigoQR =
          (__runInitializers(this, _enlaceCorto_extraInitializers),
          __runInitializers(this, _codigoQR_initializers, void 0));
        this.fechaVencimiento =
          (__runInitializers(this, _codigoQR_extraInitializers),
          __runInitializers(this, _fechaVencimiento_initializers, void 0));
        __runInitializers(this, _fechaVencimiento_extraInitializers);
      }
      return CreateEncuestaResponseDto;
    })()),
    (function () {
      var _metadata =
        typeof Symbol === 'function' && Symbol.metadata
          ? Object.create(null)
          : void 0;
      _id_decorators = [
        (0, swagger_1.ApiProperty)({ description: 'ID de la encuesta creada' }),
      ];
      _codigoRespuesta_decorators = [
        (0, swagger_1.ApiProperty)({
          description: 'Código para participar en la encuesta',
        }),
      ];
      _codigoResultados_decorators = [
        (0, swagger_1.ApiProperty)({
          description: 'Código para visualizar resultados',
        }),
      ];
      _enlaceParticipacion_decorators = [
        (0, swagger_1.ApiProperty)({
          description: 'Enlace para participar en la encuesta',
        }),
      ];
      _enlaceVisualizacion_decorators = [
        (0, swagger_1.ApiProperty)({
          description: 'Enlace para visualizar resultados',
        }),
      ];
      _enlaceCorto_decorators = [
        (0, swagger_1.ApiProperty)({
          description: 'Enlace corto generado automáticamente',
        }),
      ];
      _codigoQR_decorators = [
        (0, swagger_1.ApiProperty)({
          description: 'Código QR generado automáticamente',
        }),
      ];
      _fechaVencimiento_decorators = [
        (0, swagger_1.ApiProperty)({
          description: 'Fecha de vencimiento de la encuesta',
          required: false,
          type: String,
          format: 'date-time',
        }),
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
        _enlaceParticipacion_decorators,
        {
          kind: 'field',
          name: 'enlaceParticipacion',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'enlaceParticipacion' in obj;
            },
            get: function (obj) {
              return obj.enlaceParticipacion;
            },
            set: function (obj, value) {
              obj.enlaceParticipacion = value;
            },
          },
          metadata: _metadata,
        },
        _enlaceParticipacion_initializers,
        _enlaceParticipacion_extraInitializers,
      );
      __esDecorate(
        null,
        null,
        _enlaceVisualizacion_decorators,
        {
          kind: 'field',
          name: 'enlaceVisualizacion',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'enlaceVisualizacion' in obj;
            },
            get: function (obj) {
              return obj.enlaceVisualizacion;
            },
            set: function (obj, value) {
              obj.enlaceVisualizacion = value;
            },
          },
          metadata: _metadata,
        },
        _enlaceVisualizacion_initializers,
        _enlaceVisualizacion_extraInitializers,
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
exports.CreateEncuestaResponseDto = CreateEncuestaResponseDto;
