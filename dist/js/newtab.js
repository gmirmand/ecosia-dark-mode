(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
        module.exports = window.chrome || browser; // eslint-disable-line no-undef

    },{}],2:[function(require,module,exports){
        const querystring = require('querystring');
        const url = require('url');
        const browserAPI = require('./browser-api');

        const MANIFEST = browserAPI.runtime.getManifest();
        const VERSION = MANIFEST.version;
        const TARGET = MANIFEST.target;
        const HOST = 'https://www.ecosia.org';
        const INDICATOR_PARAMS = { addon: TARGET, addonversion: VERSION };

        function compileURL(pathname, extraParams) {
            const parsed = url.parse(HOST);
            parsed.pathname = pathname;
            parsed.search = querystring.stringify(Object.assign({}, extraParams, INDICATOR_PARAMS));
            return url.format(parsed);
        }

        module.exports = {
            VERSION,
            TARGET,
            FIRST_RUN_PAGE: compileURL('firstrun', {}),
            UNINSTALL_PAGE: compileURL('uninstall', { feedback: 'true' }),
            ICON_SEARCH_URL: compileURL('', { ref: 'icon-search' }),
            compileSearchURL: query => compileURL('search', { q: query }),
        };

    },{"./browser-api":1,"querystring":23,"url":24}],3:[function(require,module,exports){
        const browserAPI = require('./browser-api');

        const localizeContent = () => {
            const nodes = document.querySelectorAll('[data-i18n]') || [];
            Array.prototype.forEach.call(nodes, (node) => {
                const localizedString = browserAPI.i18n.getMessage(node.dataset.i18n);
                if (node.dataset.i18nTarget) {
                    node.setAttribute(node.dataset.i18nTarget, localizedString);
                } else {
                    node.innerHTML = localizedString;
                }
            });
        };

        exports.localizeContent = localizeContent;

    },{"./browser-api":1}],4:[function(require,module,exports){
        class Model {
            constructor(initial = {}) {
                this.model = initial;
                this.subscribers = [];
            }
            get(key) {
                return key ? this.model[key] : this.model;
            }
            set(update) {
                Object.assign(this.model, update);
                this.subscribers.forEach(callback => callback(this.model));
            }
            subscribe(...callbacks) {
                this.subscribers = [...this.subscribers, ...callbacks];
            }
        }

        exports.Model = Model;

    },{}],5:[function(require,module,exports){
        const { initSearchFormApp } = require('./search-form-app');
        const { initTopSitesApp } = require('./top-sites-app');
        const { localizeContent } = require('./localize-content');

        window.addEventListener('DOMContentLoaded', () => {
            initSearchFormApp();
            initTopSitesApp();
            localizeContent();
        });

    },{"./localize-content":3,"./search-form-app":7,"./top-sites-app":10}],6:[function(require,module,exports){
        module.exports = (...nodes) => nodes.forEach((node) => {
            const matchingChildren = node.querySelectorAll('.js-prefetch-src') || [];
            Array.prototype.forEach.call(matchingChildren, (placeholderNode) => {
                placeholderNode.classList.remove('js-prefetch-src');
                const img = new Image();
                img.addEventListener('load', () => {
                    placeholderNode.classList.add('image-loaded');
                });
                img.addEventListener('error', () => {
                    if (placeholderNode.parentNode) {
                        placeholderNode.parentNode.removeChild(placeholderNode);
                    }
                });
                img.setAttribute('src', placeholderNode.getAttribute('src'));
            });
        });

    },{}],7:[function(require,module,exports){
        const browserAPI = require('./browser-api');
        const { VERSION } = require('./constants');
        const { Component } = require('@ecosia/ecosia-ui/src/scripts/components/search-form');

        function initSearchFormApp() {
            const versionEl = document.querySelector('#searchForm input[name="addonversion"]');
            if (versionEl) {
                versionEl.value = VERSION;
            }
            new Component({
                endpoint: 'https://ac.ecosia.org/autocomplete',
                market: browserAPI.i18n.getUILanguage()
            });
        }

        exports.initSearchFormApp = initSearchFormApp;

    },{"./browser-api":1,"./constants":2,"@ecosia/ecosia-ui/src/scripts/components/search-form":15}],8:[function(require,module,exports){
        const browserAPI = require('./browser-api');

        exports.get = key => new Promise((resolve, reject) => {
            browserAPI.storage.sync.get(key, (items) => {
                if (browserAPI.runtime.lastError) {
                    reject(browserAPI.runtime.lastError);
                } else {
                    resolve(items);
                }
            });
        });

        exports.set = items => new Promise((resolve, reject) => {
            browserAPI.storage.sync.set(items, (response) => {
                if (browserAPI.runtime.lastError) {
                    reject(browserAPI.runtime.lastError);
                } else {
                    resolve(response);
                }
            });
        });

        exports.remove = items => new Promise((resolve, reject) => {
            browserAPI.storage.sync.remove(items, (response) => {
                if (browserAPI.runtime.lastError) {
                    reject(browserAPI.runtime.lastError);
                } else {
                    resolve(response);
                }
            });
        });

        exports.getLocal = key => new Promise((resolve, reject) => {
            browserAPI.storage.local.get(key, (items) => {
                if (browserAPI.runtime.lastError) {
                    reject(browserAPI.runtime.lastError);
                } else {
                    resolve(items);
                }
            });
        });

        exports.setLocal = items => new Promise((resolve, reject) => {
            browserAPI.storage.local.set(items, () => {
                if (browserAPI.runtime.lastError) {
                    reject(browserAPI.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });

        exports.getTopSites = () => new Promise((resolve, reject) => {
            browserAPI.topSites.get((items) => {
                if (browserAPI.runtime.lastError) {
                    reject(browserAPI.runtime.lastError);
                } else {
                    resolve(items);
                }
            });
        });

    },{"./browser-api":1}],9:[function(require,module,exports){
        const browserAPI = require('../browser-api');

        const BACKGROUNDS = ['bg-saphire', 'bg-red', 'bg-saphire-light', 'bg-green', 'bg-orange', 'bg-salad'];

        const crossIconTemplate = () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.83 22.83" width="10" height="10">
        <line x1="1.41" y1="1.41" x2="21.41" y2="21.41" fill="none" stroke="#9b9b9b" stroke-miterlimit="10" stroke-width="4"/><line x1="21.41" y1="1.41" x2="1.41" y2="21.41" fill="none" stroke="#9b9b9b" stroke-miterlimit="10" stroke-width="4"/>
    </svg>
`;

        exports.siteNavigationTemplate = (model = {}) => {
            if (!model.showMenu) return '';
            return `
        <ul class="newtab-nav">
            <li>${browserAPI.i18n.getMessage('new_tab_thumbnail_removed')}</li>
            <li><a class="js-undo">${browserAPI.i18n.getMessage('new_tab_undo')}</a></li>
            <li><a class="js-restore-topsites">${browserAPI.i18n.getMessage('new_tab_restore_all')}</a></li>
            <li>
                <span class="js-hide-nav">${crossIconTemplate()}</span>
            </li>
        </ul>
    `;
        };

        exports.topSitesItemTemplate = (site, index) => {
            const url = site.affiliatedUrl || site.url;
            return `<li class="newtab-item ${BACKGROUNDS[index % BACKGROUNDS.length]}">
        <a href="${url}">
            <span class="newtab-link">
                <span class="newtab-letter">${site.title.charAt(0)}</span>
            </span>
            <div class="newtab-header">
                <img class="newtab-icon js-prefetch-src" height="16" width="16" src='https://www.google.com/s2/favicons?domain=${site.url}' />
                <span class="newtab-title">${site.title}</span>
                ${site.locked
                ? ''
                : `
                        <span class="js-remove-topsite newtab-remove" data-url="${site.url}">
                            ${crossIconTemplate()}
                        </span>
                    `
                }
            </div>
        </div>
    </li>`;
        };

    },{"../browser-api":1}],10:[function(require,module,exports){
        const { siteNavigationTemplate, topSitesItemTemplate } = require('./templates/newtab');
        const { Model } = require('./model');
        const storage = require('./storage');
        const prefetchImages = require('./prefetch-images');

        class TopSitesModel extends Model {
            handleRemoveTopSite(topSiteToRemove) {
                const removedTopSites = [...this.get('removedTopSites'), topSiteToRemove];
                this.set({
                    lastRemovedItem: topSiteToRemove,
                    showMenu: true,
                    removedTopSites
                });
            }
            handleRestoreTopSites() {
                this.set({
                    showMenu: false,
                    lastRemovedItem: null,
                    removedTopSites: []
                });
            }
            handleUndo() {
                const update = this
                    .get('removedTopSites')
                    .filter(s => s !== this.get('lastRemovedItem'));
                this.set({
                    showMenu: false,
                    removedTopSites: update
                });
            }
            handleHideNav() {
                this.set({ showMenu: false });
            }
        }

        function render(data) {
            const eligibleTopSites = data.topSites
                .filter(site => !data.removedTopSites.includes(site.url))
                .slice(0, data.itemsVisible);

            const lastVisited = document.querySelector('#lastVisited');
            if (lastVisited) {
                lastVisited.innerHTML = eligibleTopSites.map(topSitesItemTemplate).join('');
                prefetchImages(lastVisited);
            }

            const topsitesNavigation = document.querySelector('#topsitesNavigation');
            if (topsitesNavigation) {
                topsitesNavigation.innerHTML = siteNavigationTemplate(data);
            }
        }

        function findClosest(selector, element) {
            let current = element;
            while (!current.matches(selector) && !current.matches('body')) {
                current = current.parentElement;
            }
            return current.matches(selector) ? current : null;
        }

        function initTopSitesApp() {
            const ITEMS_VISIBLE = 8;

            const model = new TopSitesModel();
            model.subscribe(
                render,
                ({ removedTopSites }) => storage.set({ removedTopSites })
            );

            document.addEventListener('click', (e) => {
                if (findClosest('.js-remove-topsite', e.target)) {
                    e.preventDefault();
                    model.handleRemoveTopSite.call(
                        model,
                        findClosest('.js-remove-topsite', e.target).dataset.url
                    );
                }
                if (findClosest('.js-restore-topsites', e.target)) {
                    model.handleRestoreTopSites.call(model);
                }
                if (findClosest('.js-hide-nav', e.target)) {
                    model.handleHideNav.call(model);
                }
                if (findClosest('.js-undo', e.target)) {
                    model.handleUndo.call(model);
                }
            });

            const fetchTopSites = storage.getTopSites();
            const fetchRemovedTopSites = storage.get('removedTopSites');

            Promise.all([fetchTopSites, fetchRemovedTopSites])
                .then(([topSites, { removedTopSites = [] }]) => {
                    model.set({
                        topSites,
                        removedTopSites,
                        showMenu: false,
                        lastRemovedItem: null,
                        itemsVisible: ITEMS_VISIBLE
                    });
                });
        }

        exports.initTopSitesApp = initTopSitesApp;

    },{"./model":4,"./prefetch-images":6,"./storage":8,"./templates/newtab":9}],11:[function(require,module,exports){
        'use strict';

        var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        var querystring = require('querystring');

        var _require = require('../../xhr'),
            getJSON = _require.getJSON;

        var Api = function () {
            function Api(endpoint) {
                var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-us';

                _classCallCheck(this, Api);

                this.endpoint = endpoint;
                this.market = market;
                this.cache = {};
            }

            _createClass(Api, [{
                key: 'params',
                value: function params(query) {
                    return querystring.stringify({ q: query, mkt: this.market });
                }
            }, {
                key: 'fetch',
                value: function fetch(query) {
                    this.cache[query] = this.cache[query] || getJSON(this.endpoint + '?' + this.params(query));
                    return this.cache[query];
                }
            }]);

            return Api;
        }();

        module.exports = Api;

    },{"../../xhr":19,"querystring":23}],12:[function(require,module,exports){
        "use strict";

        var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

        var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

        function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        var BaseModel = function () {
            function BaseModel() {
                var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                _classCallCheck(this, BaseModel);

                this.attributes = data;
                this.subscribers = [];
            }

            _createClass(BaseModel, [{
                key: "set",
                value: function set(update) {
                    var _this = this;

                    _extends(this.attributes, update);
                    this.subscribers.forEach(function (cb) {
                        return cb(_this.get(), update);
                    });
                }
            }, {
                key: "get",
                value: function get(key) {
                    if (key) return this.attributes[key];
                    return _extends({}, this.attributes);
                }
            }, {
                key: "subscribe",
                value: function subscribe() {
                    for (var _len = arguments.length, callbacks = Array(_len), _key = 0; _key < _len; _key++) {
                        callbacks[_key] = arguments[_key];
                    }

                    this.subscribers = [].concat(_toConsumableArray(this.subscribers), callbacks);
                }
            }]);

            return BaseModel;
        }();

        module.exports = BaseModel;

    },{}],13:[function(require,module,exports){
        'use strict';

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        var _require = require('./constants'),
            MOBILE_SUGGESTION_COUNT = _require.MOBILE_SUGGESTION_COUNT,
            DESKTOP_SUGGESTION_COUNT = _require.DESKTOP_SUGGESTION_COUNT;

        var Api = require('./api');
        var Model = require('./model');
        var SuggestionsModel = require('./suggestions-model');
        var View = require('./view');

        var Component = function Component(_ref) {
            var market = _ref.market,
                isMobile = _ref.isMobile,
                endpoint = _ref.endpoint,
                el = _ref.el;

            _classCallCheck(this, Component);

            var provider = new Api(endpoint, market);
            var limit = isMobile ? MOBILE_SUGGESTION_COUNT : DESKTOP_SUGGESTION_COUNT;
            var suggestions = new SuggestionsModel(provider, limit);
            var model = new Model(suggestions);
            new View(el || document.querySelector('.js-search-form'), model);
        };

        module.exports = Component;

    },{"./api":11,"./constants":14,"./model":16,"./suggestions-model":17,"./view":18}],14:[function(require,module,exports){
        "use strict";

        exports.MOBILE_SUGGESTION_COUNT = 3;
        exports.DESKTOP_SUGGESTION_COUNT = 5;

    },{}],15:[function(require,module,exports){
        'use strict';

        var BaseModel = require('./base-model');
        var Component = require('./component');
        var Model = require('./model');
        var SuggestionsModel = require('./suggestions-model');

        exports.Component = Component;
        exports.BaseModel = BaseModel;
        exports.Model = Model;
        exports.SuggestionsModel = SuggestionsModel;

    },{"./base-model":12,"./component":13,"./model":16,"./suggestions-model":17}],16:[function(require,module,exports){
        'use strict';

        var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

        var BaseModel = require('./base-model');

        var Model = function (_BaseModel) {
            _inherits(Model, _BaseModel);

            function Model(suggestionsModel) {
                _classCallCheck(this, Model);

                var _this = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this));

                _this.attributes = {
                    suggestions: [],
                    highlight: -1,
                    query: '',
                    inputValue: '',
                    focus: false
                };

                _this.suggestions = suggestionsModel;
                _this.suggestions.subscribe(function (data, update) {
                    if ('suggestions' in update) {
                        _this.set({ suggestions: update.suggestions });
                    }
                });
                _this.subscribe(function (data, update) {
                    if ('query' in update) {
                        _this.suggestions.set({ query: update.query });
                        _this.set({ highlight: -1 });
                    }
                    if ('highlight' in update) {
                        var pick = _this.get('suggestions')[update.highlight];
                        if (pick) {
                            _this.set({ inputValue: pick.suggestion });
                        }
                    }
                });
                return _this;
            }

            _createClass(Model, [{
                key: 'moveHighlight',
                value: function moveHighlight(increment) {
                    var next = this.get('highlight') + increment;
                    if (next < 0) {
                        next = this.get('suggestions').length - 1;
                    } else if (next >= this.get('suggestions').length) {
                        next = 0;
                    }
                    this.set({ highlight: next });
                }
            }]);

            return Model;
        }(BaseModel);

        module.exports = Model;

    },{"./base-model":12}],17:[function(require,module,exports){
        'use strict';

        var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

        var BaseModel = require('./base-model');

        var SuggestionsModel = function (_BaseModel) {
            _inherits(SuggestionsModel, _BaseModel);

            function SuggestionsModel(provider, limit) {
                _classCallCheck(this, SuggestionsModel);

                var _this = _possibleConstructorReturn(this, (SuggestionsModel.__proto__ || Object.getPrototypeOf(SuggestionsModel)).call(this));

                _this.cache = {};
                _this.limit = limit;
                _this.attributes = {
                    query: '',
                    suggestions: []
                };
                _this.provider = provider;

                _this.cancelPending = Function.prototype;
                _this.subscribe(function (data, update) {
                    if ('query' in update) {
                        if (update.query) {
                            _this.performQuery(update.query);
                        } else {
                            _this.set({ suggestions: [] });
                        }
                    }
                });
                return _this;
            }

            _createClass(SuggestionsModel, [{
                key: 'performQuery',
                value: function performQuery(query) {
                    var _this2 = this;

                    this.cancelPending();

                    var _provider$fetch = this.provider.fetch(query),
                        result = _provider$fetch.result,
                        cancel = _provider$fetch.cancel;

                    this.cancelPending = cancel;
                    return result.then(function (_ref) {
                        var suggestions = _ref.suggestions;

                        var update = suggestions.filter(function (s, index) {
                            return !_this2.limit || index < _this2.limit;
                        }).map(function (suggestion) {
                            return { suggestion: suggestion, query: query };
                        });
                        _this2.set({ suggestions: update });
                    }).catch(Function.prototype);
                }
            }]);

            return SuggestionsModel;
        }(BaseModel);

        module.exports = SuggestionsModel;

    },{"./base-model":12}],18:[function(require,module,exports){
        'use strict';

        var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        var View = function () {
            function View(el, model) {
                var _this = this;

                _classCallCheck(this, View);

                this.el = el;
                this.model = model;

                this.inputEl = this.el.querySelector('input[type="search"]');
                this.model.set({
                    inputValue: this.inputEl.value,
                    formAction: this.el.getAttribute('action')
                });

                this.listEl = document.createElement('ul');
                this.listEl.classList.add('typeahead');
                this.listEl.style.top = getComputedStyle(this.inputEl).height;
                this.listEl.addEventListener('click', this.handleSuggestionClick.bind(this));
                this.el.querySelector('.search-form-wrapper').appendChild(this.listEl);

                this.resetEl = this.el.querySelector('[type="reset"]');
                this.resetEl.addEventListener('click', this.handleResetClick.bind(this));

                this.inputEl.addEventListener('input', this.handleInput.bind(this));
                this.inputEl.addEventListener('focus', this.handleFocus.bind(this));
                this.inputEl.addEventListener('keydown', this.handleKeydown.bind(this));
                this.inputEl.addEventListener('blur', this.handleBlur.bind(this));

                this.model.subscribe(function (data) {
                    return _this.render(data);
                });
                this.render(this.model.get());
            }

            _createClass(View, [{
                key: 'render',
                value: function render(data) {
                    // only update the inputValue when different (i.e. via using arrow keys) as
                    // updating the value to itself will make Safari move the cursor position
                    if (this.inputEl.value !== data.inputValue) {
                        this.inputEl.value = data.inputValue;
                    }

                    if (data.inputValue.length && data.focus) {
                        this.el.classList.add('is-shown');
                        this.resetEl.classList.add('is-shown');
                    } else {
                        this.el.classList.remove('is-shown');
                        this.resetEl.classList.remove('is-shown');
                    }
                    if (data.suggestions.length && data.focus) {
                        this.listEl.style.display = 'block';
                        this.listEl.innerHTML = View.template(data);
                    } else {
                        this.listEl.style.display = 'none';
                    }
                }
            }, {
                key: 'handleFocus',
                value: function handleFocus() {
                    this.model.set({ focus: true });
                }
            }, {
                key: 'handleInput',
                value: function handleInput() {
                    this.model.set({
                        focus: true,
                        query: this.inputEl.value.trim(),
                        inputValue: this.inputEl.value
                    });
                }
            }, {
                key: 'handleKeydown',
                value: function handleKeydown(e) {
                    switch (e.keyCode) {
                        case 27:
                            // escape key
                            // input[type="search"] clears its content on escape
                            // instead, we want to keep the content and make the
                            // input lose focus
                            e.preventDefault();
                            this.model.set({ focus: false });
                            break;
                        case 38: // up arrow
                        case 40:
                            // down arrow
                            e.preventDefault();
                            this.model.moveHighlight(e.keyCode === 38 ? -1 : 1);
                            break;
                        default:
                    }
                }
            }, {
                key: 'handleBlur',
                value: function handleBlur() {
                    var _this2 = this;

                    // defer the update as the user might have clicked a suggestion
                    // and we need to wait for the browser to react to this input
                    setTimeout(function () {
                        _this2.model.set({ focus: false });
                    }, 500);
                }
            }, {
                key: 'handleSuggestionClick',
                value: function handleSuggestionClick(e) {
                    if (e.target.matches('.typeahead-link')) {
                        this.model.set({ inputValue: e.target.getAttribute('data-query') });
                    }
                }
            }, {
                key: 'handleResetClick',
                value: function handleResetClick() {
                    this.model.set({ inputValue: '', query: '' });
                    this.inputEl.focus();
                }
            }], [{
                key: 'template',
                value: function template(_ref) {
                    var suggestions = _ref.suggestions,
                        highlight = _ref.highlight,
                        formAction = _ref.formAction;

                    return suggestions.map(function (_ref2, index) {
                        var suggestion = _ref2.suggestion,
                            query = _ref2.query;
                        return '\n            <li class="typeahead-suggestion ' + (index === highlight ? ' active' : '') + '">\n                <a\n                    class="typeahead-link"\n                    href="' + formAction + '?q=' + encodeURIComponent(suggestion) + '"\n                    data-query="' + suggestion + '"\n                >\n                    ' + View.highlighter(View.escapeHTML(suggestion), query) + '\n                </a>\n            </li>\n        ';
                    }).join('');
                }
            }, {
                key: 'escapeHTML',
                value: function escapeHTML(string) {
                    return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                }
            }, {
                key: 'highlighter',
                value: function highlighter(string, token) {
                    // potential regexp patterns in the passed token need to be escaped first
                    var re = new RegExp('(' + token.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + ')', 'ig');
                    return string.replace(re, function ($1, match) {
                        return '<strong>' + match + '</strong>';
                    });
                }
            }]);

            return View;
        }();

        module.exports = View;

    },{}],19:[function(require,module,exports){
        'use strict';

        var xhrGet = function xhrGet(url) {
            var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var xhr = new XMLHttpRequest();
            var result = new Promise(function (resolve, reject) {
                xhr.open('get', url, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState !== XMLHttpRequest.DONE) return;
                    var status = xhr.status;

                    if (status >= 200 && status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(new Error('Request failed with status code ' + status));
                    }
                };
                Object.keys(headers).forEach(function (key) {
                    xhr.setRequestHeader(key, headers[key]);
                });
                xhr.send();
            });
            var cancel = function cancel() {
                if (xhr.readyState === XMLHttpRequest.DONE) return false;
                xhr.abort();
                return true;
            };
            return { result: result, cancel: cancel };
        };

        exports.getJSON = function (url) {
            var _xhrGet = xhrGet(url),
                result = _xhrGet.result,
                cancel = _xhrGet.cancel;

            return { result: result.then(function (data) {
                    return JSON.parse(data);
                }), cancel: cancel };
        };

        exports.getHTML = function (url) {
            return xhrGet(url, { 'Content-type': 'text/html' });
        };

    },{}],20:[function(require,module,exports){
        (function (global){
            /*! https://mths.be/punycode v1.4.1 by @mathias */
            ;(function(root) {

                /** Detect free variables */
                var freeExports = typeof exports == 'object' && exports &&
                    !exports.nodeType && exports;
                var freeModule = typeof module == 'object' && module &&
                    !module.nodeType && module;
                var freeGlobal = typeof global == 'object' && global;
                if (
                    freeGlobal.global === freeGlobal ||
                    freeGlobal.window === freeGlobal ||
                    freeGlobal.self === freeGlobal
                ) {
                    root = freeGlobal;
                }

                /**
                 * The `punycode` object.
                 * @name punycode
                 * @type Object
                 */
                var punycode,

                    /** Highest positive signed 32-bit float value */
                    maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

                    /** Bootstring parameters */
                    base = 36,
                    tMin = 1,
                    tMax = 26,
                    skew = 38,
                    damp = 700,
                    initialBias = 72,
                    initialN = 128, // 0x80
                    delimiter = '-', // '\x2D'

                    /** Regular expressions */
                    regexPunycode = /^xn--/,
                    regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
                    regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

                    /** Error messages */
                    errors = {
                        'overflow': 'Overflow: input needs wider integers to process',
                        'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                        'invalid-input': 'Invalid input'
                    },

                    /** Convenience shortcuts */
                    baseMinusTMin = base - tMin,
                    floor = Math.floor,
                    stringFromCharCode = String.fromCharCode,

                    /** Temporary variable */
                    key;

                /*--------------------------------------------------------------------------*/

                /**
                 * A generic error utility function.
                 * @private
                 * @param {String} type The error type.
                 * @returns {Error} Throws a `RangeError` with the applicable error message.
                 */
                function error(type) {
                    throw new RangeError(errors[type]);
                }

                /**
                 * A generic `Array#map` utility function.
                 * @private
                 * @param {Array} array The array to iterate over.
                 * @param {Function} callback The function that gets called for every array
                 * item.
                 * @returns {Array} A new array of values returned by the callback function.
                 */
                function map(array, fn) {
                    var length = array.length;
                    var result = [];
                    while (length--) {
                        result[length] = fn(array[length]);
                    }
                    return result;
                }

                /**
                 * A simple `Array#map`-like wrapper to work with domain name strings or email
                 * addresses.
                 * @private
                 * @param {String} domain The domain name or email address.
                 * @param {Function} callback The function that gets called for every
                 * character.
                 * @returns {Array} A new string of characters returned by the callback
                 * function.
                 */
                function mapDomain(string, fn) {
                    var parts = string.split('@');
                    var result = '';
                    if (parts.length > 1) {
                        // In email addresses, only the domain name should be punycoded. Leave
                        // the local part (i.e. everything up to `@`) intact.
                        result = parts[0] + '@';
                        string = parts[1];
                    }
                    // Avoid `split(regex)` for IE8 compatibility. See #17.
                    string = string.replace(regexSeparators, '\x2E');
                    var labels = string.split('.');
                    var encoded = map(labels, fn).join('.');
                    return result + encoded;
                }

                /**
                 * Creates an array containing the numeric code points of each Unicode
                 * character in the string. While JavaScript uses UCS-2 internally,
                 * this function will convert a pair of surrogate halves (each of which
                 * UCS-2 exposes as separate characters) into a single code point,
                 * matching UTF-16.
                 * @see `punycode.ucs2.encode`
                 * @see <https://mathiasbynens.be/notes/javascript-encoding>
                 * @memberOf punycode.ucs2
                 * @name decode
                 * @param {String} string The Unicode input string (UCS-2).
                 * @returns {Array} The new array of code points.
                 */
                function ucs2decode(string) {
                    var output = [],
                        counter = 0,
                        length = string.length,
                        value,
                        extra;
                    while (counter < length) {
                        value = string.charCodeAt(counter++);
                        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                            // high surrogate, and there is a next character
                            extra = string.charCodeAt(counter++);
                            if ((extra & 0xFC00) == 0xDC00) { // low surrogate
                                output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                            } else {
                                // unmatched surrogate; only append this code unit, in case the next
                                // code unit is the high surrogate of a surrogate pair
                                output.push(value);
                                counter--;
                            }
                        } else {
                            output.push(value);
                        }
                    }
                    return output;
                }

                /**
                 * Creates a string based on an array of numeric code points.
                 * @see `punycode.ucs2.decode`
                 * @memberOf punycode.ucs2
                 * @name encode
                 * @param {Array} codePoints The array of numeric code points.
                 * @returns {String} The new Unicode string (UCS-2).
                 */
                function ucs2encode(array) {
                    return map(array, function(value) {
                        var output = '';
                        if (value > 0xFFFF) {
                            value -= 0x10000;
                            output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                            value = 0xDC00 | value & 0x3FF;
                        }
                        output += stringFromCharCode(value);
                        return output;
                    }).join('');
                }

                /**
                 * Converts a basic code point into a digit/integer.
                 * @see `digitToBasic()`
                 * @private
                 * @param {Number} codePoint The basic numeric code point value.
                 * @returns {Number} The numeric value of a basic code point (for use in
                 * representing integers) in the range `0` to `base - 1`, or `base` if
                 * the code point does not represent a value.
                 */
                function basicToDigit(codePoint) {
                    if (codePoint - 48 < 10) {
                        return codePoint - 22;
                    }
                    if (codePoint - 65 < 26) {
                        return codePoint - 65;
                    }
                    if (codePoint - 97 < 26) {
                        return codePoint - 97;
                    }
                    return base;
                }

                /**
                 * Converts a digit/integer into a basic code point.
                 * @see `basicToDigit()`
                 * @private
                 * @param {Number} digit The numeric value of a basic code point.
                 * @returns {Number} The basic code point whose value (when used for
                 * representing integers) is `digit`, which needs to be in the range
                 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
                 * used; else, the lowercase form is used. The behavior is undefined
                 * if `flag` is non-zero and `digit` has no uppercase form.
                 */
                function digitToBasic(digit, flag) {
                    //  0..25 map to ASCII a..z or A..Z
                    // 26..35 map to ASCII 0..9
                    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
                }

                /**
                 * Bias adaptation function as per section 3.4 of RFC 3492.
                 * https://tools.ietf.org/html/rfc3492#section-3.4
                 * @private
                 */
                function adapt(delta, numPoints, firstTime) {
                    var k = 0;
                    delta = firstTime ? floor(delta / damp) : delta >> 1;
                    delta += floor(delta / numPoints);
                    for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
                        delta = floor(delta / baseMinusTMin);
                    }
                    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
                }

                /**
                 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
                 * symbols.
                 * @memberOf punycode
                 * @param {String} input The Punycode string of ASCII-only symbols.
                 * @returns {String} The resulting string of Unicode symbols.
                 */
                function decode(input) {
                    // Don't use UCS-2
                    var output = [],
                        inputLength = input.length,
                        out,
                        i = 0,
                        n = initialN,
                        bias = initialBias,
                        basic,
                        j,
                        index,
                        oldi,
                        w,
                        k,
                        digit,
                        t,
                        /** Cached calculation results */
                        baseMinusT;

                    // Handle the basic code points: let `basic` be the number of input code
                    // points before the last delimiter, or `0` if there is none, then copy
                    // the first basic code points to the output.

                    basic = input.lastIndexOf(delimiter);
                    if (basic < 0) {
                        basic = 0;
                    }

                    for (j = 0; j < basic; ++j) {
                        // if it's not a basic code point
                        if (input.charCodeAt(j) >= 0x80) {
                            error('not-basic');
                        }
                        output.push(input.charCodeAt(j));
                    }

                    // Main decoding loop: start just after the last delimiter if any basic code
                    // points were copied; start at the beginning otherwise.

                    for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

                        // `index` is the index of the next character to be consumed.
                        // Decode a generalized variable-length integer into `delta`,
                        // which gets added to `i`. The overflow checking is easier
                        // if we increase `i` as we go, then subtract off its starting
                        // value at the end to obtain `delta`.
                        for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

                            if (index >= inputLength) {
                                error('invalid-input');
                            }

                            digit = basicToDigit(input.charCodeAt(index++));

                            if (digit >= base || digit > floor((maxInt - i) / w)) {
                                error('overflow');
                            }

                            i += digit * w;
                            t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

                            if (digit < t) {
                                break;
                            }

                            baseMinusT = base - t;
                            if (w > floor(maxInt / baseMinusT)) {
                                error('overflow');
                            }

                            w *= baseMinusT;

                        }

                        out = output.length + 1;
                        bias = adapt(i - oldi, out, oldi == 0);

                        // `i` was supposed to wrap around from `out` to `0`,
                        // incrementing `n` each time, so we'll fix that now:
                        if (floor(i / out) > maxInt - n) {
                            error('overflow');
                        }

                        n += floor(i / out);
                        i %= out;

                        // Insert `n` at position `i` of the output
                        output.splice(i++, 0, n);

                    }

                    return ucs2encode(output);
                }

                /**
                 * Converts a string of Unicode symbols (e.g. a domain name label) to a
                 * Punycode string of ASCII-only symbols.
                 * @memberOf punycode
                 * @param {String} input The string of Unicode symbols.
                 * @returns {String} The resulting Punycode string of ASCII-only symbols.
                 */
                function encode(input) {
                    var n,
                        delta,
                        handledCPCount,
                        basicLength,
                        bias,
                        j,
                        m,
                        q,
                        k,
                        t,
                        currentValue,
                        output = [],
                        /** `inputLength` will hold the number of code points in `input`. */
                        inputLength,
                        /** Cached calculation results */
                        handledCPCountPlusOne,
                        baseMinusT,
                        qMinusT;

                    // Convert the input in UCS-2 to Unicode
                    input = ucs2decode(input);

                    // Cache the length
                    inputLength = input.length;

                    // Initialize the state
                    n = initialN;
                    delta = 0;
                    bias = initialBias;

                    // Handle the basic code points
                    for (j = 0; j < inputLength; ++j) {
                        currentValue = input[j];
                        if (currentValue < 0x80) {
                            output.push(stringFromCharCode(currentValue));
                        }
                    }

                    handledCPCount = basicLength = output.length;

                    // `handledCPCount` is the number of code points that have been handled;
                    // `basicLength` is the number of basic code points.

                    // Finish the basic string - if it is not empty - with a delimiter
                    if (basicLength) {
                        output.push(delimiter);
                    }

                    // Main encoding loop:
                    while (handledCPCount < inputLength) {

                        // All non-basic code points < n have been handled already. Find the next
                        // larger one:
                        for (m = maxInt, j = 0; j < inputLength; ++j) {
                            currentValue = input[j];
                            if (currentValue >= n && currentValue < m) {
                                m = currentValue;
                            }
                        }

                        // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
                        // but guard against overflow
                        handledCPCountPlusOne = handledCPCount + 1;
                        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                            error('overflow');
                        }

                        delta += (m - n) * handledCPCountPlusOne;
                        n = m;

                        for (j = 0; j < inputLength; ++j) {
                            currentValue = input[j];

                            if (currentValue < n && ++delta > maxInt) {
                                error('overflow');
                            }

                            if (currentValue == n) {
                                // Represent delta as a generalized variable-length integer
                                for (q = delta, k = base; /* no condition */; k += base) {
                                    t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                                    if (q < t) {
                                        break;
                                    }
                                    qMinusT = q - t;
                                    baseMinusT = base - t;
                                    output.push(
                                        stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                                    );
                                    q = floor(qMinusT / baseMinusT);
                                }

                                output.push(stringFromCharCode(digitToBasic(q, 0)));
                                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                                delta = 0;
                                ++handledCPCount;
                            }
                        }

                        ++delta;
                        ++n;

                    }
                    return output.join('');
                }

                /**
                 * Converts a Punycode string representing a domain name or an email address
                 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
                 * it doesn't matter if you call it on a string that has already been
                 * converted to Unicode.
                 * @memberOf punycode
                 * @param {String} input The Punycoded domain name or email address to
                 * convert to Unicode.
                 * @returns {String} The Unicode representation of the given Punycode
                 * string.
                 */
                function toUnicode(input) {
                    return mapDomain(input, function(string) {
                        return regexPunycode.test(string)
                            ? decode(string.slice(4).toLowerCase())
                            : string;
                    });
                }

                /**
                 * Converts a Unicode string representing a domain name or an email address to
                 * Punycode. Only the non-ASCII parts of the domain name will be converted,
                 * i.e. it doesn't matter if you call it with a domain that's already in
                 * ASCII.
                 * @memberOf punycode
                 * @param {String} input The domain name or email address to convert, as a
                 * Unicode string.
                 * @returns {String} The Punycode representation of the given domain name or
                 * email address.
                 */
                function toASCII(input) {
                    return mapDomain(input, function(string) {
                        return regexNonASCII.test(string)
                            ? 'xn--' + encode(string)
                            : string;
                    });
                }

                /*--------------------------------------------------------------------------*/

                /** Define the public API */
                punycode = {
                    /**
                     * A string representing the current Punycode.js version number.
                     * @memberOf punycode
                     * @type String
                     */
                    'version': '1.4.1',
                    /**
                     * An object of methods to convert from JavaScript's internal character
                     * representation (UCS-2) to Unicode code points, and back.
                     * @see <https://mathiasbynens.be/notes/javascript-encoding>
                     * @memberOf punycode
                     * @type Object
                     */
                    'ucs2': {
                        'decode': ucs2decode,
                        'encode': ucs2encode
                    },
                    'decode': decode,
                    'encode': encode,
                    'toASCII': toASCII,
                    'toUnicode': toUnicode
                };

                /** Expose `punycode` */
                // Some AMD build optimizers, like r.js, check for specific condition patterns
                // like the following:
                if (
                    typeof define == 'function' &&
                    typeof define.amd == 'object' &&
                    define.amd
                ) {
                    define('punycode', function() {
                        return punycode;
                    });
                } else if (freeExports && freeModule) {
                    if (module.exports == freeExports) {
                        // in Node.js, io.js, or RingoJS v0.8.0+
                        freeModule.exports = punycode;
                    } else {
                        // in Narwhal or RingoJS v0.7.0-
                        for (key in punycode) {
                            punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
                        }
                    }
                } else {
                    // in Rhino or a web browser
                    root.punycode = punycode;
                }

            }(this));

        }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{}],21:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

        'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
        function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        }

        module.exports = function(qs, sep, eq, options) {
            sep = sep || '&';
            eq = eq || '=';
            var obj = {};

            if (typeof qs !== 'string' || qs.length === 0) {
                return obj;
            }

            var regexp = /\+/g;
            qs = qs.split(sep);

            var maxKeys = 1000;
            if (options && typeof options.maxKeys === 'number') {
                maxKeys = options.maxKeys;
            }

            var len = qs.length;
            // maxKeys <= 0 means that we should not limit keys count
            if (maxKeys > 0 && len > maxKeys) {
                len = maxKeys;
            }

            for (var i = 0; i < len; ++i) {
                var x = qs[i].replace(regexp, '%20'),
                    idx = x.indexOf(eq),
                    kstr, vstr, k, v;

                if (idx >= 0) {
                    kstr = x.substr(0, idx);
                    vstr = x.substr(idx + 1);
                } else {
                    kstr = x;
                    vstr = '';
                }

                k = decodeURIComponent(kstr);
                v = decodeURIComponent(vstr);

                if (!hasOwnProperty(obj, k)) {
                    obj[k] = v;
                } else if (isArray(obj[k])) {
                    obj[k].push(v);
                } else {
                    obj[k] = [obj[k], v];
                }
            }

            return obj;
        };

        var isArray = Array.isArray || function (xs) {
            return Object.prototype.toString.call(xs) === '[object Array]';
        };

    },{}],22:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

        'use strict';

        var stringifyPrimitive = function(v) {
            switch (typeof v) {
                case 'string':
                    return v;

                case 'boolean':
                    return v ? 'true' : 'false';

                case 'number':
                    return isFinite(v) ? v : '';

                default:
                    return '';
            }
        };

        module.exports = function(obj, sep, eq, name) {
            sep = sep || '&';
            eq = eq || '=';
            if (obj === null) {
                obj = undefined;
            }

            if (typeof obj === 'object') {
                return map(objectKeys(obj), function(k) {
                    var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                    if (isArray(obj[k])) {
                        return map(obj[k], function(v) {
                            return ks + encodeURIComponent(stringifyPrimitive(v));
                        }).join(sep);
                    } else {
                        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
                    }
                }).join(sep);

            }

            if (!name) return '';
            return encodeURIComponent(stringifyPrimitive(name)) + eq +
                encodeURIComponent(stringifyPrimitive(obj));
        };

        var isArray = Array.isArray || function (xs) {
            return Object.prototype.toString.call(xs) === '[object Array]';
        };

        function map (xs, f) {
            if (xs.map) return xs.map(f);
            var res = [];
            for (var i = 0; i < xs.length; i++) {
                res.push(f(xs[i], i));
            }
            return res;
        }

        var objectKeys = Object.keys || function (obj) {
            var res = [];
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
            }
            return res;
        };

    },{}],23:[function(require,module,exports){
        'use strict';

        exports.decode = exports.parse = require('./decode');
        exports.encode = exports.stringify = require('./encode');

    },{"./decode":21,"./encode":22}],24:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

        'use strict';

        var punycode = require('punycode');
        var util = require('./util');

        exports.parse = urlParse;
        exports.resolve = urlResolve;
        exports.resolveObject = urlResolveObject;
        exports.format = urlFormat;

        exports.Url = Url;

        function Url() {
            this.protocol = null;
            this.slashes = null;
            this.auth = null;
            this.host = null;
            this.port = null;
            this.hostname = null;
            this.hash = null;
            this.search = null;
            this.query = null;
            this.pathname = null;
            this.path = null;
            this.href = null;
        }

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
        var protocolPattern = /^([a-z0-9.+-]+:)/i,
            portPattern = /:[0-9]*$/,

            // Special case for a simple path URL
            simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

            // RFC 2396: characters reserved for delimiting URLs.
            // We actually just auto-escape these.
            delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

            // RFC 2396: characters not allowed for various reasons.
            unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

            // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
            autoEscape = ['\''].concat(unwise),
            // Characters that are never ever allowed in a hostname.
            // Note that any invalid chars are also handled, but these
            // are the ones that are *expected* to be seen, so we fast-path
            // them.
            nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
            hostEndingChars = ['/', '?', '#'],
            hostnameMaxLen = 255,
            hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
            hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
            // protocols that can allow "unsafe" and "unwise" chars.
            unsafeProtocol = {
                'javascript': true,
                'javascript:': true
            },
            // protocols that never have a hostname.
            hostlessProtocol = {
                'javascript': true,
                'javascript:': true
            },
            // protocols that always contain a // bit.
            slashedProtocol = {
                'http': true,
                'https': true,
                'ftp': true,
                'gopher': true,
                'file': true,
                'http:': true,
                'https:': true,
                'ftp:': true,
                'gopher:': true,
                'file:': true
            },
            querystring = require('querystring');

        function urlParse(url, parseQueryString, slashesDenoteHost) {
            if (url && util.isObject(url) && url instanceof Url) return url;

            var u = new Url;
            u.parse(url, parseQueryString, slashesDenoteHost);
            return u;
        }

        Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
            if (!util.isString(url)) {
                throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
            }

            // Copy chrome, IE, opera backslash-handling behavior.
            // Back slashes before the query string get converted to forward slashes
            // See: https://code.google.com/p/chromium/issues/detail?id=25916
            var queryIndex = url.indexOf('?'),
                splitter =
                    (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
                uSplit = url.split(splitter),
                slashRegex = /\\/g;
            uSplit[0] = uSplit[0].replace(slashRegex, '/');
            url = uSplit.join(splitter);

            var rest = url;

            // trim before proceeding.
            // This is to support parse stuff like "  http://foo.com  \n"
            rest = rest.trim();

            if (!slashesDenoteHost && url.split('#').length === 1) {
                // Try fast path regexp
                var simplePath = simplePathPattern.exec(rest);
                if (simplePath) {
                    this.path = rest;
                    this.href = rest;
                    this.pathname = simplePath[1];
                    if (simplePath[2]) {
                        this.search = simplePath[2];
                        if (parseQueryString) {
                            this.query = querystring.parse(this.search.substr(1));
                        } else {
                            this.query = this.search.substr(1);
                        }
                    } else if (parseQueryString) {
                        this.search = '';
                        this.query = {};
                    }
                    return this;
                }
            }

            var proto = protocolPattern.exec(rest);
            if (proto) {
                proto = proto[0];
                var lowerProto = proto.toLowerCase();
                this.protocol = lowerProto;
                rest = rest.substr(proto.length);
            }

            // figure out if it's got a host
            // user@server is *always* interpreted as a hostname, and url
            // resolution will treat //foo/bar as host=foo,path=bar because that's
            // how the browser resolves relative URLs.
            if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                var slashes = rest.substr(0, 2) === '//';
                if (slashes && !(proto && hostlessProtocol[proto])) {
                    rest = rest.substr(2);
                    this.slashes = true;
                }
            }

            if (!hostlessProtocol[proto] &&
                (slashes || (proto && !slashedProtocol[proto]))) {

                // there's a hostname.
                // the first instance of /, ?, ;, or # ends the host.
                //
                // If there is an @ in the hostname, then non-host chars *are* allowed
                // to the left of the last @ sign, unless some host-ending character
                // comes *before* the @-sign.
                // URLs are obnoxious.
                //
                // ex:
                // http://a@b@c/ => user:a@b host:c
                // http://a@b?@c => user:a host:c path:/?@c

                // v0.12 TODO(isaacs): This is not quite how Chrome does things.
                // Review our test case against browsers more comprehensively.

                // find the first instance of any hostEndingChars
                var hostEnd = -1;
                for (var i = 0; i < hostEndingChars.length; i++) {
                    var hec = rest.indexOf(hostEndingChars[i]);
                    if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                        hostEnd = hec;
                }

                // at this point, either we have an explicit point where the
                // auth portion cannot go past, or the last @ char is the decider.
                var auth, atSign;
                if (hostEnd === -1) {
                    // atSign can be anywhere.
                    atSign = rest.lastIndexOf('@');
                } else {
                    // atSign must be in auth portion.
                    // http://a@b/c@d => host:b auth:a path:/c@d
                    atSign = rest.lastIndexOf('@', hostEnd);
                }

                // Now we have a portion which is definitely the auth.
                // Pull that off.
                if (atSign !== -1) {
                    auth = rest.slice(0, atSign);
                    rest = rest.slice(atSign + 1);
                    this.auth = decodeURIComponent(auth);
                }

                // the host is the remaining to the left of the first non-host char
                hostEnd = -1;
                for (var i = 0; i < nonHostChars.length; i++) {
                    var hec = rest.indexOf(nonHostChars[i]);
                    if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                        hostEnd = hec;
                }
                // if we still have not hit it, then the entire thing is a host.
                if (hostEnd === -1)
                    hostEnd = rest.length;

                this.host = rest.slice(0, hostEnd);
                rest = rest.slice(hostEnd);

                // pull out port.
                this.parseHost();

                // we've indicated that there is a hostname,
                // so even if it's empty, it has to be present.
                this.hostname = this.hostname || '';

                // if hostname begins with [ and ends with ]
                // assume that it's an IPv6 address.
                var ipv6Hostname = this.hostname[0] === '[' &&
                    this.hostname[this.hostname.length - 1] === ']';

                // validate a little.
                if (!ipv6Hostname) {
                    var hostparts = this.hostname.split(/\./);
                    for (var i = 0, l = hostparts.length; i < l; i++) {
                        var part = hostparts[i];
                        if (!part) continue;
                        if (!part.match(hostnamePartPattern)) {
                            var newpart = '';
                            for (var j = 0, k = part.length; j < k; j++) {
                                if (part.charCodeAt(j) > 127) {
                                    // we replace non-ASCII char with a temporary placeholder
                                    // we need this to make sure size of hostname is not
                                    // broken by replacing non-ASCII by nothing
                                    newpart += 'x';
                                } else {
                                    newpart += part[j];
                                }
                            }
                            // we test again with ASCII char only
                            if (!newpart.match(hostnamePartPattern)) {
                                var validParts = hostparts.slice(0, i);
                                var notHost = hostparts.slice(i + 1);
                                var bit = part.match(hostnamePartStart);
                                if (bit) {
                                    validParts.push(bit[1]);
                                    notHost.unshift(bit[2]);
                                }
                                if (notHost.length) {
                                    rest = '/' + notHost.join('.') + rest;
                                }
                                this.hostname = validParts.join('.');
                                break;
                            }
                        }
                    }
                }

                if (this.hostname.length > hostnameMaxLen) {
                    this.hostname = '';
                } else {
                    // hostnames are always lower case.
                    this.hostname = this.hostname.toLowerCase();
                }

                if (!ipv6Hostname) {
                    // IDNA Support: Returns a punycoded representation of "domain".
                    // It only converts parts of the domain name that
                    // have non-ASCII characters, i.e. it doesn't matter if
                    // you call it with a domain that already is ASCII-only.
                    this.hostname = punycode.toASCII(this.hostname);
                }

                var p = this.port ? ':' + this.port : '';
                var h = this.hostname || '';
                this.host = h + p;
                this.href += this.host;

                // strip [ and ] from the hostname
                // the host field still retains them, though
                if (ipv6Hostname) {
                    this.hostname = this.hostname.substr(1, this.hostname.length - 2);
                    if (rest[0] !== '/') {
                        rest = '/' + rest;
                    }
                }
            }

            // now rest is set to the post-host stuff.
            // chop off any delim chars.
            if (!unsafeProtocol[lowerProto]) {

                // First, make 100% sure that any "autoEscape" chars get
                // escaped, even if encodeURIComponent doesn't think they
                // need to be.
                for (var i = 0, l = autoEscape.length; i < l; i++) {
                    var ae = autoEscape[i];
                    if (rest.indexOf(ae) === -1)
                        continue;
                    var esc = encodeURIComponent(ae);
                    if (esc === ae) {
                        esc = escape(ae);
                    }
                    rest = rest.split(ae).join(esc);
                }
            }


            // chop off from the tail first.
            var hash = rest.indexOf('#');
            if (hash !== -1) {
                // got a fragment string.
                this.hash = rest.substr(hash);
                rest = rest.slice(0, hash);
            }
            var qm = rest.indexOf('?');
            if (qm !== -1) {
                this.search = rest.substr(qm);
                this.query = rest.substr(qm + 1);
                if (parseQueryString) {
                    this.query = querystring.parse(this.query);
                }
                rest = rest.slice(0, qm);
            } else if (parseQueryString) {
                // no query string, but parseQueryString still requested
                this.search = '';
                this.query = {};
            }
            if (rest) this.pathname = rest;
            if (slashedProtocol[lowerProto] &&
                this.hostname && !this.pathname) {
                this.pathname = '/';
            }

            //to support http.request
            if (this.pathname || this.search) {
                var p = this.pathname || '';
                var s = this.search || '';
                this.path = p + s;
            }

            // finally, reconstruct the href based on what has been validated.
            this.href = this.format();
            return this;
        };

