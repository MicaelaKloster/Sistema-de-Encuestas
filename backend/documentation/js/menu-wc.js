'use strict';

customElements.define(
  'compodoc-menu',
  class extends HTMLElement {
    constructor() {
      super();
      this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
      this.render(this.isNormalMode);
    }

    render(isNormalMode) {
      let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend-encuestas-tfi documentation</a>
                </li>

                <li class="divider"></li>
                ${isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : ''}
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#modules-links"'
                                : 'data-bs-target="#xs-modules-links"'
                            }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"'}>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EncuestasModule.html" data-type="entity-link" >EncuestasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-EncuestasModule-8fddfccb6ed0433cb5a59c525937690e40b37c7b48d98cad1d8dc0d54deb43b38ae047b4342987066be2bdbb5cd7ac1e48a3b7fe6b255af3509a98b3a4360973"'
                                            : 'data-bs-target="#xs-controllers-links-module-EncuestasModule-8fddfccb6ed0433cb5a59c525937690e40b37c7b48d98cad1d8dc0d54deb43b38ae047b4342987066be2bdbb5cd7ac1e48a3b7fe6b255af3509a98b3a4360973"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-EncuestasModule-8fddfccb6ed0433cb5a59c525937690e40b37c7b48d98cad1d8dc0d54deb43b38ae047b4342987066be2bdbb5cd7ac1e48a3b7fe6b255af3509a98b3a4360973"'
                                            : 'id="xs-controllers-links-module-EncuestasModule-8fddfccb6ed0433cb5a59c525937690e40b37c7b48d98cad1d8dc0d54deb43b38ae047b4342987066be2bdbb5cd7ac1e48a3b7fe6b255af3509a98b3a4360973"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/EncuestasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EncuestasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-EncuestasModule-8fddfccb6ed0433cb5a59c525937690e40b37c7b48d98cad1d8dc0d54deb43b38ae047b4342987066be2bdbb5cd7ac1e48a3b7fe6b255af3509a98b3a4360973"'
                                        : 'data-bs-target="#xs-injectables-links-module-EncuestasModule-8fddfccb6ed0433cb5a59c525937690e40b37c7b48d98cad1d8dc0d54deb43b38ae047b4342987066be2bdbb5cd7ac1e48a3b7fe6b255af3509a98b3a4360973"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-EncuestasModule-8fddfccb6ed0433cb5a59c525937690e40b37c7b48d98cad1d8dc0d54deb43b38ae047b4342987066be2bdbb5cd7ac1e48a3b7fe6b255af3509a98b3a4360973"'
                                        : 'id="xs-injectables-links-module-EncuestasModule-8fddfccb6ed0433cb5a59c525937690e40b37c7b48d98cad1d8dc0d54deb43b38ae047b4342987066be2bdbb5cd7ac1e48a3b7fe6b255af3509a98b3a4360973"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/EncuestasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EncuestasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OpcionesModule.html" data-type="entity-link" >OpcionesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-OpcionesModule-48900202ef0bc5750d894bd4840ea70addf4e8368d3ac311d35667f0ce60d484a25d1bdf6970a666f3acb1cf8f6d37bfa3acbfe3912058f9aa83ef672788a7e5"'
                                            : 'data-bs-target="#xs-controllers-links-module-OpcionesModule-48900202ef0bc5750d894bd4840ea70addf4e8368d3ac311d35667f0ce60d484a25d1bdf6970a666f3acb1cf8f6d37bfa3acbfe3912058f9aa83ef672788a7e5"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-OpcionesModule-48900202ef0bc5750d894bd4840ea70addf4e8368d3ac311d35667f0ce60d484a25d1bdf6970a666f3acb1cf8f6d37bfa3acbfe3912058f9aa83ef672788a7e5"'
                                            : 'id="xs-controllers-links-module-OpcionesModule-48900202ef0bc5750d894bd4840ea70addf4e8368d3ac311d35667f0ce60d484a25d1bdf6970a666f3acb1cf8f6d37bfa3acbfe3912058f9aa83ef672788a7e5"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/OpcionesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OpcionesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-OpcionesModule-48900202ef0bc5750d894bd4840ea70addf4e8368d3ac311d35667f0ce60d484a25d1bdf6970a666f3acb1cf8f6d37bfa3acbfe3912058f9aa83ef672788a7e5"'
                                        : 'data-bs-target="#xs-injectables-links-module-OpcionesModule-48900202ef0bc5750d894bd4840ea70addf4e8368d3ac311d35667f0ce60d484a25d1bdf6970a666f3acb1cf8f6d37bfa3acbfe3912058f9aa83ef672788a7e5"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-OpcionesModule-48900202ef0bc5750d894bd4840ea70addf4e8368d3ac311d35667f0ce60d484a25d1bdf6970a666f3acb1cf8f6d37bfa3acbfe3912058f9aa83ef672788a7e5"'
                                        : 'id="xs-injectables-links-module-OpcionesModule-48900202ef0bc5750d894bd4840ea70addf4e8368d3ac311d35667f0ce60d484a25d1bdf6970a666f3acb1cf8f6d37bfa3acbfe3912058f9aa83ef672788a7e5"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/OpcionesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OpcionesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PreguntasModule.html" data-type="entity-link" >PreguntasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-PreguntasModule-d97e195bf672cd5cd76352f12a4d3bac9ee01b000c619fee656a692ac64a5591f8412d9583c4373e8cafae2d64e9d386351748536c61e51de778dc0adb5fdf14"'
                                            : 'data-bs-target="#xs-controllers-links-module-PreguntasModule-d97e195bf672cd5cd76352f12a4d3bac9ee01b000c619fee656a692ac64a5591f8412d9583c4373e8cafae2d64e9d386351748536c61e51de778dc0adb5fdf14"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-PreguntasModule-d97e195bf672cd5cd76352f12a4d3bac9ee01b000c619fee656a692ac64a5591f8412d9583c4373e8cafae2d64e9d386351748536c61e51de778dc0adb5fdf14"'
                                            : 'id="xs-controllers-links-module-PreguntasModule-d97e195bf672cd5cd76352f12a4d3bac9ee01b000c619fee656a692ac64a5591f8412d9583c4373e8cafae2d64e9d386351748536c61e51de778dc0adb5fdf14"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/PreguntasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreguntasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-PreguntasModule-d97e195bf672cd5cd76352f12a4d3bac9ee01b000c619fee656a692ac64a5591f8412d9583c4373e8cafae2d64e9d386351748536c61e51de778dc0adb5fdf14"'
                                        : 'data-bs-target="#xs-injectables-links-module-PreguntasModule-d97e195bf672cd5cd76352f12a4d3bac9ee01b000c619fee656a692ac64a5591f8412d9583c4373e8cafae2d64e9d386351748536c61e51de778dc0adb5fdf14"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-PreguntasModule-d97e195bf672cd5cd76352f12a4d3bac9ee01b000c619fee656a692ac64a5591f8412d9583c4373e8cafae2d64e9d386351748536c61e51de778dc0adb5fdf14"'
                                        : 'id="xs-injectables-links-module-PreguntasModule-d97e195bf672cd5cd76352f12a4d3bac9ee01b000c619fee656a692ac64a5591f8412d9583c4373e8cafae2d64e9d386351748536c61e51de778dc0adb5fdf14"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/PreguntasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreguntasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RespuestasModule.html" data-type="entity-link" >RespuestasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-RespuestasModule-d713c8ab82a543ad58ce0a7b6b6ad49c4975a10a78093c9e96c3681c82107eb02d9de53e6327c68d07a8e6f7baa1d3bdfca5cb6660df7cac41e81e0b1bdff0b2"'
                                            : 'data-bs-target="#xs-controllers-links-module-RespuestasModule-d713c8ab82a543ad58ce0a7b6b6ad49c4975a10a78093c9e96c3681c82107eb02d9de53e6327c68d07a8e6f7baa1d3bdfca5cb6660df7cac41e81e0b1bdff0b2"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-RespuestasModule-d713c8ab82a543ad58ce0a7b6b6ad49c4975a10a78093c9e96c3681c82107eb02d9de53e6327c68d07a8e6f7baa1d3bdfca5cb6660df7cac41e81e0b1bdff0b2"'
                                            : 'id="xs-controllers-links-module-RespuestasModule-d713c8ab82a543ad58ce0a7b6b6ad49c4975a10a78093c9e96c3681c82107eb02d9de53e6327c68d07a8e6f7baa1d3bdfca5cb6660df7cac41e81e0b1bdff0b2"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/RespuestasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RespuestasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-RespuestasModule-d713c8ab82a543ad58ce0a7b6b6ad49c4975a10a78093c9e96c3681c82107eb02d9de53e6327c68d07a8e6f7baa1d3bdfca5cb6660df7cac41e81e0b1bdff0b2"'
                                        : 'data-bs-target="#xs-injectables-links-module-RespuestasModule-d713c8ab82a543ad58ce0a7b6b6ad49c4975a10a78093c9e96c3681c82107eb02d9de53e6327c68d07a8e6f7baa1d3bdfca5cb6660df7cac41e81e0b1bdff0b2"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-RespuestasModule-d713c8ab82a543ad58ce0a7b6b6ad49c4975a10a78093c9e96c3681c82107eb02d9de53e6327c68d07a8e6f7baa1d3bdfca5cb6660df7cac41e81e0b1bdff0b2"'
                                        : 'id="xs-injectables-links-module-RespuestasModule-d713c8ab82a543ad58ce0a7b6b6ad49c4975a10a78093c9e96c3681c82107eb02d9de53e6327c68d07a8e6f7baa1d3bdfca5cb6660df7cac41e81e0b1bdff0b2"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/RespuestasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RespuestasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#controllers-links"'
                                : 'data-bs-target="#xs-controllers-links"'
                            }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"'}>
                                <li class="link">
                                    <a href="controllers/EncuestasController.html" data-type="entity-link" >EncuestasController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OpcionesController.html" data-type="entity-link" >OpcionesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PreguntasController.html" data-type="entity-link" >PreguntasController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RespuestasController.html" data-type="entity-link" >RespuestasController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#entities-links"'
                                : 'data-bs-target="#xs-entities-links"'
                            }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"'}>
                                <li class="link">
                                    <a href="entities/Encuesta.html" data-type="entity-link" >Encuesta</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Opcion.html" data-type="entity-link" >Opcion</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Pregunta.html" data-type="entity-link" >Pregunta</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Pregunta-1.html" data-type="entity-link" >Pregunta</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Respuesta.html" data-type="entity-link" >Respuesta</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Respuesta-1.html" data-type="entity-link" >Respuesta</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RespuestaAbierta.html" data-type="entity-link" >RespuestaAbierta</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RespuestaOpcion.html" data-type="entity-link" >RespuestaOpcion</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#classes-links"'
                            : 'data-bs-target="#xs-classes-links"'
                        }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"'}>
                            <li class="link">
                                <a href="classes/ActualizarPreguntaDto.html" data-type="entity-link" >ActualizarPreguntaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEncuestaDto.html" data-type="entity-link" >CreateEncuestaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEncuestaResponseDto.html" data-type="entity-link" >CreateEncuestaResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOpcionDto.html" data-type="entity-link" >CreateOpcionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePreguntaDto.html" data-type="entity-link" >CreatePreguntaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ObtenerEncuestaDto.html" data-type="entity-link" >ObtenerEncuestaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OpcionConRespuestasDto.html" data-type="entity-link" >OpcionConRespuestasDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PreguntaConRespuestasDto.html" data-type="entity-link" >PreguntaConRespuestasDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegistrarRespuestasDto.html" data-type="entity-link" >RegistrarRespuestasDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RespuestaPreguntaDto.html" data-type="entity-link" >RespuestaPreguntaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/VisualizarRespuestasDto.html" data-type="entity-link" >VisualizarRespuestasDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#injectables-links"'
                                : 'data-bs-target="#xs-injectables-links"'
                            }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"'}>
                                <li class="link">
                                    <a href="injectables/EncuestasService.html" data-type="entity-link" >EncuestasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OpcionesService.html" data-type="entity-link" >OpcionesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PreguntasService.html" data-type="entity-link" >PreguntasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RespuestasService.html" data-type="entity-link" >RespuestasService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"'
                        }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"'}>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
      this.innerHTML = tp.strings;
    }
  },
);
