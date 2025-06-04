'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OpcionConRespuestasDto =
  exports.PreguntaConRespuestasDto =
  exports.VisualizarRespuestasDto =
    void 0;
// Representa la encuesta con sus respuestas.
var VisualizarRespuestasDto = /** @class */ (function () {
  function VisualizarRespuestasDto() {}
  return VisualizarRespuestasDto;
})();
exports.VisualizarRespuestasDto = VisualizarRespuestasDto;
//Representa cada pregunta dentro de la encuesta.
var PreguntaConRespuestasDto = /** @class */ (function () {
  function PreguntaConRespuestasDto() {
    this.opciones = [];
    this.respuestas_abiertas = [];
  }
  return PreguntaConRespuestasDto;
})();
exports.PreguntaConRespuestasDto = PreguntaConRespuestasDto;
//Define las opciones de respuesta y cuántas veces fueron elegidas.
var OpcionConRespuestasDto = /** @class */ (function () {
  function OpcionConRespuestasDto() {}
  return OpcionConRespuestasDto;
})();
exports.OpcionConRespuestasDto = OpcionConRespuestasDto;
