'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
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
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
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
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EncuestasModule.html" data-type="entity-link" >EncuestasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EncuestasModule-fdd382507efb131fc79f870ac5f5b45dd34dfc2994b613cdbf72a906593645337461f519b250fcb9d1827891708e170e7c08adafdc0e982a8ebce39fefa7627b"' : 'data-bs-target="#xs-controllers-links-module-EncuestasModule-fdd382507efb131fc79f870ac5f5b45dd34dfc2994b613cdbf72a906593645337461f519b250fcb9d1827891708e170e7c08adafdc0e982a8ebce39fefa7627b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EncuestasModule-fdd382507efb131fc79f870ac5f5b45dd34dfc2994b613cdbf72a906593645337461f519b250fcb9d1827891708e170e7c08adafdc0e982a8ebce39fefa7627b"' :
                                            'id="xs-controllers-links-module-EncuestasModule-fdd382507efb131fc79f870ac5f5b45dd34dfc2994b613cdbf72a906593645337461f519b250fcb9d1827891708e170e7c08adafdc0e982a8ebce39fefa7627b"' }>
                                            <li class="link">
                                                <a href="controllers/EncuestasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EncuestasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EncuestasModule-fdd382507efb131fc79f870ac5f5b45dd34dfc2994b613cdbf72a906593645337461f519b250fcb9d1827891708e170e7c08adafdc0e982a8ebce39fefa7627b"' : 'data-bs-target="#xs-injectables-links-module-EncuestasModule-fdd382507efb131fc79f870ac5f5b45dd34dfc2994b613cdbf72a906593645337461f519b250fcb9d1827891708e170e7c08adafdc0e982a8ebce39fefa7627b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EncuestasModule-fdd382507efb131fc79f870ac5f5b45dd34dfc2994b613cdbf72a906593645337461f519b250fcb9d1827891708e170e7c08adafdc0e982a8ebce39fefa7627b"' :
                                        'id="xs-injectables-links-module-EncuestasModule-fdd382507efb131fc79f870ac5f5b45dd34dfc2994b613cdbf72a906593645337461f519b250fcb9d1827891708e170e7c08adafdc0e982a8ebce39fefa7627b"' }>
                                        <li class="link">
                                            <a href="injectables/EncuestasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EncuestasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Encuesta.html" data-type="entity-link" >Encuesta</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Opcion.html" data-type="entity-link" >Opcion</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Pregunta.html" data-type="entity-link" >Pregunta</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateEncuestaDto.html" data-type="entity-link" >CreateEncuestaDto</a>
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
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
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
});