// format a parsed object into a url string
        function urlFormat(obj) {
            // ensure it's an object, and not a string url.
            // If it's an obj, this is a no-op.
            // this way, you can call url_format() on strings
            // to clean up potentially wonky urls.
            if (util.isString(obj)) obj = urlParse(obj);
            if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
            return obj.format();
        }

        Url.prototype.format = function() {
            var auth = this.auth || '';
            if (auth) {
                auth = encodeURIComponent(auth);
                auth = auth.replace(/%3A/i, ':');
                auth += '@';
            }

            var protocol = this.protocol || '',
                pathname = this.pathname || '',
                hash = this.hash || '',
                host = false,
                query = '';

            if (this.host) {
                host = auth + this.host;
            } else if (this.hostname) {
                host = auth + (this.hostname.indexOf(':') === -1 ?
                    this.hostname :
                    '[' + this.hostname + ']');
                if (this.port) {
                    host += ':' + this.port;
                }
            }

            if (this.query &&
                util.isObject(this.query) &&
                Object.keys(this.query).length) {
                query = querystring.stringify(this.query);
            }

            var search = this.search || (query && ('?' + query)) || '';

            if (protocol && protocol.substr(-1) !== ':') protocol += ':';

            // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
            // unless they had them to begin with.
            if (this.slashes ||
                (!protocol || slashedProtocol[protocol]) && host !== false) {
                host = '//' + (host || '');
                if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
            } else if (!host) {
                host = '';
            }

            if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
            if (search && search.charAt(0) !== '?') search = '?' + search;

            pathname = pathname.replace(/[?#]/g, function(match) {
                return encodeURIComponent(match);
            });
            search = search.replace('#', '%23');

            return protocol + host + pathname + search + hash;
        };

        function urlResolve(source, relative) {
            return urlParse(source, false, true).resolve(relative);
        }

        Url.prototype.resolve = function(relative) {
            return this.resolveObject(urlParse(relative, false, true)).format();
        };

        function urlResolveObject(source, relative) {
            if (!source) return relative;
            return urlParse(source, false, true).resolveObject(relative);
        }

        Url.prototype.resolveObject = function(relative) {
            if (util.isString(relative)) {
                var rel = new Url();
                rel.parse(relative, false, true);
                relative = rel;
            }

            var result = new Url();
            var tkeys = Object.keys(this);
            for (var tk = 0; tk < tkeys.length; tk++) {
                var tkey = tkeys[tk];
                result[tkey] = this[tkey];
            }

            // hash is always overridden, no matter what.
            // even href="" will remove it.
            result.hash = relative.hash;

            // if the relative url is empty, then there's nothing left to do here.
            if (relative.href === '') {
                result.href = result.format();
                return result;
            }

            // hrefs like //foo/bar always cut to the protocol.
            if (relative.slashes && !relative.protocol) {
                // take everything except the protocol from relative
                var rkeys = Object.keys(relative);
                for (var rk = 0; rk < rkeys.length; rk++) {
                    var rkey = rkeys[rk];
                    if (rkey !== 'protocol')
                        result[rkey] = relative[rkey];
                }

                //urlParse appends trailing / to urls like http://www.example.com
                if (slashedProtocol[result.protocol] &&
                    result.hostname && !result.pathname) {
                    result.path = result.pathname = '/';
                }

                result.href = result.format();
                return result;
            }

            if (relative.protocol && relative.protocol !== result.protocol) {
                // if it's a known url protocol, then changing
                // the protocol does weird things
                // first, if it's not file:, then we MUST have a host,
                // and if there was a path
                // to begin with, then we MUST have a path.
                // if it is file:, then the host is dropped,
                // because that's known to be hostless.
                // anything else is assumed to be absolute.
                if (!slashedProtocol[relative.protocol]) {
                    var keys = Object.keys(relative);
                    for (var v = 0; v < keys.length; v++) {
                        var k = keys[v];
                        result[k] = relative[k];
                    }
                    result.href = result.format();
                    return result;
                }

                result.protocol = relative.protocol;
                if (!relative.host && !hostlessProtocol[relative.protocol]) {
                    var relPath = (relative.pathname || '').split('/');
                    while (relPath.length && !(relative.host = relPath.shift()));
                    if (!relative.host) relative.host = '';
                    if (!relative.hostname) relative.hostname = '';
                    if (relPath[0] !== '') relPath.unshift('');
                    if (relPath.length < 2) relPath.unshift('');
                    result.pathname = relPath.join('/');
                } else {
                    result.pathname = relative.pathname;
                }
                result.search = relative.search;
                result.query = relative.query;
                result.host = relative.host || '';
                result.auth = relative.auth;
                result.hostname = relative.hostname || relative.host;
                result.port = relative.port;
                // to support http.request
                if (result.pathname || result.search) {
                    var p = result.pathname || '';
                    var s = result.search || '';
                    result.path = p + s;
                }
                result.slashes = result.slashes || relative.slashes;
                result.href = result.format();
                return result;
            }

            var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
                isRelAbs = (
                    relative.host ||
                    relative.pathname && relative.pathname.charAt(0) === '/'
                ),
                mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
                removeAllDots = mustEndAbs,
                srcPath = result.pathname && result.pathname.split('/') || [],
                relPath = relative.pathname && relative.pathname.split('/') || [],
                psychotic = result.protocol && !slashedProtocol[result.protocol];

            // if the url is a non-slashed url, then relative
            // links like ../.. should be able
            // to crawl up to the hostname, as well.  This is strange.
            // result.protocol has already been set by now.
            // Later on, put the first path part into the host field.
            if (psychotic) {
                result.hostname = '';
                result.port = null;
                if (result.host) {
                    if (srcPath[0] === '') srcPath[0] = result.host;
                    else srcPath.unshift(result.host);
                }
                result.host = '';
                if (relative.protocol) {
                    relative.hostname = null;
                    relative.port = null;
                    if (relative.host) {
                        if (relPath[0] === '') relPath[0] = relative.host;
                        else relPath.unshift(relative.host);
                    }
                    relative.host = null;
                }
                mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
            }

            if (isRelAbs) {
                // it's absolute.
                result.host = (relative.host || relative.host === '') ?
                    relative.host : result.host;
                result.hostname = (relative.hostname || relative.hostname === '') ?
                    relative.hostname : result.hostname;
                result.search = relative.search;
                result.query = relative.query;
                srcPath = relPath;
                // fall through to the dot-handling below.
            } else if (relPath.length) {
                // it's relative
                // throw away the existing file, and take the new path instead.
                if (!srcPath) srcPath = [];
                srcPath.pop();
                srcPath = srcPath.concat(relPath);
                result.search = relative.search;
                result.query = relative.query;
            } else if (!util.isNullOrUndefined(relative.search)) {
                // just pull out the search.
                // like href='?foo'.
                // Put this after the other two cases because it simplifies the booleans
                if (psychotic) {
                    result.hostname = result.host = srcPath.shift();
                    //occationaly the auth can get stuck only in host
                    //this especially happens in cases like
                    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
                    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                        result.host.split('@') : false;
                    if (authInHost) {
                        result.auth = authInHost.shift();
                        result.host = result.hostname = authInHost.shift();
                    }
                }
                result.search = relative.search;
                result.query = relative.query;
                //to support http.request
                if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
                    result.path = (result.pathname ? result.pathname : '') +
                        (result.search ? result.search : '');
                }
                result.href = result.format();
                return result;
            }

            if (!srcPath.length) {
                // no path at all.  easy.
                // we've already handled the other stuff above.
                result.pathname = null;
                //to support http.request
                if (result.search) {
                    result.path = '/' + result.search;
                } else {
                    result.path = null;
                }
                result.href = result.format();
                return result;
            }

            // if a url ENDs in . or .., then it must get a trailing slash.
            // however, if it ends in anything else non-slashy,
            // then it must NOT get a trailing slash.
            var last = srcPath.slice(-1)[0];
            var hasTrailingSlash = (
                (result.host || relative.host || srcPath.length > 1) &&
                (last === '.' || last === '..') || last === '');

            // strip single dots, resolve double dots to parent dir
            // if the path tries to go above the root, `up` ends up > 0
            var up = 0;
            for (var i = srcPath.length; i >= 0; i--) {
                last = srcPath[i];
                if (last === '.') {
                    srcPath.splice(i, 1);
                } else if (last === '..') {
                    srcPath.splice(i, 1);
                    up++;
                } else if (up) {
                    srcPath.splice(i, 1);
                    up--;
                }
            }

            // if the path is allowed to go above the root, restore leading ..s
            if (!mustEndAbs && !removeAllDots) {
                for (; up--; up) {
                    srcPath.unshift('..');
                }
            }

            if (mustEndAbs && srcPath[0] !== '' &&
                (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
                srcPath.unshift('');
            }

            if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
                srcPath.push('');
            }

            var isAbsolute = srcPath[0] === '' ||
                (srcPath[0] && srcPath[0].charAt(0) === '/');

            // put the host back
            if (psychotic) {
                result.hostname = result.host = isAbsolute ? '' :
                    srcPath.length ? srcPath.shift() : '';
                //occationaly the auth can get stuck only in host
                //this especially happens in cases like
                //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
                var authInHost = result.host && result.host.indexOf('@') > 0 ?
                    result.host.split('@') : false;
                if (authInHost) {
                    result.auth = authInHost.shift();
                    result.host = result.hostname = authInHost.shift();
                }
            }

            mustEndAbs = mustEndAbs || (result.host && srcPath.length);

            if (mustEndAbs && !isAbsolute) {
                srcPath.unshift('');
            }

            if (!srcPath.length) {
                result.pathname = null;
                result.path = null;
            } else {
                result.pathname = srcPath.join('/');
            }

            //to support request.http
            if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
                result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
            }
            result.auth = relative.auth || result.auth;
            result.slashes = result.slashes || relative.slashes;
            result.href = result.format();
            return result;
        };

        Url.prototype.parseHost = function() {
            var host = this.host;
            var port = portPattern.exec(host);
            if (port) {
                port = port[0];
                if (port !== ':') {
                    this.port = port.substr(1);
                }
                host = host.substr(0, host.length - port.length);
            }
            if (host) this.hostname = host;
        };

    },{"./util":25,"punycode":20,"querystring":23}],25:[function(require,module,exports){
        'use strict';

        module.exports = {
            isString: function(arg) {
                return typeof(arg) === 'string';
            },
            isObject: function(arg) {
                return typeof(arg) === 'object' && arg !== null;
            },
            isNull: function(arg) {
                return arg === null;
            },
            isNullOrUndefined: function(arg) {
                return arg == null;
            }
        };

    },{}]},{},[5]);
