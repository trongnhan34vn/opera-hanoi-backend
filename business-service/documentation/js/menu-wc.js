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
                    <a href="index.html" data-type="index-link">business-service documentation</a>
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
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-e56b3fb5a917849acd7f233e07d984456568a272c9fd07246467317939a8ec82ff20a90ccd1742865ac07e40ccc1d82503931850489a75fc4635d47520e54fae"' : 'data-bs-target="#xs-controllers-links-module-AppModule-e56b3fb5a917849acd7f233e07d984456568a272c9fd07246467317939a8ec82ff20a90ccd1742865ac07e40ccc1d82503931850489a75fc4635d47520e54fae"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-e56b3fb5a917849acd7f233e07d984456568a272c9fd07246467317939a8ec82ff20a90ccd1742865ac07e40ccc1d82503931850489a75fc4635d47520e54fae"' :
                                            'id="xs-controllers-links-module-AppModule-e56b3fb5a917849acd7f233e07d984456568a272c9fd07246467317939a8ec82ff20a90ccd1742865ac07e40ccc1d82503931850489a75fc4635d47520e54fae"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-e56b3fb5a917849acd7f233e07d984456568a272c9fd07246467317939a8ec82ff20a90ccd1742865ac07e40ccc1d82503931850489a75fc4635d47520e54fae"' : 'data-bs-target="#xs-injectables-links-module-AppModule-e56b3fb5a917849acd7f233e07d984456568a272c9fd07246467317939a8ec82ff20a90ccd1742865ac07e40ccc1d82503931850489a75fc4635d47520e54fae"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e56b3fb5a917849acd7f233e07d984456568a272c9fd07246467317939a8ec82ff20a90ccd1742865ac07e40ccc1d82503931850489a75fc4635d47520e54fae"' :
                                        'id="xs-injectables-links-module-AppModule-e56b3fb5a917849acd7f233e07d984456568a272c9fd07246467317939a8ec82ff20a90ccd1742865ac07e40ccc1d82503931850489a75fc4635d47520e54fae"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConcertModule.html" data-type="entity-link" >ConcertModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ConcertModule-171842a3ccf1271121b06a7c457d14c0c5e49799f70901e43a962dc811f7d65859d7f45402785aa1f3cd849d598af593a0f42463ba7a36575e86eace021afa8e"' : 'data-bs-target="#xs-controllers-links-module-ConcertModule-171842a3ccf1271121b06a7c457d14c0c5e49799f70901e43a962dc811f7d65859d7f45402785aa1f3cd849d598af593a0f42463ba7a36575e86eace021afa8e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ConcertModule-171842a3ccf1271121b06a7c457d14c0c5e49799f70901e43a962dc811f7d65859d7f45402785aa1f3cd849d598af593a0f42463ba7a36575e86eace021afa8e"' :
                                            'id="xs-controllers-links-module-ConcertModule-171842a3ccf1271121b06a7c457d14c0c5e49799f70901e43a962dc811f7d65859d7f45402785aa1f3cd849d598af593a0f42463ba7a36575e86eace021afa8e"' }>
                                            <li class="link">
                                                <a href="controllers/ConcertController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConcertController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ConcertModule-171842a3ccf1271121b06a7c457d14c0c5e49799f70901e43a962dc811f7d65859d7f45402785aa1f3cd849d598af593a0f42463ba7a36575e86eace021afa8e"' : 'data-bs-target="#xs-injectables-links-module-ConcertModule-171842a3ccf1271121b06a7c457d14c0c5e49799f70901e43a962dc811f7d65859d7f45402785aa1f3cd849d598af593a0f42463ba7a36575e86eace021afa8e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConcertModule-171842a3ccf1271121b06a7c457d14c0c5e49799f70901e43a962dc811f7d65859d7f45402785aa1f3cd849d598af593a0f42463ba7a36575e86eace021afa8e"' :
                                        'id="xs-injectables-links-module-ConcertModule-171842a3ccf1271121b06a7c457d14c0c5e49799f70901e43a962dc811f7d65859d7f45402785aa1f3cd849d598af593a0f42463ba7a36575e86eace021afa8e"' }>
                                        <li class="link">
                                            <a href="injectables/ConcertMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConcertMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ConcertRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConcertRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ConcertService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConcertService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenreMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenreMapper</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GenreModule.html" data-type="entity-link" >GenreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-GenreModule-b51ef74e6ba0ea635d341e8244c1d2f2ff9cb3d9348c53e6562b3c687fa217a16cc259a06588bd6ff198334d06afe6abd1178897850ef6aca3458d7cc5c3709d"' : 'data-bs-target="#xs-controllers-links-module-GenreModule-b51ef74e6ba0ea635d341e8244c1d2f2ff9cb3d9348c53e6562b3c687fa217a16cc259a06588bd6ff198334d06afe6abd1178897850ef6aca3458d7cc5c3709d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GenreModule-b51ef74e6ba0ea635d341e8244c1d2f2ff9cb3d9348c53e6562b3c687fa217a16cc259a06588bd6ff198334d06afe6abd1178897850ef6aca3458d7cc5c3709d"' :
                                            'id="xs-controllers-links-module-GenreModule-b51ef74e6ba0ea635d341e8244c1d2f2ff9cb3d9348c53e6562b3c687fa217a16cc259a06588bd6ff198334d06afe6abd1178897850ef6aca3458d7cc5c3709d"' }>
                                            <li class="link">
                                                <a href="controllers/GenreController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenreController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-GenreModule-b51ef74e6ba0ea635d341e8244c1d2f2ff9cb3d9348c53e6562b3c687fa217a16cc259a06588bd6ff198334d06afe6abd1178897850ef6aca3458d7cc5c3709d"' : 'data-bs-target="#xs-injectables-links-module-GenreModule-b51ef74e6ba0ea635d341e8244c1d2f2ff9cb3d9348c53e6562b3c687fa217a16cc259a06588bd6ff198334d06afe6abd1178897850ef6aca3458d7cc5c3709d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GenreModule-b51ef74e6ba0ea635d341e8244c1d2f2ff9cb3d9348c53e6562b3c687fa217a16cc259a06588bd6ff198334d06afe6abd1178897850ef6aca3458d7cc5c3709d"' :
                                        'id="xs-injectables-links-module-GenreModule-b51ef74e6ba0ea635d341e8244c1d2f2ff9cb3d9348c53e6562b3c687fa217a16cc259a06588bd6ff198334d06afe6abd1178897850ef6aca3458d7cc5c3709d"' }>
                                        <li class="link">
                                            <a href="injectables/GenreMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenreMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenreRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenreRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenreService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenreService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/S3Module.html" data-type="entity-link" >S3Module</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-S3Module-10c7243c1a5141e571214d415b93aa4d8a4bc1d4b265dc37a7494c98ccceca4ca07700766cf24e01d2b60f72d0042ac237d26bc3ed6e442d4eeeb5056e20d2d8"' : 'data-bs-target="#xs-controllers-links-module-S3Module-10c7243c1a5141e571214d415b93aa4d8a4bc1d4b265dc37a7494c98ccceca4ca07700766cf24e01d2b60f72d0042ac237d26bc3ed6e442d4eeeb5056e20d2d8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-S3Module-10c7243c1a5141e571214d415b93aa4d8a4bc1d4b265dc37a7494c98ccceca4ca07700766cf24e01d2b60f72d0042ac237d26bc3ed6e442d4eeeb5056e20d2d8"' :
                                            'id="xs-controllers-links-module-S3Module-10c7243c1a5141e571214d415b93aa4d8a4bc1d4b265dc37a7494c98ccceca4ca07700766cf24e01d2b60f72d0042ac237d26bc3ed6e442d4eeeb5056e20d2d8"' }>
                                            <li class="link">
                                                <a href="controllers/S3Controller.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >S3Controller</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SeatCategoryModule.html" data-type="entity-link" >SeatCategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SeatCategoryModule-46939a76a401707f6e4879efb4308dabeff5d666faa9872b5e2fba23bafa848fbce1f529b046cc58f01c454ceb9cf6a2ac37dd5d1cac3fdfc040255f39643fe5"' : 'data-bs-target="#xs-controllers-links-module-SeatCategoryModule-46939a76a401707f6e4879efb4308dabeff5d666faa9872b5e2fba23bafa848fbce1f529b046cc58f01c454ceb9cf6a2ac37dd5d1cac3fdfc040255f39643fe5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SeatCategoryModule-46939a76a401707f6e4879efb4308dabeff5d666faa9872b5e2fba23bafa848fbce1f529b046cc58f01c454ceb9cf6a2ac37dd5d1cac3fdfc040255f39643fe5"' :
                                            'id="xs-controllers-links-module-SeatCategoryModule-46939a76a401707f6e4879efb4308dabeff5d666faa9872b5e2fba23bafa848fbce1f529b046cc58f01c454ceb9cf6a2ac37dd5d1cac3fdfc040255f39643fe5"' }>
                                            <li class="link">
                                                <a href="controllers/SeatCategoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeatCategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/S3Controller.html" data-type="entity-link" >S3Controller</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SeatCategoryController.html" data-type="entity-link" >SeatCategoryController</a>
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
                                <a href="classes/Artist.html" data-type="entity-link" >Artist</a>
                            </li>
                            <li class="link">
                                <a href="classes/ArtistDto.html" data-type="entity-link" >ArtistDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cart.html" data-type="entity-link" >Cart</a>
                            </li>
                            <li class="link">
                                <a href="classes/CartDto.html" data-type="entity-link" >CartDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CartItem.html" data-type="entity-link" >CartItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/CartItemDto.html" data-type="entity-link" >CartItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Concert.html" data-type="entity-link" >Concert</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcertDto.html" data-type="entity-link" >ConcertDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcertGenre.html" data-type="entity-link" >ConcertGenre</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcertSeat.html" data-type="entity-link" >ConcertSeat</a>
                            </li>
                            <li class="link">
                                <a href="classes/Director.html" data-type="entity-link" >Director</a>
                            </li>
                            <li class="link">
                                <a href="classes/DirectorDto.html" data-type="entity-link" >DirectorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExceptionController.html" data-type="entity-link" >ExceptionController</a>
                            </li>
                            <li class="link">
                                <a href="classes/Floor.html" data-type="entity-link" >Floor</a>
                            </li>
                            <li class="link">
                                <a href="classes/Genre.html" data-type="entity-link" >Genre</a>
                            </li>
                            <li class="link">
                                <a href="classes/GenreDto.html" data-type="entity-link" >GenreDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Image.html" data-type="entity-link" >Image</a>
                            </li>
                            <li class="link">
                                <a href="classes/Pagination.html" data-type="entity-link" >Pagination</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationResponse.html" data-type="entity-link" >PaginationResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/Price.html" data-type="entity-link" >Price</a>
                            </li>
                            <li class="link">
                                <a href="classes/Room.html" data-type="entity-link" >Room</a>
                            </li>
                            <li class="link">
                                <a href="classes/Seat.html" data-type="entity-link" >Seat</a>
                            </li>
                            <li class="link">
                                <a href="classes/SeatCategory.html" data-type="entity-link" >SeatCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/SeatCategoryDto.html" data-type="entity-link" >SeatCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShowTime.html" data-type="entity-link" >ShowTime</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShowtimeDto.html" data-type="entity-link" >ShowtimeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Zone.html" data-type="entity-link" >Zone</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CartItemMapper.html" data-type="entity-link" >CartItemMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CartMapper.html" data-type="entity-link" >CartMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/KeycloakConfig.html" data-type="entity-link" >KeycloakConfig</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/S3Service.html" data-type="entity-link" >S3Service</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeatCategoryMapper.html" data-type="entity-link" >SeatCategoryMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeatCategoryRepository.html" data-type="entity-link" >SeatCategoryRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeatCategoryService.html" data-type="entity-link" >SeatCategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeatRepository.html" data-type="entity-link" >SeatRepository</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/GlobalAuthGuard.html" data-type="entity-link" >GlobalAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/SkipAuthGuard.html" data-type="entity-link" >SkipAuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ConcertMapperInterface.html" data-type="entity-link" >ConcertMapperInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConcertRepositoryInterface.html" data-type="entity-link" >ConcertRepositoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConcertServiceInterface.html" data-type="entity-link" >ConcertServiceInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenericMapperInterface.html" data-type="entity-link" >GenericMapperInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenericRepositoryInterface.html" data-type="entity-link" >GenericRepositoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenericServiceInterface.html" data-type="entity-link" >GenericServiceInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenreMapperInterface.html" data-type="entity-link" >GenreMapperInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenreRepositoryInterface.html" data-type="entity-link" >GenreRepositoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenreServiceInterface.html" data-type="entity-link" >GenreServiceInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICartItemMapper.html" data-type="entity-link" >ICartItemMapper</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICartMapper.html" data-type="entity-link" >ICartMapper</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IS3Service.html" data-type="entity-link" >IS3Service</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISeatCategoryMapper.html" data-type="entity-link" >ISeatCategoryMapper</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISeatCategoryRepository.html" data-type="entity-link" >ISeatCategoryRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISeatCategoryService.html" data-type="entity-link" >ISeatCategoryService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SeatRepositoryInterface.html" data-type="entity-link" >SeatRepositoryInterface</a>
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
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
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