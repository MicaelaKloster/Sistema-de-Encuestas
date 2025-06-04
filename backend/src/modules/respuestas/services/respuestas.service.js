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
exports.RespuestasService = void 0;
var common_1 = require('@nestjs/common');
var tipos_respuesta_enum_1 = require('../../../../../../../../../../../../src/modules/encuestas/enums/tipos-respuesta.enum');
var visualizar_respuestas_dtos_1 = require('../dtos/visualizar-respuestas.dtos');
var RespuestasService = (function () {
  var _classDecorators = [(0, common_1.Injectable)()];
  var _classDescriptor;
  var _classExtraInitializers = [];
  var _classThis;
  var RespuestasService = (_classThis = /** @class */ (function () {
    function RespuestasService_1(
      respuestaRepository,
      respuestaAbiertaRepository,
      respuestaOpcionRepository,
      encuestaRepository,
      preguntaRepository,
      opcionRepository,
    ) {
      this.respuestaRepository = respuestaRepository;
      this.respuestaAbiertaRepository = respuestaAbiertaRepository;
      this.respuestaOpcionRepository = respuestaOpcionRepository;
      this.encuestaRepository = encuestaRepository;
      this.preguntaRepository = preguntaRepository;
      this.opcionRepository = opcionRepository;
    }
    /**
     * Registra las respuestas de un usuario para una encuesta específica
     *
     * @param codigoParticipacion - Token UUID de participación de la encuesta
     * @param registarRespuestasDto - Objeto con las respuestas del usuario
     * @param encuestaId - ID opcional de la encuesta para validación adicional
     * @throws NotFoundException - Si la encuesta no existe o el token es inválido
     * @throws BadRequestException - Si faltan respuestas obligatorias o son inválidas
     */
    RespuestasService_1.prototype.registrarRespuestas = function (
      codigoParticipacion,
      registarRespuestasDto,
      encuestaId,
    ) {
      return __awaiter(this, void 0, void 0, function () {
        var whereCondition,
          encuesta,
          preguntasObligatorias,
          preguntasRespondidas,
          preguntasFaltantes,
          respuesta,
          respuestaGuardada,
          _i,
          _a,
          respuestaPregunta,
          pregunta,
          respuestasAbiertas,
          opcion,
          respuestaOpcion,
          _b,
          _c,
          idOpcion,
          opcion,
          opcionesDisponibles,
          respuestaOpcion;
        return __generator(this, function (_d) {
          switch (_d.label) {
            case 0:
              // Validar que el DTO de respuestas no esté vacío
              if (
                !registarRespuestasDto.respuestas ||
                registarRespuestasDto.respuestas.length === 0
              ) {
                throw new common_1.BadRequestException(
                  'No se proporcionaron respuestas',
                );
              }
              whereCondition = {
                codigoRespuesta: codigoParticipacion,
                habilitada: true,
              };
              // Si se proporciona el ID de la encuesta, añadirlo a la condición
              if (encuestaId) {
                whereCondition.id = encuestaId;
              }
              return [
                4 /*yield*/,
                this.encuestaRepository.findOne({
                  where: whereCondition,
                  relations: ['preguntas', 'preguntas.opciones'],
                }),
              ];
            case 1:
              encuesta = _d.sent();
              if (!encuesta) {
                throw new common_1.NotFoundException(
                  'Encuesta no encontrada o enlace inválido',
                );
              }
              // Validar si la encuesta ha vencido
              if (
                encuesta.fechaVencimiento &&
                encuesta.fechaVencimiento < new Date()
              ) {
                throw new common_1.BadRequestException(
                  'La encuesta ha vencido y ya no acepta respuestas',
                );
              }
              preguntasObligatorias = encuesta.preguntas;
              preguntasRespondidas = registarRespuestasDto.respuestas.map(
                function (r) {
                  return r.id_pregunta;
                },
              );
              preguntasFaltantes = preguntasObligatorias.filter(function (p) {
                return !preguntasRespondidas.includes(p.id);
              });
              if (preguntasFaltantes.length > 0) {
                throw new common_1.BadRequestException(
                  'Debe responder todas las preguntas obligatorias. Faltan las preguntas: '.concat(
                    preguntasFaltantes
                      .map(function (p) {
                        return p.numero;
                      })
                      .join(', '),
                  ),
                );
              }
              respuesta = this.respuestaRepository.create({
                id_encuesta: encuesta.id,
              });
              return [4 /*yield*/, this.respuestaRepository.save(respuesta)];
            case 2:
              respuestaGuardada = _d.sent();
              (_i = 0), (_a = registarRespuestasDto.respuestas);
              _d.label = 3;
            case 3:
              if (!(_i < _a.length)) return [3 /*break*/, 17];
              respuestaPregunta = _a[_i];
              return [
                4 /*yield*/,
                this.preguntaRepository.findOne({
                  where: {
                    id: respuestaPregunta.id_pregunta,
                    encuesta: { id: encuesta.id },
                  },
                }),
              ];
            case 4:
              pregunta = _d.sent();
              if (!pregunta) {
                throw new common_1.BadRequestException(
                  'Pregunta '.concat(
                    respuestaPregunta.id_pregunta,
                    ' no encontrada o no pertenece a la encuesta',
                  ),
                );
              }
              if (
                !(
                  respuestaPregunta.tipo ===
                  tipos_respuesta_enum_1.TiposRespuestaEnum.ABIERTA
                )
              )
                return [3 /*break*/, 6];
              if (!respuestaPregunta.texto) {
                throw new common_1.BadRequestException(
                  'Respuesta de texto requerida para preguntas abiertas',
                );
              }
              respuestasAbiertas = this.respuestaAbiertaRepository.create({
                texto: respuestaPregunta.texto,
                id_pregunta: pregunta.id,
                id_respuesta: respuestaGuardada.id,
              });
              return [
                4 /*yield*/,
                this.respuestaAbiertaRepository.save(respuestasAbiertas),
              ];
            case 5:
              _d.sent();
              return [3 /*break*/, 16];
            case 6:
              if (
                !(
                  respuestaPregunta.tipo ===
                  tipos_respuesta_enum_1.TiposRespuestaEnum.VERDADERO_FALSO
                )
              )
                return [3 /*break*/, 9];
              if (
                !respuestaPregunta.opciones ||
                respuestaPregunta.opciones.length !== 1
              ) {
                throw new common_1.BadRequestException(
                  'Debe seleccionar exactamente una opción (Verdadero o Falso)',
                );
              }
              return [
                4 /*yield*/,
                this.opcionRepository.findOne({
                  where: {
                    id: respuestaPregunta.opciones[0],
                    pregunta: { id: pregunta.id },
                  },
                }),
              ];
            case 7:
              opcion = _d.sent();
              if (!opcion) {
                throw new common_1.BadRequestException(
                  'Opci\u00F3n seleccionada no v\u00E1lida para esta pregunta de Verdadero/Falso',
                );
              }
              respuestaOpcion = this.respuestaOpcionRepository.create({
                id_respuesta: respuestaGuardada.id,
                id_opcion: respuestaPregunta.opciones[0],
              });
              return [
                4 /*yield*/,
                this.respuestaOpcionRepository.save(respuestaOpcion),
              ];
            case 8:
              _d.sent();
              return [3 /*break*/, 16];
            case 9:
              if (
                !respuestaPregunta.opciones ||
                respuestaPregunta.opciones.length === 0
              ) {
                throw new common_1.BadRequestException(
                  'Al menos una opcion debe ser seleccionada',
                );
              }
              if (
                pregunta.tipo ===
                  tipos_respuesta_enum_1.TiposRespuestaEnum
                    .OPCION_MULTIPLE_SELECCION_SIMPLE &&
                respuestaPregunta.opciones.length > 1
              ) {
                throw new common_1.BadRequestException(
                  'Solo se permite una seleccion para este tipo de pregunta',
                );
              }
              (_b = 0), (_c = respuestaPregunta.opciones);
              _d.label = 10;
            case 10:
              if (!(_b < _c.length)) return [3 /*break*/, 16];
              idOpcion = _c[_b];
              return [
                4 /*yield*/,
                this.opcionRepository.findOne({
                  where: {
                    id: idOpcion,
                    pregunta: { id: pregunta.id },
                  },
                }),
              ];
            case 11:
              opcion = _d.sent();
              if (!!opcion) return [3 /*break*/, 13];
              return [
                4 /*yield*/,
                this.opcionRepository.find({
                  where: { pregunta: { id: pregunta.id } },
                  select: ['id', 'texto', 'numero'],
                }),
              ];
            case 12:
              opcionesDisponibles = _d.sent();
              console.log(
                'Error: Opci\u00F3n '
                  .concat(idOpcion, ' no encontrada para la pregunta ')
                  .concat(pregunta.id),
              );
              console.log(
                'Opciones disponibles para esta pregunta:',
                opcionesDisponibles,
              );
              throw new common_1.BadRequestException(
                'Opcion '
                  .concat(
                    idOpcion,
                    ' no encontrada o no pertenece a esta pregunta. Opciones disponibles: ',
                  )
                  .concat(JSON.stringify(opcionesDisponibles)),
              );
            case 13:
              respuestaOpcion = this.respuestaOpcionRepository.create({
                id_respuesta: respuestaGuardada.id,
                id_opcion: idOpcion,
              });
              return [
                4 /*yield*/,
                this.respuestaOpcionRepository.save(respuestaOpcion),
              ];
            case 14:
              _d.sent();
              _d.label = 15;
            case 15:
              _b++;
              return [3 /*break*/, 10];
            case 16:
              _i++;
              return [3 /*break*/, 3];
            case 17:
              return [2 /*return*/];
          }
        });
      });
    };
    /**
     * Obtiene las respuestas registradas de una encuesta específica para visualizarlas
     *
     * @param codigoVisualizacion - Token UUID para visualizar los resultados
     * @returns Objeto DTO con toda la información de la encuesta y sus respuestas
     * @throws NotFoundException - Si la encuesta no existe o el token es inválido
     */
    RespuestasService_1.prototype.visualizarRespuestasDto = function (
      codigoVisualizacion,
    ) {
      return __awaiter(this, void 0, void 0, function () {
        var encuesta,
          resultado,
          _i,
          _a,
          pregunta,
          preguntaConRespuestas,
          respuestasAbiertas,
          _b,
          _c,
          opcion,
          cantidadRespuestas;
        return __generator(this, function (_d) {
          switch (_d.label) {
            case 0:
              return [
                4 /*yield*/,
                this.encuestaRepository.findOne({
                  where: { codigoResultados: codigoVisualizacion },
                  relations: ['preguntas', 'preguntas.opciones'],
                }),
              ];
            case 1:
              encuesta = _d.sent();
              if (!encuesta) {
                throw new common_1.NotFoundException(
                  'Encuesta no encontrada o enlace inválido',
                );
              }
              resultado = {
                id: encuesta.id,
                nombre: encuesta.nombre,
                codigoRespuesta: encuesta.codigoRespuesta,
                codigoResultados: encuesta.codigoResultados,
                preguntas: [],
              };
              (_i = 0), (_a = encuesta.preguntas);
              _d.label = 2;
            case 2:
              if (!(_i < _a.length)) return [3 /*break*/, 10];
              pregunta = _a[_i];
              preguntaConRespuestas =
                new visualizar_respuestas_dtos_1.PreguntaConRespuestasDto();
              preguntaConRespuestas.id = pregunta.id;
              preguntaConRespuestas.numero = pregunta.numero;
              preguntaConRespuestas.texto = pregunta.texto;
              preguntaConRespuestas.tipo = pregunta.tipo;
              // Inicializar las listas de opciones y respuestas abiertas
              preguntaConRespuestas.opciones = [];
              preguntaConRespuestas.respuestas_abiertas = [];
              if (
                !(
                  pregunta.tipo ===
                  tipos_respuesta_enum_1.TiposRespuestaEnum.ABIERTA
                )
              )
                return [3 /*break*/, 4];
              return [
                4 /*yield*/,
                this.respuestaAbiertaRepository.find({
                  where: { id_pregunta: pregunta.id },
                }),
              ];
            case 3:
              respuestasAbiertas = _d.sent();
              preguntaConRespuestas.respuestas_abiertas =
                respuestasAbiertas.map(function (r) {
                  return r.texto;
                });
              _d.label = 4;
            case 4:
              if (!(pregunta.opciones && pregunta.opciones.length > 0))
                return [3 /*break*/, 8];
              (_b = 0), (_c = pregunta.opciones);
              _d.label = 5;
            case 5:
              if (!(_b < _c.length)) return [3 /*break*/, 8];
              opcion = _c[_b];
              return [
                4 /*yield*/,
                this.respuestaOpcionRepository.count({
                  where: { id_opcion: opcion.id }, // Ajusta esto a tu esquema si es diferente
                }),
              ];
            case 6:
              cantidadRespuestas = _d.sent();
              //  Añade la opción con la cantidad de respuestas al DTO
              preguntaConRespuestas.opciones.push({
                id: opcion.id,
                texto: opcion.texto,
                numero: opcion.numero,
                cantidad_respuestas: cantidadRespuestas,
              });
              _d.label = 7;
            case 7:
              _b++;
              return [3 /*break*/, 5];
            case 8:
              resultado.preguntas.push(preguntaConRespuestas); //Añade la pregunta con sus respuestas al resultado fina
              _d.label = 9;
            case 9:
              _i++;
              return [3 /*break*/, 2];
            case 10:
              return [2 /*return*/, resultado];
          }
        });
      });
    };
    /**
     * Obtiene la estructura de una encuesta para participación
     *
     * @param id - ID numérico de la encuesta
     * @param codigoParticipacion - Token UUID de participación
     * @returns Objeto DTO con la estructura de la encuesta para participar
     * @throws NotFoundException - Si la encuesta no existe o el token es inválido
     * @throws BadRequestException - Si la encuesta ha vencido
     */
    RespuestasService_1.prototype.obtenerEncuestaParaParticipacion = function (
      id,
      codigoParticipacion,
    ) {
      return __awaiter(this, void 0, void 0, function () {
        var encuesta;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                this.encuestaRepository.findOne({
                  where: {
                    id: id,
                    codigoRespuesta: codigoParticipacion,
                    habilitada: true,
                  },
                  relations: ['preguntas', 'preguntas.opciones'],
                }),
              ];
            case 1:
              encuesta = _a.sent();
              if (!encuesta) {
                throw new common_1.NotFoundException(
                  'Encuesta no encontrada o código de participación inválido',
                );
              }
              // Validar si la encuesta ha vencido
              if (
                encuesta.fechaVencimiento &&
                encuesta.fechaVencimiento < new Date()
              ) {
                throw new common_1.BadRequestException(
                  'La encuesta ha vencido y ya no está disponible',
                );
              }
              // Convertir la entidad `Encuesta` a `CreateEncuestaDto`
              return [
                2 /*return*/,
                {
                  nombre: encuesta.nombre,
                  preguntas: encuesta.preguntas.map(function (pregunta) {
                    return {
                      numero: pregunta.numero,
                      texto: pregunta.texto,
                      tipo: pregunta.tipo,
                      opciones: pregunta.opciones.map(function (opcion) {
                        return {
                          id: opcion.id,
                          texto: opcion.texto,
                          numero: opcion.numero,
                        };
                      }),
                    };
                  }),
                },
              ];
          }
        });
      });
    };
    return RespuestasService_1;
  })());
  __setFunctionName(_classThis, 'RespuestasService');
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
    RespuestasService = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (RespuestasService = _classThis);
})();
exports.RespuestasService = RespuestasService;
// Guardamos respuestas de una encuesta anónima (registrarRespuestas).
// Visualizamos los resultados de una encuesta (visualizarRespuestasDto).
// Obtenemos los datos de una encuesta habilitada para que alguien pueda participar (obtenerEncuestaParaParticipacion).
