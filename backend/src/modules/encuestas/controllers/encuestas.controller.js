'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
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
exports.EncuestasController = void 0;
// Importación de decoradores y módulos necesarios de NestJS
var common_1 = require('@nestjs/common');
var swagger_1 = require('@nestjs/swagger');
var codigo_tipo_enum_1 = require('../enums/codigo-tipo.enum');
var tipos_respuesta_enum_1 = require('../enums/tipos-respuesta.enum');
var create_encuesta_response_dto_1 = require('../dtos/create-encuesta-response.dto');
var visualizar_respuestas_dtos_1 = require('../../respuestas/dtos/visualizar-respuestas.dtos');
var EncuestasController = (function () {
  var _classDecorators = [(0, common_1.Controller)('encuestas')];
  var _classDescriptor;
  var _classExtraInitializers = [];
  var _classThis;
  var _instanceExtraInitializers = [];
  var _crearEncuesta_decorators;
  var _obtenerEncuesta_decorators;
  var _obtenerEncuestaParaParticipar_decorators;
  var _obtenerEncuestaDebug_decorators;
  var _obtenerResultadosEncuesta_decorators;
  var _obtenerEstructuraEncuesta_decorators;
  var _obtenerResultados_decorators;
  var _cambiarEstadoEncuesta_decorators;
  var _exportarResultadosCSV_decorators;
  var EncuestasController = (_classThis = /** @class */ (function () {
    function EncuestasController_1(encuestasService, respuestasService) {
      this.encuestasService =
        (__runInitializers(this, _instanceExtraInitializers), encuestasService);
      this.respuestasService = respuestasService;
    } // Inyección de los servicios
    EncuestasController_1.prototype.crearEncuesta = function (dto) {
      return __awaiter(this, void 0, void 0, function () {
        var encuesta, enlaceCorto, codigoQR;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, this.encuestasService.crearEncuesta(dto)];
            case 1:
              encuesta = _a.sent();
              return [
                4 /*yield*/,
                this.encuestasService.generarEnlaceCorto(
                  encuesta.enlaceParticipacion,
                ),
              ];
            case 2:
              enlaceCorto = _a.sent();
              return [
                4 /*yield*/,
                this.encuestasService.generarCodigoQR(enlaceCorto),
              ];
            case 3:
              codigoQR = _a.sent();
              return [
                2 /*return*/,
                __assign(__assign({}, encuesta), {
                  enlaceParticipacion: enlaceCorto, // Se reemplaza el enlace con la versión corta
                  codigoQR: codigoQR,
                }),
              ];
          }
        });
      });
    };
    EncuestasController_1.prototype.obtenerEncuesta = function (id, dto) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                this.encuestasService.obtenerEncuesta(
                  id,
                  dto.codigo, // Código de respuesta o resultados
                  dto.tipo,
                ),
              ];
            case 1:
              // Llama al servicio para obtener la encuesta y la retorna
              return [2 /*return*/, _a.sent()];
          }
        });
      });
    };
    EncuestasController_1.prototype.obtenerEncuestaParaParticipar = function (
      codigo,
    ) {
      return __awaiter(this, void 0, void 0, function () {
        var encuesta;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                this.encuestasService.obtenerEncuestaPorCodigo(
                  codigo,
                  codigo_tipo_enum_1.CodigoTipoEnum.RESPUESTA,
                ),
              ];
            case 1:
              encuesta = _a.sent();
              // Transformar la respuesta para incluir explícitamente los IDs
              return [
                2 /*return*/,
                {
                  id: encuesta.id,
                  nombre: encuesta.nombre,
                  preguntas: encuesta.preguntas.map(function (pregunta) {
                    return {
                      id: pregunta.id,
                      numero: pregunta.numero,
                      texto: pregunta.texto,
                      tipo: pregunta.tipo,
                      opciones: pregunta.opciones
                        ? pregunta.opciones.map(function (opcion) {
                            return {
                              id: opcion.id,
                              numero: opcion.numero,
                              texto: opcion.texto,
                            };
                          })
                        : [],
                    };
                  }),
                },
              ];
          }
        });
      });
    };
    /**
     * Obtiene información detallada de la encuesta para depuración
     *
     * Este endpoint intenta obtener la encuesta primero con el código de participación,
     * y si falla, intenta con el código de resultados. Es útil para diagnosticar problemas
     * cuando no se sabe qué tipo de código se tiene.
     */
    EncuestasController_1.prototype.obtenerEncuestaDebug = function (codigo) {
      return __awaiter(this, void 0, void 0, function () {
        var encuesta, _a, encuesta, _b;
        return __generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              _c.trys.push([0, 2, , 7]);
              return [
                4 /*yield*/,
                this.encuestasService.obtenerEncuestaPorCodigo(
                  codigo,
                  codigo_tipo_enum_1.CodigoTipoEnum.RESPUESTA,
                ),
              ];
            case 1:
              encuesta = _c.sent();
              // Transformar la respuesta para incluir explícitamente los IDs
              return [
                2 /*return*/,
                {
                  id: encuesta.id,
                  nombre: encuesta.nombre,
                  tipo_codigo: 'PARTICIPACIÓN',
                  preguntas: encuesta.preguntas.map(function (pregunta) {
                    return {
                      id: pregunta.id,
                      numero: pregunta.numero,
                      texto: pregunta.texto,
                      tipo: pregunta.tipo,
                      opciones: pregunta.opciones
                        ? pregunta.opciones.map(function (opcion) {
                            return {
                              id: opcion.id,
                              numero: opcion.numero,
                              texto: opcion.texto,
                            };
                          })
                        : [],
                    };
                  }),
                },
              ];
            case 2:
              _a = _c.sent();
              _c.label = 3;
            case 3:
              _c.trys.push([3, 5, , 6]);
              return [
                4 /*yield*/,
                this.encuestasService.obtenerEncuestaPorCodigo(
                  codigo,
                  codigo_tipo_enum_1.CodigoTipoEnum.RESULTADOS,
                ),
              ];
            case 4:
              encuesta = _c.sent();
              // Transformar la respuesta para incluir explícitamente los IDs
              return [
                2 /*return*/,
                {
                  id: encuesta.id,
                  nombre: encuesta.nombre,
                  tipo_codigo: 'RESULTADOS',
                  preguntas: encuesta.preguntas.map(function (pregunta) {
                    return {
                      id: pregunta.id,
                      numero: pregunta.numero,
                      texto: pregunta.texto,
                      tipo: pregunta.tipo,
                      opciones: pregunta.opciones
                        ? pregunta.opciones.map(function (opcion) {
                            return {
                              id: opcion.id,
                              numero: opcion.numero,
                              texto: opcion.texto,
                            };
                          })
                        : [],
                    };
                  }),
                },
              ];
            case 5:
              _b = _c.sent();
              throw new common_1.BadRequestException(
                'Código de encuesta no válido',
              );
            case 6:
              return [3 /*break*/, 7];
            case 7:
              return [2 /*return*/];
          }
        });
      });
    };
    /**
     * Obtiene los resultados de una encuesta usando su código de visualización
     *
     * Este endpoint permite consultar todas las respuestas recopiladas para una encuesta
     * utilizando el código de visualización proporcionado al crear la encuesta.
     */
    EncuestasController_1.prototype.obtenerResultadosEncuesta = function (
      codigo,
    ) {
      return __awaiter(this, void 0, void 0, function () {
        var resultado;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                this.respuestasService.visualizarRespuestasDto(codigo),
              ];
            case 1:
              resultado = _a.sent();
              return [2 /*return*/, { message: 'Éxito', data: resultado }];
          }
        });
      });
    };
    EncuestasController_1.prototype.obtenerEstructuraEncuesta = function (
      codigo,
    ) {
      return __awaiter(this, void 0, void 0, function () {
        var encuesta;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                this.encuestasService.obtenerEncuestaPorCodigo(
                  codigo,
                  codigo_tipo_enum_1.CodigoTipoEnum.RESPUESTA,
                ),
              ];
            case 1:
              encuesta = _a.sent();
              return [
                2 /*return*/,
                {
                  id: encuesta.id,
                  nombre: encuesta.nombre,
                  codigoRespuesta: encuesta.codigoRespuesta,
                  preguntas: encuesta.preguntas.map(function (pregunta) {
                    return {
                      id: pregunta.id,
                      numero: pregunta.numero,
                      texto: pregunta.texto,
                      tipo: pregunta.tipo,
                      opciones: pregunta.opciones
                        ? pregunta.opciones.map(function (opcion) {
                            return {
                              id: opcion.id,
                              numero: opcion.numero,
                              texto: opcion.texto,
                            };
                          })
                        : [],
                    };
                  }),
                  ejemploRespuesta: {
                    respuestas: encuesta.preguntas.map(function (pregunta) {
                      if (
                        pregunta.tipo ===
                        tipos_respuesta_enum_1.TiposRespuestaEnum.ABIERTA
                      ) {
                        return {
                          id_pregunta: pregunta.id,
                          tipo: pregunta.tipo,
                          texto: 'Ejemplo de respuesta abierta',
                        };
                      } else {
                        return {
                          id_pregunta: pregunta.id,
                          tipo: pregunta.tipo,
                          opciones:
                            pregunta.opciones && pregunta.opciones.length > 0
                              ? [pregunta.opciones[0].id]
                              : [],
                        };
                      }
                    }),
                  },
                },
              ];
          }
        });
      });
    };
    EncuestasController_1.prototype.obtenerResultados = function (id, codigo) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          if (!codigo) {
            throw new common_1.BadRequestException(
              'Código de resultados requerido',
            );
          }
          return [
            2 /*return*/,
            this.encuestasService.obtenerResultados(id, codigo),
          ];
        });
      });
    };
    EncuestasController_1.prototype.cambiarEstadoEncuesta = function (
      id,
      habilitada,
    ) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                this.encuestasService.actualizarEstadoEncuesta(id, habilitada),
              ];
            case 1:
              return [2 /*return*/, _a.sent()];
          }
        });
      });
    };
    // Funcionalidad extra para generar un CSV (Emilia)
    EncuestasController_1.prototype.exportarResultadosCSV = function (
      id,
      codigoResultados,
      res,
    ) {
      return __awaiter(this, void 0, void 0, function () {
        var csv;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                this.encuestasService.resultadosCSV(id, codigoResultados),
              ];
            case 1:
              csv = _a.sent();
              // Configuración de los encabezados
              res.setHeader('Content-Type', 'text/csv');
              res.setHeader(
                'Content-Disposition',
                'attachment; filename="resultados_encuesta_'.concat(
                  id,
                  '.csv"',
                ),
              );
              res.send(csv); // Envía el contenido del archivo CSV
              return [2 /*return*/];
          }
        });
      });
    };
    return EncuestasController_1;
  })());
  __setFunctionName(_classThis, 'EncuestasController');
  (function () {
    var _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _crearEncuesta_decorators = [
      (0, common_1.Post)(),
      (0, swagger_1.ApiOperation)({
        summary: 'Crear una nueva encuesta',
        description:
          'Crea una encuesta con sus preguntas y opciones, generando enlaces y códigos QR',
      }),
      (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Encuesta creada exitosamente',
        type: create_encuesta_response_dto_1.CreateEncuestaResponseDto,
      }),
      (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de encuesta inválidos o incompletos',
      }),
    ];
    _obtenerEncuesta_decorators = [(0, common_1.Get)(':id')];
    _obtenerEncuestaParaParticipar_decorators = [
      (0, common_1.Get)('participar/:codigo'),
      (0, swagger_1.ApiOperation)({
        summary: 'Obtener encuesta para participación',
        description:
          'Devuelve la estructura completa de una encuesta usando solo su código de participación',
      }),
      (0, swagger_1.ApiParam)({
        name: 'codigo',
        description: 'Código UUID de participación de la encuesta',
        example: 'abc123def456',
        required: true,
      }),
      (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Encuesta obtenida exitosamente',
      }),
      (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Código de encuesta no válido o encuesta vencida',
      }),
    ];
    _obtenerEncuestaDebug_decorators = [
      (0, common_1.Get)('debug/:codigo'),
      (0, swagger_1.ApiOperation)({
        summary: 'Obtener información detallada de la encuesta para depuración',
        description:
          'Intenta obtener la encuesta con cualquier tipo de código (participación o resultados)',
      }),
      (0, swagger_1.ApiParam)({
        name: 'codigo',
        description:
          'Código UUID de la encuesta (puede ser de participación o resultados)',
        example: 'abc123def456',
        required: true,
      }),
      (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Encuesta obtenida exitosamente',
      }),
      (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Código de encuesta no válido',
      }),
    ];
    _obtenerResultadosEncuesta_decorators = [
      (0, common_1.Get)('resultados/:codigo'),
      (0, swagger_1.ApiOperation)({
        summary: 'Obtener resultados de una encuesta',
        description:
          'Devuelve todas las respuestas recopiladas para una encuesta usando su código de visualización',
      }),
      (0, swagger_1.ApiParam)({
        name: 'codigo',
        description: 'Código UUID de visualización de resultados',
        example: 'xyz789uvw012',
        required: true,
      }),
      (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados obtenidos exitosamente',
        type: visualizar_respuestas_dtos_1.VisualizarRespuestasDto,
      }),
      (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Encuesta no encontrada o código inválido',
      }),
    ];
    _obtenerEstructuraEncuesta_decorators = [
      (0, common_1.Get)('estructura/:codigo'),
      (0, swagger_1.ApiOperation)({
        summary: 'Obtener estructura de la encuesta con IDs para responder',
      }),
      (0, swagger_1.ApiParam)({
        name: 'codigo',
        description: 'Código de participación de la encuesta',
        example: 'abc123def456',
      }),
    ];
    _obtenerResultados_decorators = [
      (0, common_1.Get)(':id/resultados'),
      (0, swagger_1.ApiOperation)({
        summary: 'Obtener resultados de una encuesta por ID y código',
      }),
      (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID de la encuesta',
        example: '1',
      }),
      (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados obtenidos exitosamente',
      }),
      (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Encuesta no encontrada o código inválido',
      }),
    ];
    _cambiarEstadoEncuesta_decorators = [(0, common_1.Patch)(':id/habilitar')];
    _exportarResultadosCSV_decorators = [
      (0, common_1.Get)(':id/csv/:codigoResultados'),
    ];
    __esDecorate(
      _classThis,
      null,
      _crearEncuesta_decorators,
      {
        kind: 'method',
        name: 'crearEncuesta',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'crearEncuesta' in obj;
          },
          get: function (obj) {
            return obj.crearEncuesta;
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
      _obtenerEncuesta_decorators,
      {
        kind: 'method',
        name: 'obtenerEncuesta',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'obtenerEncuesta' in obj;
          },
          get: function (obj) {
            return obj.obtenerEncuesta;
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
      _obtenerEncuestaParaParticipar_decorators,
      {
        kind: 'method',
        name: 'obtenerEncuestaParaParticipar',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'obtenerEncuestaParaParticipar' in obj;
          },
          get: function (obj) {
            return obj.obtenerEncuestaParaParticipar;
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
      _obtenerEncuestaDebug_decorators,
      {
        kind: 'method',
        name: 'obtenerEncuestaDebug',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'obtenerEncuestaDebug' in obj;
          },
          get: function (obj) {
            return obj.obtenerEncuestaDebug;
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
      _obtenerResultadosEncuesta_decorators,
      {
        kind: 'method',
        name: 'obtenerResultadosEncuesta',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'obtenerResultadosEncuesta' in obj;
          },
          get: function (obj) {
            return obj.obtenerResultadosEncuesta;
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
      _obtenerEstructuraEncuesta_decorators,
      {
        kind: 'method',
        name: 'obtenerEstructuraEncuesta',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'obtenerEstructuraEncuesta' in obj;
          },
          get: function (obj) {
            return obj.obtenerEstructuraEncuesta;
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
      _obtenerResultados_decorators,
      {
        kind: 'method',
        name: 'obtenerResultados',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'obtenerResultados' in obj;
          },
          get: function (obj) {
            return obj.obtenerResultados;
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
      _cambiarEstadoEncuesta_decorators,
      {
        kind: 'method',
        name: 'cambiarEstadoEncuesta',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'cambiarEstadoEncuesta' in obj;
          },
          get: function (obj) {
            return obj.cambiarEstadoEncuesta;
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
      _exportarResultadosCSV_decorators,
      {
        kind: 'method',
        name: 'exportarResultadosCSV',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'exportarResultadosCSV' in obj;
          },
          get: function (obj) {
            return obj.exportarResultadosCSV;
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
    EncuestasController = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (EncuestasController = _classThis);
})();
exports.EncuestasController = EncuestasController;
