'use strict';
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
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === 'function' ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g['throw'] = verb(1)),
      (g['return'] = verb(2)),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.RespuestasController = void 0;
// Importamos los decoradores y herramientas necesarias del framework NestJS.
var common_1 = require('@nestjs/common');
// Importamos un DTO (estructura de datos) que representa una encuesta (para cuando devolvemos datos al frontend).
var create_encuesta_dto_1 = require('../../encuestas/dtos/create-encuesta.dto');
// DTO que representa los datos que el usuario envía cuando responde una encuesta.
var registrar_respuestas_dto_1 = require('../dtos/registrar-respuestas.dto');
// DTO que representa cómo se mostrarán las respuestas cuando alguien quiera ver los resultados.
var visualizar_respuestas_dtos_1 = require('../dtos/visualizar-respuestas.dtos');
// Herramientas para documentar la API con Swagger (permite visualizar y probar la API en el navegador).
var swagger_1 = require('@nestjs/swagger');
// Etiqueta que agrupa las rutas de este controlador bajo el nombre "respuestas" en Swagger.
var RespuestasController = (function () {
  var _classDecorators = [
    (0, swagger_1.ApiTags)('respuestas'),
    (0, common_1.Controller)('respuestas'),
  ];
  var _classDescriptor;
  var _classExtraInitializers = [];
  var _classThis;
  var _instanceExtraInitializers = [];
  var _registrarRespuestas_decorators;
  var _visualizarRespuestas_decorators;
  var _obtenerEncuestaParaParticipacion_decorators;
  var RespuestasController = (_classThis = /** @class */ (function () {
    // Inyectamos el servicio de respuestas para poder usar sus funciones.
    function RespuestasController_1(respuestasService) {
      this.respuestasService =
        (__runInitializers(this, _instanceExtraInitializers),
        respuestasService);
    }
    RespuestasController_1.prototype.registrarRespuestas = function (
      id,
      tokenParticipacion,
      registrarRespuestasDto,
    ) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                this.respuestasService.registrarRespuestas(
                  tokenParticipacion,
                  registrarRespuestasDto,
                  id,
                ),
              ];
            case 1:
              _a.sent();
              return [
                2 /*return*/,
                { message: 'Respuestas registradas exitosamente' },
              ];
          }
        });
      });
    };
    /**
     * Obtiene los resultados de una encuesta usando el token de visualización
     *
     * Este endpoint permite consultar todas las respuestas recopiladas para una encuesta
     * utilizando el token de visualización proporcionado al crear la encuesta.
     * Incluye estadísticas como el número de respuestas por opción.
     */
    RespuestasController_1.prototype.visualizarRespuestas = function (
      tokenVisualizacion,
    ) {
      return __awaiter(this, void 0, void 0, function () {
        var resultado;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                this.respuestasService.visualizarRespuestasDto(
                  tokenVisualizacion,
                ),
              ];
            case 1:
              resultado = _a.sent();
              return [2 /*return*/, { message: 'Éxito', data: resultado }];
          }
        });
      });
    };
    /**
     * Obtiene la estructura de una encuesta para participación
     *
     * Este endpoint devuelve la estructura completa de una encuesta para que
     * un usuario pueda participar en ella, incluyendo todas sus preguntas y opciones.
     */
    RespuestasController_1.prototype.obtenerEncuestaParaParticipacion =
      function (id, tokenParticipacion) {
        return __awaiter(this, void 0, void 0, function () {
          var encuesta;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  this.respuestasService.obtenerEncuestaParaParticipacion(
                    id,
                    tokenParticipacion,
                  ),
                ];
              case 1:
                encuesta = _a.sent();
                return [
                  2 /*return*/,
                  { message: 'Encuesta obtenida exitosamente', data: encuesta },
                ];
            }
          });
        });
      };
    return RespuestasController_1;
  })());
  __setFunctionName(_classThis, 'RespuestasController');
  (function () {
    var _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _registrarRespuestas_decorators = [
      (0, common_1.Post)(':id/:tokenParticipacion'),
      (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
      (0, swagger_1.ApiOperation)({
        summary: 'Registrar respuestas de una encuesta',
        description:
          'Guarda las respuestas de un usuario para una encuesta específica. Requiere el ID de la encuesta y el token de participación.',
      }),
      (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID numérico de la encuesta',
        example: '1',
        required: true,
      }),
      (0, swagger_1.ApiParam)({
        name: 'tokenParticipacion',
        description: 'Token UUID de participación de la encuesta',
        example: 'abc123def456',
        required: true,
      }),
      (0, swagger_1.ApiBody)({
        type: registrar_respuestas_dto_1.RegistrarRespuestasDto,
        description:
          'Objeto con las respuestas del usuario para cada pregunta de la encuesta',
      }),
      (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Respuestas registradas exitosamente',
      }),
      (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Encuesta no encontrada o enlace inválido',
      }),
      (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de respuesta inválidos o incompletos',
      }),
    ];
    _visualizarRespuestas_decorators = [
      (0, common_1.Get)('resultados/:tokenVisualizacion'),
      (0, swagger_1.ApiOperation)({
        summary: 'Visualizar respuestas de una encuesta',
        description:
          'Obtiene todas las respuestas recopiladas para una encuesta usando el token de visualización.',
      }),
      (0, swagger_1.ApiParam)({
        name: 'tokenVisualizacion',
        description: 'Token UUID para visualizar los resultados de la encuesta',
        example: 'xyz789uvw012',
        required: true,
      }),
      (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Respuestas obtenidas exitosamente',
        type: visualizar_respuestas_dtos_1.VisualizarRespuestasDto,
      }),
      (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Encuesta no encontrada o token de visualización inválido',
      }),
    ];
    _obtenerEncuestaParaParticipacion_decorators = [
      (0, common_1.Get)('participar/:id/:tokenParticipacion'),
      (0, swagger_1.ApiOperation)({
        summary: 'Obtener encuesta para participación',
        description:
          'Devuelve la estructura completa de una encuesta para que un usuario pueda participar.',
      }),
      (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID numérico de la encuesta',
        example: '1',
        required: true,
      }),
      (0, swagger_1.ApiParam)({
        name: 'tokenParticipacion',
        description: 'Token UUID de participación de la encuesta',
        example: 'abc123def456',
        required: true,
      }),
      (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Encuesta obtenida exitosamente',
        type: create_encuesta_dto_1.CreateEncuestaDto,
      }),
      (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Encuesta no encontrada o token inválido',
      }),
    ];
    __esDecorate(
      _classThis,
      null,
      _registrarRespuestas_decorators,
      {
        kind: 'method',
        name: 'registrarRespuestas',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'registrarRespuestas' in obj;
          },
          get: function (obj) {
            return obj.registrarRespuestas;
          },
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _visualizarRespuestas_decorators,
      {
        kind: 'method',
        name: 'visualizarRespuestas',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'visualizarRespuestas' in obj;
          },
          get: function (obj) {
            return obj.visualizarRespuestas;
          },
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _obtenerEncuestaParaParticipacion_decorators,
      {
        kind: 'method',
        name: 'obtenerEncuestaParaParticipacion',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'obtenerEncuestaParaParticipacion' in obj;
          },
          get: function (obj) {
            return obj.obtenerEncuestaParaParticipacion;
          },
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    RespuestasController = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (RespuestasController = _classThis);
})();
exports.RespuestasController = RespuestasController;
