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
exports.EncuestasService = void 0;
// Importación de decoradores y excepciones de NestJS
var common_1 = require('@nestjs/common');
// Importación de la función para generar UUIDs
var uuid_1 = require('uuid');
// Importación del enumerador para los tipos de código
var codigo_tipo_enum_1 = require('../enums/codigo-tipo.enum');
var common_2 = require('@nestjs/common');
var tipos_respuesta_enum_1 = require('../enums/tipos-respuesta.enum');
// Importación de librería para generar QR
var QRCode = require('qrcode');
// Importación de papaparse para generar CSV
var Papa = require('papaparse');
var EncuestasService = (function () {
  var _classDecorators = [(0, common_1.Injectable)()];
  var _classDescriptor;
  var _classExtraInitializers = [];
  var _classThis;
  var EncuestasService = (_classThis = /** @class */ (function () {
    function EncuestasService_1(
      encuestaRepository,
      respuestaRepository,
      configService,
    ) {
      this.encuestaRepository = encuestaRepository;
      this.respuestaRepository = respuestaRepository;
      this.configService = configService;
    }
    // Método para crear una nueva encuesta se le agrega codigo de enlace corto y codigoqr
    EncuestasService_1.prototype.crearEncuesta = function (dto) {
      return __awaiter(this, void 0, void 0, function () {
        var _i,
          _a,
          pregunta,
          codigoRespuesta,
          codigoResultados,
          encuesta,
          encuestaCreada,
          baseUrl,
          apiPrefix,
          apiVersion,
          enlaceParticipacion,
          enlaceVisualizacion,
          enlaceCorto,
          codigoQR;
        var _b;
        return __generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              for (_i = 0, _a = dto.preguntas; _i < _a.length; _i++) {
                pregunta = _a[_i];
                // FUNCIÓN EXTRA: Manejar preguntas de tipo VERDADERO_FALSO
                if (
                  pregunta.tipo ===
                  tipos_respuesta_enum_1.TiposRespuestaEnum.VERDADERO_FALSO
                ) {
                  // Para preguntas de tipo VERDADERO_FALSO, generamos automáticamente las opciones
                  pregunta.opciones = [
                    { numero: 1, texto: 'Verdadero' },
                    { numero: 2, texto: 'Falso' },
                  ];
                } else if (
                  pregunta.tipo !==
                    tipos_respuesta_enum_1.TiposRespuestaEnum.ABIERTA &&
                  (!pregunta.opciones || pregunta.opciones.length === 0)
                ) {
                  throw new common_1.BadRequestException(
                    'Las preguntas de opci\u00F3n m\u00FAltiple deben tener opciones',
                  );
                }
                if (
                  pregunta.tipo ===
                    tipos_respuesta_enum_1.TiposRespuestaEnum.ABIERTA &&
                  ((_b = pregunta.opciones) === null || _b === void 0
                    ? void 0
                    : _b.length) > 0
                ) {
                  throw new common_1.BadRequestException(
                    'Las preguntas abiertas no deben tener opciones',
                  );
                }
              }
              codigoRespuesta = (0, uuid_1.v4)();
              codigoResultados = (0, uuid_1.v4)();
              encuesta = this.encuestaRepository.create(
                __assign(__assign({}, dto), {
                  // Copia las propiedades del DTO
                  codigoRespuesta: codigoRespuesta, // Genera un código único para las respuestas
                  codigoResultados: codigoResultados,
                  fechaVencimiento: dto.fechaVencimiento,
                }),
              );
              return [4 /*yield*/, this.encuestaRepository.save(encuesta)];
            case 1:
              encuestaCreada = _c.sent();
              baseUrl = this.configService.get(
                'APP_URL',
                'http://localhost:3000',
              );
              apiPrefix = this.configService.get('GLOBAL_PREFIX', 'api');
              apiVersion = 'v1';
              enlaceParticipacion = ''
                .concat(baseUrl, '/')
                .concat(apiPrefix, '/')
                .concat(apiVersion, '/respuestas/participar/')
                .concat(encuestaCreada.id, '/')
                .concat(codigoRespuesta);
              enlaceVisualizacion = ''
                .concat(baseUrl, '/')
                .concat(apiPrefix, '/')
                .concat(apiVersion, '/encuestas/')
                .concat(encuestaCreada.id, '/resultados?codigo=')
                .concat(codigoResultados);
              return [
                4 /*yield*/,
                this.generarEnlaceCorto(enlaceParticipacion),
              ];
            case 2:
              enlaceCorto = _c.sent();
              return [4 /*yield*/, this.generarCodigoQR(enlaceCorto)];
            case 3:
              codigoQR = _c.sent();
              // Retorna los datos relevantes de la encuesta creada
              return [
                2 /*return*/,
                {
                  id: encuestaCreada.id,
                  codigoRespuesta: encuestaCreada.codigoRespuesta,
                  codigoResultados: encuestaCreada.codigoResultados,
                  enlaceParticipacion: enlaceCorto, // usamos el enlace corto
                  enlaceVisualizacion: enlaceVisualizacion,
                  enlaceCorto: enlaceCorto,
                  codigoQR: codigoQR,
                  fechaVencimiento: encuestaCreada.fechaVencimiento,
                },
              ];
          }
        });
      });
    };
    EncuestasService_1.prototype.generarEnlaceCorto = function (url) {
      return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 3, , 4]);
              return [
                4 /*yield*/,
                fetch(
                  'http://tinyurl.com/api-create.php?url='.concat(
                    encodeURIComponent(url),
                  ),
                ),
              ];
            case 1:
              response = _a.sent();
              if (!response.ok) {
                console.warn(
                  'Error en la API de TinyURL: '.concat(
                    response.statusText,
                    ', usando URL original',
                  ),
                );
                return [2 /*return*/, url]; // Se retorna la URL original
              }
              return [4 /*yield*/, response.text()];
            case 2:
              return [2 /*return*/, _a.sent()];
            case 3:
              error_1 = _a.sent();
              console.error(
                'Error al acortar enlace:',
                error_1 instanceof Error ? error_1.message : error_1,
              );
              return [2 /*return*/, url]; // Devuelve la URL original en caso de error
            case 4:
              return [2 /*return*/];
          }
        });
      });
    };
    EncuestasService_1.prototype.generarCodigoQR = function (texto) {
      return __awaiter(this, void 0, void 0, function () {
        var qr, error_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3]);
              return [4 /*yield*/, QRCode.toDataURL(texto)];
            case 1:
              qr = _a.sent();
              return [2 /*return*/, qr];
            case 2:
              error_2 = _a.sent();
              if (error_2 instanceof Error) {
                console.error('Error generando QR:', error_2.message);
              } else {
                console.error('Error desconocido generando QR:', error_2);
              }
              return [2 /*return*/, '']; // En caso de error, retornar cadena vacía
            case 3:
              return [2 /*return*/];
          }
        });
      });
    };
    // Método para obtener una encuesta por su ID y un código específico
    EncuestasService_1.prototype.obtenerEncuesta = function (
      id, // ID de la encuesta
      codigo, // Código de respuesta o resultados
      codigoTipo,
    ) {
      return __awaiter(this, void 0, void 0, function () {
        var query, encuesta;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              query = this.encuestaRepository
                .createQueryBuilder('encuesta') // Alias para la tabla Encuesta
                .innerJoinAndSelect('encuesta.preguntas', 'pregunta') // Une las preguntas relacionadas
                .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion') // Une las opciones de las preguntas
                .where('encuesta.id = :id', { id: id }) // Filtra por el ID de la encuesta
                .andWhere('encuesta.habilitada = true');
              // Filtra según el tipo de código proporcionado
              switch (codigoTipo) {
                case codigo_tipo_enum_1.CodigoTipoEnum.RESPUESTA:
                  query.andWhere('encuesta.codigoRespuesta = :codigo', {
                    codigo: codigo,
                  });
                  break;
                case codigo_tipo_enum_1.CodigoTipoEnum.RESULTADOS:
                  query.andWhere('encuesta.codigoResultados = :codigo', {
                    codigo: codigo,
                  });
                  break;
              }
              // Ordena las preguntas y opciones por su número
              query.orderBy('pregunta.numero', 'ASC');
              query.addOrderBy('preguntaOpcion.numero', 'ASC');
              return [4 /*yield*/, query.getOne()];
            case 1:
              encuesta = _a.sent();
              // Si no se encuentra la encuesta, lanza una excepción
              if (!encuesta) {
                throw new common_1.BadRequestException(
                  'Datos de encuesta no válidos',
                );
              }
              // Se agrega una validación para rechazar el acceso si la encuesta ya está vencida.
              if (
                encuesta.fechaVencimiento &&
                encuesta.fechaVencimiento < new Date()
              ) {
                throw new common_1.BadRequestException(
                  'La encuesta ha vencido y ya no está disponible',
                );
              }
              // Retorna la encuesta encontrada
              return [2 /*return*/, encuesta];
          }
        });
      });
    };
    EncuestasService_1.prototype.obtenerResultados = function (
      id,
      codigoResultados,
    ) {
      return __awaiter(this, void 0, void 0, function () {
        var encuesta, resultados;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                this.encuestaRepository.findOne({
                  where: {
                    id: id,
                    codigoResultados: codigoResultados,
                    habilitada: true,
                  },
                  relations: [
                    'preguntas',
                    'preguntas.opciones',
                    'respuestas',
                    'respuestas.respuestasAbiertas',
                    'respuestas.respuestasOpciones',
                    'respuestas.respuestasOpciones.opcion',
                  ],
                }),
              ];
            case 1:
              encuesta = _a.sent();
              if (!encuesta) {
                throw new common_2.NotFoundException(
                  'Encuesta no encontrada o código inválido',
                );
              }
              resultados = encuesta.preguntas.map(function (pregunta) {
                if (
                  pregunta.tipo ===
                  tipos_respuesta_enum_1.TiposRespuestaEnum.ABIERTA
                ) {
                  var respuestasTexto = encuesta.respuestas
                    .flatMap(function (r) {
                      return r.respuestasAbiertas;
                    })
                    .filter(function (ra) {
                      return ra.id_pregunta === pregunta.id;
                    })
                    .map(function (ra) {
                      return ra.texto;
                    });
                  return {
                    pregunta: pregunta.texto,
                    tipo: 'ABIERTA',
                    respuestas: respuestasTexto,
                  };
                } else if (
                  pregunta.tipo ===
                  tipos_respuesta_enum_1.TiposRespuestaEnum.VERDADERO_FALSO
                ) {
                  // Para preguntas de tipo VERDADERO_FALSO, procesamos de manera similar a las de opción múltiple
                  var opcionesConteo = pregunta.opciones.map(function (opcion) {
                    var conteo = encuesta.respuestas
                      .flatMap(function (r) {
                        return r.respuestasOpciones;
                      })
                      .filter(function (ro) {
                        var _a;
                        return (
                          ((_a = ro.opcion) === null || _a === void 0
                            ? void 0
                            : _a.id) === opcion.id
                        );
                      }).length;
                    return {
                      id: opcion.id,
                      opcion: opcion.texto,
                      conteo: conteo,
                    };
                  });
                  return {
                    pregunta: pregunta.texto,
                    tipo: tipos_respuesta_enum_1.TiposRespuestaEnum
                      .VERDADERO_FALSO,
                    opciones: opcionesConteo,
                  };
                } else {
                  var opcionesConteo = pregunta.opciones.map(function (opcion) {
                    var conteo = encuesta.respuestas
                      .flatMap(function (r) {
                        return r.respuestasOpciones;
                      })
                      .filter(function (ro) {
                        var _a;
                        return (
                          ((_a = ro.opcion) === null || _a === void 0
                            ? void 0
                            : _a.id) === opcion.id
                        );
                      }).length;
                    return {
                      id: opcion.id,
                      opcion: opcion.texto,
                      conteo: conteo,
                    };
                  });
                  return {
                    pregunta: pregunta.texto,
                    tipo: pregunta.tipo,
                    opciones: opcionesConteo,
                  };
                }
              });
              return [
                2 /*return*/,
                {
                  encuesta: encuesta.nombre,
                  totalRespuestas: encuesta.respuestas.length,
                  resultados: resultados,
                },
              ];
          }
        });
      });
    };
    // Funcionalidad Extra para deshabilitar una encuesta (MICA)
    EncuestasService_1.prototype.actualizarEstadoEncuesta = function (
      id,
      habilitada,
    ) {
      return __awaiter(this, void 0, void 0, function () {
        var encuesta;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                this.encuestaRepository.findOne({ where: { id: id } }),
              ];
            case 1:
              encuesta = _a.sent();
              // Si no se encuentra la encuesta, lanza una excepción
              if (!encuesta) {
                throw new common_1.BadRequestException(
                  'Encuesta no encontrada',
                );
              }
              // Actualiza el estado de la encuesta
              encuesta.habilitada = habilitada;
              return [4 /*yield*/, this.encuestaRepository.save(encuesta)];
            case 2:
              _a.sent();
              // Retorna un mensaje de éxito
              return [
                2 /*return*/,
                {
                  mensaje: 'La encuesta fue '.concat(
                    habilitada ? 'habilitada' : 'deshabilitada',
                    ' correctamente',
                  ),
                },
              ];
          }
        });
      });
    };
    // Método para obtener una encuesta por su código de respuesta
    EncuestasService_1.prototype.obtenerEncuestaPorCodigo = function (
      codigo,
      codigoTipo,
    ) {
      return __awaiter(this, void 0, void 0, function () {
        var whereCondition, encuesta;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              whereCondition =
                codigoTipo === codigo_tipo_enum_1.CodigoTipoEnum.RESPUESTA
                  ? { codigoRespuesta: codigo, habilitada: true }
                  : { codigoResultados: codigo, habilitada: true };
              return [
                4 /*yield*/,
                this.encuestaRepository.findOne({
                  where: whereCondition,
                  relations: ['preguntas', 'preguntas.opciones'],
                }),
              ];
            case 1:
              encuesta = _a.sent();
              if (!encuesta) {
                throw new common_1.BadRequestException(
                  'Código de encuesta no válido',
                );
              }
              // Se agrega una validación para rechazar el acceso si la encuesta ya está vencida.
              if (
                encuesta.fechaVencimiento &&
                encuesta.fechaVencimiento < new Date()
              ) {
                throw new common_1.BadRequestException(
                  'La encuesta ha vencido y ya no está disponible',
                );
              }
              // Ordenar las preguntas y opciones
              encuesta.preguntas.sort(function (a, b) {
                return a.numero - b.numero;
              });
              encuesta.preguntas.forEach(function (pregunta) {
                if (pregunta.opciones) {
                  pregunta.opciones.sort(function (a, b) {
                    return a.numero - b.numero;
                  });
                }
              });
              return [2 /*return*/, encuesta];
          }
        });
      });
    };
    // Funcionalidad extra para generar un CSV (Emilia)
    EncuestasService_1.prototype.resultadosCSV = function (
      id,
      codigoResultados,
    ) {
      return __awaiter(this, void 0, void 0, function () {
        var resultados, filas, csv;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                this.obtenerResultados(id, codigoResultados),
              ];
            case 1:
              resultados = _a.sent();
              // Si no se encuentran resultados, arroja una excepción
              if (!resultados) {
                throw new common_2.NotFoundException(
                  'No se encontraron resultados',
                );
              }
              filas = [];
              // Recorre cada pregunta para armar las filas
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
              resultados.resultados.forEach(function (pregunta) {
                // Si la pregunta es abierta, se agregan todas las respuestas individuales como filas
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (pregunta.tipo === 'ABIERTA') {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                  pregunta.respuestas.forEach(function (textoRespuesta) {
                    filas.push({
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                      Pregunta: pregunta.pregunta,
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                      Tipo: pregunta.tipo,
                      Respuesta: textoRespuesta,
                    });
                  });
                } else {
                  // Si la pregunta es de opción, se agregan las opciones con la cantidad de respuestas
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                  pregunta.opciones.forEach(function (opcion) {
                    filas.push({
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                      Pregunta: pregunta.pregunta,
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                      Tipo: pregunta.tipo,
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                      Opcion: opcion.opcion,
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                      'Cantidad Respuestas': opcion.conteo,
                    });
                  });
                }
              });
              csv = Papa.unparse(filas, {
                quotes: true,
                delimiter: ';',
                header: true,
                newline: '\r\n',
              });
              // Retorna el CSV
              return [2 /*return*/, '\uFEFF' + csv];
          }
        });
      });
    };
    return EncuestasService_1;
  })());
  __setFunctionName(_classThis, 'EncuestasService');
  (function () {
    var _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    EncuestasService = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (EncuestasService = _classThis);
})();
exports.EncuestasService = EncuestasService;
