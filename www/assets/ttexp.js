"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('ttexp/adapters/application', ['exports', 'ember-data', 'ttexp/config/environment', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, _emberData, _ttexpConfigEnvironment, _emberSimpleAuthMixinsDataAdapterMixin) {
	exports['default'] = _emberData['default'].JSONAPIAdapter.extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
		host: _ttexpConfigEnvironment['default'].APP.serverApiUrl,
		authorizer: 'authorizer:oauth2'
	});
});
define('ttexp/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'ttexp/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _ttexpConfigEnvironment) {

	var App;

	_ember['default'].MODEL_FACTORY_INJECTIONS = true;

	App = _ember['default'].Application.extend({
		modulePrefix: _ttexpConfigEnvironment['default'].modulePrefix,
		podModulePrefix: _ttexpConfigEnvironment['default'].podModulePrefix,
		Resolver: _emberResolver['default'],

		LOG_TRANSITIONS: true,
		LOG_TRANSITIONS_INTERNAL: true
	});

	(0, _emberLoadInitializers['default'])(App, _ttexpConfigEnvironment['default'].modulePrefix);

	exports['default'] = App;
});
define('ttexp/authenticators/oauth2', ['exports', 'ember-simple-auth/authenticators/oauth2-password-grant', 'ttexp/config/environment'], function (exports, _emberSimpleAuthAuthenticatorsOauth2PasswordGrant, _ttexpConfigEnvironment) {
	exports['default'] = _emberSimpleAuthAuthenticatorsOauth2PasswordGrant['default'].extend({
		serverTokenEndpoint: _ttexpConfigEnvironment['default'].APP.serverApiUrl + '/access_token',

		makeRequest: function makeRequest(url, data) {
			data.client_id = 'ttexp';
			data.client_secret = 'public';
			return this._super(url, data);
		}
	});
});
define('ttexp/authorizers/oauth2', ['exports', 'ember-simple-auth/authorizers/oauth2-bearer'], function (exports, _emberSimpleAuthAuthorizersOauth2Bearer) {
  exports['default'] = _emberSimpleAuthAuthorizersOauth2Bearer['default'].extend();
});
define('ttexp/components/cdv-nav-bar', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'header'
  });
});
define('ttexp/components/fa-icon', ['exports', 'ember-font-awesome/components/fa-icon'], function (exports, _emberFontAwesomeComponentsFaIcon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaIcon['default'];
    }
  });
});
define('ttexp/components/fa-list', ['exports', 'ember-font-awesome/components/fa-list'], function (exports, _emberFontAwesomeComponentsFaList) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaList['default'];
    }
  });
});
define('ttexp/components/fa-stack', ['exports', 'ember-font-awesome/components/fa-stack'], function (exports, _emberFontAwesomeComponentsFaStack) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaStack['default'];
    }
  });
});
define('ttexp/controllers/action', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    currentUser: _ember['default'].inject.service('current-user')
  });
});
define('ttexp/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('ttexp/controllers/help', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    currentUser: _ember['default'].inject.service('current-user')
  });
});
define('ttexp/controllers/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    currentUser: _ember['default'].inject.service('current-user'),
    actions: {
      closeApp: function closeApp() {
        if (confirm("Vuoi davvero uscire dall'applicazione?")) {
          navigator.app.exitApp();
        }
      },
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      }
    }
  });

  /*
  document.addEventListener("deviceready", onDeviceReady, true);
  function onDeviceReady() {
    alert('device ready!!!');
  }
  */

  /*
  function exitFromApp() {
    navigator.app.exitApp();
  }
  */
});
define('ttexp/controllers/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),

    actions: {
      authenticate: function authenticate() {
        var _this = this;

        var _getProperties = this.getProperties('identification', 'password');

        var identification = _getProperties.identification;
        var password = _getProperties.password;

        this.get('session').authenticate('authenticator:oauth2', identification, password)['catch'](function (reason) {
          _this.set('errorMessage', reason.error_description || reason.error || reason);
        });
      }
    }
  });
});
define('ttexp/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('ttexp/controllers/page-not-found', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('ttexp/controllers/play', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    currentUser: _ember['default'].inject.service('current-user'),

    actions: {
      // TODO: i controller sono deprecati, usare piuttosto un plugin come questo: https://github.com/IvyApp/ivy-videojs
      videoEnded: function videoEnded() {
        console.log("videoEnded()");
        _ember['default'].$("#side-chat").removeClass("minimized");
      }
    }
  });
});
define('ttexp/controllers/scenarios', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    currentUser: _ember['default'].inject.service('current-user'),

    actions: {
      closeApp: function closeApp() {
        if (confirm("Vuoi davvero uscire dall'applicazione?")) {
          navigator.app.exitApp();
        }
      },
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      }
    }
  });
});
define('ttexp/controllers/scores', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    currentUser: _ember['default'].inject.service('current-user')
  });
});
define('ttexp/helpers/add', ['exports', 'ember-math-helpers/helpers/add'], function (exports, _emberMathHelpersHelpersAdd) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAdd['default'];
    }
  });
  Object.defineProperty(exports, 'add', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAdd.add;
    }
  });
});
define('ttexp/helpers/app-version', ['exports', 'ember', 'ttexp/config/environment'], function (exports, _ember, _ttexpConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _ttexpConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('ttexp/helpers/breaklines', ['exports', 'ember'], function (exports, _ember) {
  exports.breaklines = breaklines;

  function breaklines(text /*, hash*/) {
    text = _ember['default'].Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/, '<br>');
    return _ember['default'].String.htmlSafe(text);
  }

  exports['default'] = _ember['default'].Helper.helper(breaklines);
});
define('ttexp/helpers/ceil', ['exports', 'ember-math-helpers/helpers/ceil'], function (exports, _emberMathHelpersHelpersCeil) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersCeil['default'];
    }
  });
  Object.defineProperty(exports, 'ceil', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersCeil.ceil;
    }
  });
});
define('ttexp/helpers/div', ['exports', 'ember-math-helpers/helpers/div'], function (exports, _emberMathHelpersHelpersDiv) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersDiv['default'];
    }
  });
  Object.defineProperty(exports, 'div', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersDiv.div;
    }
  });
});
define('ttexp/helpers/floor', ['exports', 'ember-math-helpers/helpers/floor'], function (exports, _emberMathHelpersHelpersFloor) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersFloor['default'];
    }
  });
  Object.defineProperty(exports, 'floor', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersFloor.floor;
    }
  });
});
define('ttexp/helpers/max', ['exports', 'ember-math-helpers/helpers/max'], function (exports, _emberMathHelpersHelpersMax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMax['default'];
    }
  });
  Object.defineProperty(exports, 'max', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMax.max;
    }
  });
});
define('ttexp/helpers/min', ['exports', 'ember-math-helpers/helpers/min'], function (exports, _emberMathHelpersHelpersMin) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMin['default'];
    }
  });
  Object.defineProperty(exports, 'min', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMin.min;
    }
  });
});
define('ttexp/helpers/mod', ['exports', 'ember-math-helpers/helpers/mod'], function (exports, _emberMathHelpersHelpersMod) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMod['default'];
    }
  });
  Object.defineProperty(exports, 'mod', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMod.mod;
    }
  });
});
define('ttexp/helpers/mult', ['exports', 'ember-math-helpers/helpers/mult'], function (exports, _emberMathHelpersHelpersMult) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMult['default'];
    }
  });
  Object.defineProperty(exports, 'mult', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMult.mult;
    }
  });
});
define('ttexp/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ttexp/helpers/pow', ['exports', 'ember-math-helpers/helpers/pow'], function (exports, _emberMathHelpersHelpersPow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersPow['default'];
    }
  });
  Object.defineProperty(exports, 'pow', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersPow.pow;
    }
  });
});
define('ttexp/helpers/round', ['exports', 'ember-math-helpers/helpers/round'], function (exports, _emberMathHelpersHelpersRound) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersRound['default'];
    }
  });
  Object.defineProperty(exports, 'round', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersRound.round;
    }
  });
});
define('ttexp/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('ttexp/helpers/sqrt', ['exports', 'ember-math-helpers/helpers/sqrt'], function (exports, _emberMathHelpersHelpersSqrt) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSqrt['default'];
    }
  });
  Object.defineProperty(exports, 'sqrt', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSqrt.sqrt;
    }
  });
});
define('ttexp/helpers/sub', ['exports', 'ember-math-helpers/helpers/sub'], function (exports, _emberMathHelpersHelpersSub) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSub['default'];
    }
  });
  Object.defineProperty(exports, 'sub', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSub.sub;
    }
  });
});
define('ttexp/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ttexp/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _ttexpConfigEnvironment) {
  var _config$APP = _ttexpConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('ttexp/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define("ttexp/initializers/cordova", ["exports"], function (exports) {
	exports.initialize = initialize;
	// https://github.com/poetic/ember-cli-cordova/issues/153
	// http://stackoverflow.com/questions/30790605/ember-2-0-cordova-and-ondeviceready
	// http://incorrectcode.news/question/35240/how-to-fire-deviceready-event-in-chrome-browser-trying-to-debug-phonegap-project/
	// https://gist.github.com/htulipe/44d899e56e2526a82e46

	function initialize(application) {
		// application.inject('route', 'foo', 'service:foo');

		//if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
		if (window.cordova) {
			application.deferReadiness();
			document.addEventListener("deviceready", function () {
				console.log("DEVICE READY FIRED");
				application.advanceReadiness();

				/*
    // Spostare in una variabile globale
    // http://w3foverflow.com/question/get-controller-var-from-run-schedule/
    Ember.$(function() {
    	if (navigator.userAgent.match(/(iPod|iPhone|iPad)/i)) {
    	    Ember.$('.showIOS').show();
    	}
    	if (1 || navigator.userAgent.match(/Android/i)){
    	    Ember.$('.showAndroid').show();
    	}
    });
    */

				//			cordova.plugins.Keyboard.disableScroll(true);
				//			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				//			window.addEventListener('native.keyboardshow', keyboardShowHandler);
				//			window.addEventListener('native.keyboardhide', keyboardHideHandler);

				//			StatusBar.backgroundColorByHexString('#ffffff');
				//			StatusBar.overlaysWebView(false);
				//			StatusBar.styleDefault();
				//			StatusBar.show();
			}, false);
		}
	}

	exports["default"] = {
		name: 'cordova',
		initialize: initialize
	};
});
define('ttexp/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ttexp/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('ttexp/initializers/ember-simple-auth', ['exports', 'ember', 'ttexp/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _ember, _ttexpConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = _ttexpConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _ttexpConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('ttexp/initializers/export-application-global', ['exports', 'ember', 'ttexp/config/environment'], function (exports, _ember, _ttexpConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_ttexpConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _ttexpConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_ttexpConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ttexp/initializers/in-app-livereload', ['exports', 'ttexp/config/environment', 'ember-cli-cordova/initializers/in-app-livereload'], function (exports, _ttexpConfigEnvironment, _emberCliCordovaInitializersInAppLivereload) {

  var inAppReload = _emberCliCordovaInitializersInAppLivereload['default'].initialize;

  var initialize = function initialize(container, app) {
    if (typeof cordova === 'undefined' || _ttexpConfigEnvironment['default'].environment !== 'development' || _ttexpConfigEnvironment['default'].cordova && (!_ttexpConfigEnvironment['default'].cordova.liveReload || !_ttexpConfigEnvironment['default'].cordova.liveReload.enabled)) {
      return;
    }

    return inAppReload(container, app, _ttexpConfigEnvironment['default']);
  };

  exports.initialize = initialize;
  exports['default'] = {
    name: 'cordova:in-app-livereload',
    initialize: initialize
  };
});
/* globals cordova */
define('ttexp/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ttexp/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('ttexp/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("ttexp/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('ttexp/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('ttexp/models/action', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    playthrough: _emberData['default'].belongsTo('playthrough'),
    tank: _emberData['default'].belongsTo('tank'),
    item: _emberData['default'].belongsTo('item')
  });
});
define('ttexp/models/item', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    action: _emberData['default'].hasMany('action'),
    text: _emberData['default'].attr('string')
  });
});
define('ttexp/models/manifesto', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    scenario: _emberData['default'].belongsTo('scenario'),

    version: _emberData['default'].attr('string'),
    filesCount: _emberData['default'].attr('number')
  });
});
define('ttexp/models/media-file', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    video: _emberData['default'].belongsTo('video'),

    fileName: _emberData['default'].attr('string'),
    size: _emberData['default'].attr('number'),
    md5: _emberData['default'].attr('string')
  });
});
define('ttexp/models/play-state', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    scenario: _emberData['default'].belongsTo('scenario'),
    playthrough: _emberData['default'].belongsTo('playthrough'),
    video: _emberData['default'].belongsTo('video'),
    prevVideo: _emberData['default'].belongsTo('video'),

    stepsCount: _emberData['default'].attr('number'),

    gameCompleted: _ember['default'].computed('scenario', 'playthrough', 'video', function () {
      var playthrough = this.get('playthrough');
      var video = this.get('video');
      if (video.get('closing') || playthrough.get('completedAt')) {
        return true;
      } else {
        return false;
      }
    })
  });
});
define('ttexp/models/playthrough', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    user: _emberData['default'].belongsTo('user'),
    scenario: _emberData['default'].belongsTo('scenario'),
    action: _emberData['default'].hasMany('action'),
    playState: _emberData['default'].belongsTo('playState'),
    scores: _emberData['default'].hasMany('score'),

    success: _emberData['default'].attr('boolean'),
    hint: _emberData['default'].attr('string'),
    startedAt: _emberData['default'].attr('date'),
    completedAt: _emberData['default'].attr('date')
  });
});
define('ttexp/models/scenario', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    code: _emberData['default'].attr('string'),
    name: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    attempts: _emberData['default'].attr('number'),
    rating: _emberData['default'].attr('number'),
    version: _emberData['default'].attr('number'),
    filesHost: _emberData['default'].attr('string'),
    filesDir: _emberData['default'].attr('string'),
    enabled: _emberData['default'].attr('boolean', { defaultValue: true }),
    requiredPlays: _emberData['default'].attr('number'),
    showHints: _emberData['default'].attr('boolean', { defaultValue: true }),
    defaultHintSuccess: _emberData['default'].attr('string'),
    defaultHintFail: _emberData['default'].attr('string'),

    playthroughs: _emberData['default'].hasMany('playthrough'),
    playState: _emberData['default'].belongsTo('playState'),
    manifesto: _emberData['default'].belongsTo('manifesto'),
    mediaFiles: _emberData['default'].hasMany('mediaFile')
  });
});
define('ttexp/models/score', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {
  exports['default'] = _emberData['default'].Model.extend({
    playthrough: _emberData['default'].belongsTo('playthrough'),

    value: _emberData['default'].attr('number'),
    percent: _emberData['default'].attr('number'),
    vote: _emberData['default'].attr('string'),
    voteClass: _emberData['default'].attr('string'),
    minValue: _emberData['default'].attr('number'),
    maxValue: _emberData['default'].attr('number'),
    variableId: _emberData['default'].attr('string'),
    variableCode: _emberData['default'].attr('string'),
    variableName: _emberData['default'].attr('string')

  });
});
define('ttexp/models/tank', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    action: _emberData['default'].hasMany('action')
  });
});
define('ttexp/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    username: _emberData['default'].attr('string'),
    email: _emberData['default'].attr('string'),
    firstName: _emberData['default'].attr('string'),
    middleName: _emberData['default'].attr('string'),
    lastName: _emberData['default'].attr('string'),
    fullName: _emberData['default'].attr('string'),
    playthroughs: _emberData['default'].hasMany('playthrough')
  });
});
define('ttexp/models/video', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    uniqueCode: _emberData['default'].attr('string'),
    scenarioCode: _emberData['default'].attr('string'),
    transcript: _emberData['default'].attr('string'),
    closing: _emberData['default'].attr('boolean'),

    items: _emberData['default'].hasMany('item'),
    playState: _emberData['default'].belongsTo('playState', { inverse: 'video' }),
    mediaFile: _emberData['default'].belongsTo('mediaFile'),

    fullPath: _ember['default'].computed('uniqueCode', 'scenarioCode', function () {
      //    return 'assets/media/video/480/'+this.get('scenarioCode').toLowerCase()+'/'+this.get('uniqueCode')+'.mp4';
      return "480/" + this.get('scenarioCode').toLowerCase() + '/' + this.get('uniqueCode') + '.mp4';
    })
  });
});
define('ttexp/router', ['exports', 'ember', 'ttexp/config/environment'], function (exports, _ember, _ttexpConfigEnvironment) {

	var Router = _ember['default'].Router.extend({
		location: _ttexpConfigEnvironment['default'].locationType
	});

	Router.map(function () {
		this.route('index', { path: '/' });
		this.route('scenarios', { path: '/scenarios' });
		this.route('login', { path: '/login' });
		this.route('help');
		this.route('play', { path: '/play/:scenario_id' });
		this.route('scores', { path: '/scores/:playthrough_id' });
		this.route('page-not-found', { path: '/*wildcard' });
	});

	exports['default'] = Router;

	_ember['default'].Route.reopen({
		activate: function activate() {
			var cssClass = this.toCssClass();
			if (cssClass !== "application") {
				_ember['default'].$('body').addClass(cssClass);
			}
			_ember['default'].$('#main-menu a[data-page-route="' + this.routeName + '"]').addClass('active');
		},
		deactivate: function deactivate() {
			_ember['default'].$('body').removeClass(this.toCssClass());
		},
		toCssClass: function toCssClass() {
			var pageClass = "page-" + this.routeName.replace(/\./g, '-').dasherize();
			return pageClass;
		}
	});
});
define('ttexp/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default'], {
    currentUser: service(),

    beforeModel: function beforeModel() {
      //http://hussfelt.net/2015/08/06/how-to-stop-using-deferreadiness-and-advancereadiness-in-ember/
      //return Ember.RSVP.all([this.get('sessionService').setup(), this.get('cordovaService').setup()]);
      return _ember['default'].RSVP.all([this._loadCurrentUser()]);
    },

    sessionAuthenticated: function sessionAuthenticated() {
      var _this = this;

      this._super.apply(this, arguments);
      this._loadCurrentUser()['catch'](function () {
        return _this.get('session').invalidate();
      });
    },

    _loadCurrentUser: function _loadCurrentUser() {
      return this.get('currentUser').load();
    }
  });
});
define("ttexp/routes/help", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({});
});
define("ttexp/routes/index", ["exports", "ember", "ember-simple-auth/mixins/authenticated-route-mixin"], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports["default"] = _ember["default"].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin["default"], {});
});

//import ENV from 'ttexp/config/environment';
define("ttexp/routes/page-not-found", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({});
});
define("ttexp/routes/play", ["exports", "ember", "ember-simple-auth/mixins/authenticated-route-mixin"], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  //http://emberigniter.com/real-world-authentication-with-ember-simple-auth/
  exports["default"] = _ember["default"].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin["default"], {
    actionLoading: false,
    model: function model(params) {
      this.set("actionLoading", false);
      return _ember["default"].RSVP.hash({
        scenario: this.store.findRecord('scenario', params.scenario_id, { reload: true })
      });
    },

    //  afterModel(model, transition) {
    //    var self = this;
    //    var scenario = model.scenario;
    //    var playState = scenario.get('playState');
    //    if (playState) {
    //      var playthrough = playState.get('playthrough');
    //      var video = playState.get('video');
    //    }
    //  },

    actions: {
      clickItem: function clickItem(item) {
        var self = this;
        var model = this.currentModel;
        var scenario = model.scenario;
        var playState = scenario.get('playState');
        if (playState && !self.get("actionLoading")) {
          playState.get('playthrough').then(function (playthrough) {
            if (playthrough) {

              var action = self.store.createRecord('action', {
                playthrough: playthrough,
                item: item
              });

              self.set("actionLoading", true);
              _ember["default"].$('#chat-options li a').addClass('disabled');
              _ember["default"].$('#chat-options li:not([data-item-id=' + item.id + ']) a').fadeTo(200, 0.3);
              _ember["default"].$('#chat-options li[data-item-id=' + item.id + ']').addClass('loading');

              action.save().then(function () {
                if (item) {
                  model.scenario.reload().then(function () {
                    self.set("actionLoading", false);
                    _ember["default"].$("#side-chat").addClass("minimized");
                    self.send('startVideo');
                  });
                } else {
                  self.transitionTo('scenarios');
                }
              }, function (reason) {
                _ember["default"].$('#chat-options li a').removeClass('disabled');
                _ember["default"].$('#chat-options li:not([data-item-id=' + item.id + ']) a').fadeTo(200, 1);
                _ember["default"].$('#chat-options li[data-item-id=' + item.id + ']').removeClass('loading');
                self.set("actionLoading", false);

                self.send('error', reason.errors[0].title);
              });
            }
          });
        }
      },
      // https://www.icanlocalize.com/site/2010/03/using-amazon-s3-to-host-streaming-videos/
      // http://www.inwebson.com/html5/custom-html5-video-controls-with-jquery/ (BUFFERING)
      startVideo: function startVideo() {
        var subPath = this.currentModel.scenario.get('playState').get('video').get('fullPath');
        console.log(subPath);
        if (window.cordova && true) {
          var url = "cdvfile://localhost/persistent/" + subPath;

          // TODO: aggiungere controllo per vedere se il file esiste
          /*
          resolveLocalFileSystemURL(url, function(entry) {
            var nativePath = entry.toURL();
            console.log('Native URI: ' + nativePath);
            document.getElementById('video').src = nativePath;
          });
          */
        } else {
            var url = "http://d1ceamasw3ytjh.cloudfront.net/" + subPath;
          }
        console.log(url);
        var videoPlayer = _ember["default"].$("#video-player");
        videoPlayer.hide();
        videoPlayer.attr("src", url);
        //      videoPlayer.get(0).load();
        _ember["default"].$("#overlay").hide();
        videoPlayer.show();
        videoPlayer.get(0).play();
      },
      toggleSideChat: function toggleSideChat() {
        _ember["default"].$("#side-chat").toggleClass("minimized");
      },
      showSideChat: function showSideChat() {
        _ember["default"].$("#side-chat").removeClass("minimized");
      },
      hideSideChat: function hideSideChat() {
        _ember["default"].$("#side-chat").addClass("minimized");
      },
      exit: function exit() {
        if (confirm("Vuoi uscire dalla sessione di gioco?")) {
          this.send('clickItem', false);
        }
      },
      error: function error(reason, transition) {
        console.log(reason);
        alert(reason);

        return reason;
      }
    }
  });
});

//import ENV from 'ttexp/config/environment';
define('ttexp/routes/scenarios', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    model: function model() {
      return _ember['default'].RSVP.hash({
        scenarios: this.store.findAll('scenario', { reload: true })
      });
    },
    actions: {
      download: function download(scenario) {
        //      var self = this;
        if (scenario) {
          //https://github.com/apache/cordova-plugin-file-transfer/blob/1882bfbd2d150c6db501b2092374d644cb056505/doc/index.md
          //https://github.com/apache/cordova-plugin-file-transfer
          //https://github.com/apache/cordova-plugin-file
          //http://docs.phonegap.com/en/1.8.0/cordova_file_file.md.html#FileTransfer

          this.get('store').findRecord('manifesto', scenario.id, { reload: true }).then(function (manifesto) {
            var scenario = manifesto.get('scenario');
            console.log("DOWNLOAD VIDEOS FOR SCENARIO: " + scenario.get('id'));

            //console.log("CHECK cordova.file");
            //console.log(cordova.file);

            var host = scenario.get('filesHost');
            var localSource = "cdvfile://localhost/persistent";
            var dir = scenario.get('filesDir');
            // var uri = encodeURI("http://d1ceamasw3ytjh.cloudfront.net/480/tel/");
            var mediaFiles = scenario.get('mediaFiles');

            mediaFiles.forEach(function (mediaFile) {
              var fileName = mediaFile.get('fileName'); //"TEL-I0-T0-A.mp4";
              var fileRemotePath = host + dir + fileName;
              var fileLocalPath = localSource + dir + fileName;

              console.log("File to download: " + fileRemotePath + " to " + fileLocalPath);

              if (window.cordova) {
                var fileTransfer = new FileTransfer();
                fileTransfer.download(fileRemotePath, fileLocalPath, function (entry) {
                  console.log("download complete: " + entry.toURL());
                }, function (error) {
                  console.log("download error source " + error.source);
                  console.log("download error target " + error.target);
                  console.log("upload error code" + error.code);
                }, null, // or, pass false
                {
                  //headers: {
                  //    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                  //}
                });
              }
            });

            if (window.cordova) {
              // http://d1ceamasw3ytjh.cloudfront.net/480/tel/TEL-I0-T0-A.mp4
              // cdvfile://localhost/persistent/480/tel/TEL-I0-T0-A.mp4
              // window.TEMPORARY o LocalFileSystem.PERSISTENT
              window.requestFileSystem(LocalFileSystem.PERSISTENT, 5 * 1024 * 1024, function (fs) {
                console.log(fs);
                console.log('file system open: ' + fs.name);

                // Make sure you add the domain name to the Content-Security-Policy <meta> element.
                var url = 'http://cordova.apache.org/static/img/cordova_bot.png';
                // Parameters passed to getFile create a new file or return the file if it already exists.
                fs.root.getFile('downloaded-image.png', { create: true, exclusive: false }, function (fileEntry) {
                  console.log("File Entry:");
                  console.log(fileEntry);
                  downloadFile(fileEntry, url, false);
                }, function () {});
              }, function () {});
            }

            return true;
          });
        }

        /*
        var model = this.currentModel;
        var scenario = model.scenario;
        var playState = scenario.get('playState');
        if (playState) {
          playState.get('playthrough').then(function (playthrough) {
            if (playthrough) {
              var action = self.store.createRecord('action', {
                playthrough: playthrough,
                item: item,
              });
              action.save().then(function() {
                if (item) {
                  self.refresh();
                } else {
                  self.transitionTo('scenarios');
                }
              });
            }
          });
        }
        */
      },
      error: function error(reason, transition) {
        console.log(reason);
        alert(reason);

        return reason;
      }
    }
  });

  function downloadFile(fileEntry, uri, readBinaryData) {

    var fileTransfer = new FileTransfer();
    var fileURL = fileEntry.toURL();

    fileTransfer.download(uri, fileURL, function (entry) {
      console.log("Successful download...");
      console.log("download complete: " + entry.toURL());
      if (readBinaryData) {
        // Read the file...
        readBinaryFile(entry);
      } else {
        // Or just display it.
        //              displayImageByFileURL(entry);
        //              displayFileByUrl(entry);
        $("#test-storage-file img").prop('src', entry.toURL());
      }
    }, function (error) {
      console.log("download error source " + error.source);
      console.log("download error target " + error.target);
      console.log("upload error code" + error.code);
    }, null, // or, pass false
    {
      //headers: {
      //    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
      //}
    });
  }

  function readBinaryFile(fileEntry) {
    fileEntry.file(function (file) {
      var reader = new FileReader();

      reader.onloadend = function () {

        console.log("Successful file read: " + this.result);
        // displayFileData(fileEntry.fullPath + ": " + this.result);

        var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
        displayImage(blob);
      };

      reader.readAsArrayBuffer(file);
    }, onErrorReadFile);
  }

  function readFile(fileEntry) {

    fileEntry.file(function (file) {
      var reader = new FileReader();

      reader.onloadend = function () {
        console.log("Successful file read: " + this.result);
        displayFileData(fileEntry.fullPath + ": " + this.result);
      };

      reader.readAsText(file);
    }, onErrorReadFile);
  }

  function displayFileData(data) {
    console.log("displayFileData()");
    console.log(data);
  }

  //function displayFileByUrl(fileEntry) {
  //    $("#test-storage-file img").prop('src',fileEntry.toURL());
  //}
});

//import ENV from 'ttexp/config/environment';
define('ttexp/routes/scores', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    model: function model(params) {
      var playthrough = this.store.findRecord('playthrough', params.playthrough_id, { reload: true });
      return _ember['default'].RSVP.hash({
        'playthrough': playthrough
      });
    },

    setupController: function setupController(controller, model) {
      if (model.id) {
        // Passaggio modello da link-to, in alternativa nel link-to passare solo l'id e non tutto il playthrough
        model = { playthrough: model };
      }
      controller.set('model', model);
    }
  });
});

//import ENV from 'ttexp/config/environment';
define('ttexp/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('ttexp/services/current-user', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  var RSVP = _ember['default'].RSVP;
  exports['default'] = _ember['default'].Service.extend({
    store: service(),
    session: service('session'),

    load: function load() {
      var _this = this;

      return new RSVP.Promise(function (resolve, reject) {
        if (_this.get('session.isAuthenticated')) {
          return _this.get('store').findRecord('user', 'me').then(function (user) {
            _this.set('user', user);
            resolve();
          }, reject);
        } else {
          resolve();
        }
      });
    }
  });
});
//https://github.com/simplabs/ember-simple-auth/blob/master/guides/managing-current-user.md
define('ttexp/services/session', ['exports', 'ember', 'ember-data', 'ember-simple-auth/services/session'], function (exports, _ember, _emberData, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'].extend({

    store: _ember['default'].inject.service()

  });
});
//  currentUser: Ember.computed('isAuthenticated', function() {
//    if (this.get('isAuthenticated')) {
//      const promise = this.get('store').findRecord('user', 'me');
//      return DS.PromiseObject.create({ promise: promise });
//    }
//  })
define('ttexp/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("ttexp/templates/action", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 13
          }
        },
        "moduleName": "ttexp/templates/action.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("PAGINA ACTION");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("ttexp/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 10
          }
        },
        "moduleName": "ttexp/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("\n<nav>\n	{{#link-to \"index\"}}Index{{/link-to}}\n	{{#link-to \"help\"}}Help{{/link-to}}\n	{{#link-to \"play\" \"new\" class=\"btn btn-link\"}}Play{{/link-to}}\n</nav>\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [8, 0], [8, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ttexp/templates/cdv-generic-nav-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 4
              },
              "end": {
                "line": 5,
                "column": 4
              }
            },
            "moduleName": "ttexp/templates/cdv-generic-nav-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("i");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element2);
            return morphs;
          },
          statements: [["element", "bind-attr", [], ["class", ":icon nav.leftButton.icon"], ["loc", [null, [4, 9], [4, 56]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "modifiers",
            "modifiers": ["action"]
          },
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "ttexp/templates/cdv-generic-nav-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element3);
          morphs[1] = dom.createMorphAt(element3, 1, 1);
          morphs[2] = dom.createMorphAt(element3, 3, 3);
          return morphs;
        },
        statements: [["element", "action", ["leftButton"], [], ["loc", [null, [2, 10], [2, 33]]]], ["block", "if", [["get", "nav.leftButton.icon", ["loc", [null, [3, 10], [3, 29]]]]], [], 0, null, ["loc", [null, [3, 4], [5, 11]]]], ["content", "nav.leftButton.text", ["loc", [null, [6, 4], [6, 27]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "ttexp/templates/cdv-generic-nav-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h1");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "nav.title.text", ["loc", [null, [12, 4], [12, 22]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 18,
                "column": 4
              },
              "end": {
                "line": 20,
                "column": 4
              }
            },
            "moduleName": "ttexp/templates/cdv-generic-nav-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("i");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element0);
            return morphs;
          },
          statements: [["element", "bind-attr", [], ["class", ":icon nav.rightButton.icon"], ["loc", [null, [19, 9], [19, 57]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 0
            },
            "end": {
              "line": 23,
              "column": 0
            }
          },
          "moduleName": "ttexp/templates/cdv-generic-nav-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createMorphAt(element1, 1, 1);
          morphs[2] = dom.createMorphAt(element1, 3, 3);
          return morphs;
        },
        statements: [["element", "action", ["rightButton"], [], ["loc", [null, [17, 10], [17, 34]]]], ["block", "if", [["get", "nav.rightButton.icon", ["loc", [null, [18, 10], [18, 30]]]]], [], 0, null, ["loc", [null, [18, 4], [20, 11]]]], ["content", "nav.rightButton.text", ["loc", [null, [21, 4], [21, 28]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 0
          }
        },
        "moduleName": "ttexp/templates/cdv-generic-nav-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "nav.leftButton.text", ["loc", [null, [1, 6], [1, 25]]]]], [], 0, null, ["loc", [null, [1, 0], [8, 7]]]], ["block", "if", [["get", "nav.title.text", ["loc", [null, [10, 6], [10, 20]]]]], [], 1, null, ["loc", [null, [10, 0], [14, 7]]]], ["block", "if", [["get", "nav.rightButton.text", ["loc", [null, [16, 6], [16, 26]]]]], [], 2, null, ["loc", [null, [16, 0], [23, 7]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("ttexp/templates/components/cdv-nav-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "ttexp/templates/components/cdv-nav-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ttexp/templates/help", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 10
          }
        },
        "moduleName": "ttexp/templates/help.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("This is the HELP");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [3, 0], [3, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ttexp/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 33,
            "column": 10
          }
        },
        "moduleName": "ttexp/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "container-fluid");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "col-md-3 sidebar");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "id", "content");
        dom.setAttribute(el4, "class", "col-md-9 col-md-offset-3");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row hidden-xs");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-sm-12");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "id", "logo-app");
        var el8 = dom.createElement("img");
        dom.setAttribute(el8, "src", "assets/images/logo-app.png");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "id", "main-content");
        dom.setAttribute(el5, "class", "panel panel-primary");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "panel-heading");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("h3");
        dom.setAttribute(el7, "class", "panel-title");
        var el8 = dom.createTextNode("Home");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "panel-body");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("p");
        var el8 = dom.createTextNode("Benvenuto in un innovativo metodo di allenamento che ti permette di misurare, testare e sviluppare le tue \n						capacità.");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("p");
        var el8 = dom.createTextNode("Entra nelle situazioni di vendita e comportati come se fossi davvero sul campo: clicca la risposta che ritieni \n						migliore e scopri le reazioni dei tuoi clienti. Dedica ogni giorno pochi minuti all’allenamento: migliorerai i \n						risultati e sbloccherai nuove situazioni.");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("p");
        var el8 = dom.createTextNode("Buon divertimento!");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "customer-logo");
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "src", "assets/images/logo-customer.png");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1, 1, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "partial", ["layout/menu"], [], ["loc", [null, [5, 4], [5, 29]]]], ["content", "outlet", ["loc", [null, [33, 0], [33, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ttexp/templates/layout/menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 3
            },
            "end": {
              "line": 6,
              "column": 3
            }
          },
          "moduleName": "ttexp/templates/layout/menu.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "currentUser.user.fullName", ["loc", [null, [5, 4], [5, 33]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 3
            },
            "end": {
              "line": 8,
              "column": 3
            }
          },
          "moduleName": "ttexp/templates/layout/menu.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				 \n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 1
            },
            "end": {
              "line": 13,
              "column": 73
            }
          },
          "moduleName": "ttexp/templates/layout/menu.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Home");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 1
            },
            "end": {
              "line": 14,
              "column": 88
            }
          },
          "moduleName": "ttexp/templates/layout/menu.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Simulazioni");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 1
            },
            "end": {
              "line": 22,
              "column": 1
            }
          },
          "moduleName": "ttexp/templates/layout/menu.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "class", "list-group-item");
          var el2 = dom.createTextNode("Logout");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["invalidateSession"], [], ["loc", [null, [21, 29], [21, 59]]]]],
        locals: [],
        templates: []
      };
    })();
    var child5 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 23,
                "column": 2
              },
              "end": {
                "line": 23,
                "column": 51
              }
            },
            "moduleName": "ttexp/templates/layout/menu.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Login");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 22,
              "column": 1
            },
            "end": {
              "line": 24,
              "column": 1
            }
          },
          "moduleName": "ttexp/templates/layout/menu.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["block", "link-to", ["login"], ["class", "list-group-item"], 0, null, ["loc", [null, [23, 2], [23, 63]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 29,
            "column": 6
          }
        },
        "moduleName": "ttexp/templates/layout/menu.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "menu-header");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "main-menu");
        dom.setAttribute(el1, "class", "list-group");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "list-group-item disabled hidden");
        dom.setAttribute(el2, "data-page-route", "messages");
        var el3 = dom.createTextNode("Messaggi");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "list-group-item disabled hidden");
        dom.setAttribute(el2, "data-page-route", "help");
        var el3 = dom.createTextNode("Help");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "list-group-item disabled hidden");
        dom.setAttribute(el2, "data-page-route", "user");
        var el3 = dom.createTextNode("Profilo Utente");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "list-group-item hidden showAndroid");
        var el3 = dom.createTextNode("Esci");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("	\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "test-storage-file");
        var el3 = dom.createElement("img");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "id", "app-version");
        var el3 = dom.createTextNode("v.");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [2]);
        var element2 = dom.childAt(element1, [11]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(element1, 1, 1);
        morphs[2] = dom.createMorphAt(element1, 3, 3);
        morphs[3] = dom.createElementMorph(element2);
        morphs[4] = dom.createMorphAt(element1, 13, 13);
        morphs[5] = dom.createMorphAt(dom.childAt(element1, [17]), 1, 1);
        return morphs;
      },
      statements: [["block", "if", [["get", "currentUser.user", ["loc", [null, [4, 9], [4, 25]]]]], [], 0, 1, ["loc", [null, [4, 3], [8, 10]]]], ["block", "link-to", ["index"], ["class", "list-group-item", "data-page-route", "index"], 2, null, ["loc", [null, [13, 1], [13, 85]]]], ["block", "link-to", ["scenarios"], ["class", "list-group-item", "data-page-route", "scenarios"], 3, null, ["loc", [null, [14, 1], [14, 100]]]], ["element", "action", ["closeApp"], [], ["loc", [null, [18, 47], [18, 68]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [20, 7], [20, 30]]]]], [], 4, 5, ["loc", [null, [20, 1], [24, 8]]]], ["content", "app-version", ["loc", [null, [28, 26], [28, 41]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5]
    };
  })());
});
define("ttexp/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 3
            },
            "end": {
              "line": 25,
              "column": 3
            }
          },
          "moduleName": "ttexp/templates/login.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "errorMessage", ["loc", [null, [24, 7], [24, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 6
          }
        },
        "moduleName": "ttexp/templates/login.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("style");
        var el2 = dom.createTextNode("\n.form-signin {\n    margin: 0 auto;\n    max-width: 330px;\n    padding: 15px;\n}}\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        dom.setAttribute(el2, "class", "form-signin");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode("Login TTExp");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "form-group");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4, "for", "identification");
        dom.setAttribute(el4, "class", "sr-only");
        var el5 = dom.createTextNode("Email");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "form-group");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4, "for", "password");
        dom.setAttribute(el4, "class", "sr-only");
        var el5 = dom.createTextNode("Password");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "form-group");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "submit");
        dom.setAttribute(el4, "class", "btn btn-lg btn-primary btn-block");
        var el5 = dom.createTextNode("Login");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "form-group");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 3, 3);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]), 3, 3);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [9]), 1, 1);
        return morphs;
      },
      statements: [["element", "action", ["authenticate"], ["on", "submit", "method", "get"], ["loc", [null, [9, 7], [9, 57]]]], ["inline", "input", [], ["class", "form-control", "id", "identification", "placeholder", "Email / Username", "autocapitalize", "none", "autocorrect", "off", "value", ["subexpr", "@mut", [["get", "identification", ["loc", [null, [13, 129], [13, 143]]]]], [], []]], ["loc", [null, [13, 3], [13, 145]]]], ["inline", "input", [], ["class", "form-control", "id", "password", "placeholder", "Password", "type", "password", "autocapitalize", "none", "autocorrect", "off", "value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [17, 131], [17, 139]]]]], [], []]], ["loc", [null, [17, 3], [17, 141]]]], ["block", "if", [["get", "errorMessage", ["loc", [null, [23, 9], [23, 21]]]]], [], 0, null, ["loc", [null, [23, 3], [25, 10]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("ttexp/templates/page-not-found", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 10
          }
        },
        "moduleName": "ttexp/templates/page-not-found.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("ERROR: Page not found");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [3, 0], [3, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ttexp/templates/play", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 31,
                "column": 32
              },
              "end": {
                "line": 31,
                "column": 116
              }
            },
            "moduleName": "ttexp/templates/play.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Scopri il tuo punteggio...");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 30,
              "column": 3
            },
            "end": {
              "line": 32,
              "column": 3
            }
          },
          "moduleName": "ttexp/templates/play.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1, "class", "list-group-item");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["block", "link-to", ["scores", ["get", "model.scenario.playState.playthrough", ["loc", [null, [31, 52], [31, 88]]]]], [], 0, null, ["loc", [null, [31, 32], [31, 128]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 33,
                "column": 4
              },
              "end": {
                "line": 38,
                "column": 4
              }
            },
            "moduleName": "ttexp/templates/play.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("					");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "list-group-item");
            var el2 = dom.createTextNode("\n						");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("i");
            dom.setAttribute(el2, "class", "fa fa-circle-o-notch fa-spin fa-fw loading-icon");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n						");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("a");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n					");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var element3 = dom.childAt(element2, [3]);
            var morphs = new Array(3);
            morphs[0] = dom.createAttrMorph(element2, 'data-item-id');
            morphs[1] = dom.createElementMorph(element3);
            morphs[2] = dom.createMorphAt(element3, 0, 0);
            return morphs;
          },
          statements: [["attribute", "data-item-id", ["get", "item.id", ["loc", [null, [34, 48], [34, 55]]]]], ["element", "action", ["clickItem", ["get", "item", ["loc", [null, [36, 30], [36, 34]]]]], [], ["loc", [null, [36, 9], [36, 36]]]], ["content", "item.text", ["loc", [null, [36, 37], [36, 50]]]]],
          locals: ["item"],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 32,
              "column": 3
            },
            "end": {
              "line": 39,
              "column": 3
            }
          },
          "moduleName": "ttexp/templates/play.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "each", [["get", "model.scenario.playState.video.items", ["loc", [null, [33, 12], [33, 48]]]]], [], 0, null, ["loc", [null, [33, 4], [38, 13]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 59,
                "column": 3
              },
              "end": {
                "line": 61,
                "column": 3
              }
            },
            "moduleName": "ttexp/templates/play.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				(prev: ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(")\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "model.scenario.playState.prevVideo.uniqueCode", ["loc", [null, [60, 11], [60, 60]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.6.1",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 67,
                    "column": 5
                  },
                  "end": {
                    "line": 69,
                    "column": 5
                  }
                },
                "moduleName": "ttexp/templates/play.hbs"
              },
              isEmpty: false,
              arity: 1,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("						");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("span");
                var el2 = dom.createComment("");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode(": ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode(" => tot:");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode(" - min:");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode(" - max:");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("br");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element0 = dom.childAt(fragment, [1]);
                var morphs = new Array(6);
                morphs[0] = dom.createAttrMorph(element0, 'title');
                morphs[1] = dom.createMorphAt(element0, 0, 0);
                morphs[2] = dom.createMorphAt(fragment, 3, 3, contextualElement);
                morphs[3] = dom.createMorphAt(fragment, 5, 5, contextualElement);
                morphs[4] = dom.createMorphAt(fragment, 7, 7, contextualElement);
                morphs[5] = dom.createMorphAt(fragment, 9, 9, contextualElement);
                return morphs;
              },
              statements: [["attribute", "title", ["concat", [["get", "score.variableName", ["loc", [null, [68, 21], [68, 39]]]]]]], ["content", "score.variableCode", ["loc", [null, [68, 43], [68, 65]]]], ["inline", "div", [["subexpr", "round", [["subexpr", "mult", [["subexpr", "div", [["get", "score.value", ["loc", [null, [68, 98], [68, 109]]]], ["get", "model.scenario.playState.stepsCount", ["loc", [null, [68, 110], [68, 145]]]]], [], ["loc", [null, [68, 93], [68, 146]]]], 100], [], ["loc", [null, [68, 87], [68, 151]]]]], [], ["loc", [null, [68, 80], [68, 152]]]], 100], [], ["loc", [null, [68, 74], [68, 158]]]], ["content", "score.value", ["loc", [null, [68, 166], [68, 181]]]], ["content", "score.minValue", ["loc", [null, [68, 188], [68, 206]]]], ["content", "score.maxValue", ["loc", [null, [68, 213], [68, 231]]]]],
              locals: ["score"],
              templates: []
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 66,
                  "column": 4
                },
                "end": {
                  "line": 70,
                  "column": 4
                }
              },
              "moduleName": "ttexp/templates/play.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "each", [["get", "model.scenario.playState.playthrough.scores", ["loc", [null, [67, 13], [67, 56]]]]], [], 0, null, ["loc", [null, [67, 5], [69, 14]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 63,
                "column": 3
              },
              "end": {
                "line": 71,
                "column": 3
              }
            },
            "moduleName": "ttexp/templates/play.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("br");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n				Passi: ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("br");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            morphs[1] = dom.createMorphAt(fragment, 6, 6, contextualElement);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["content", "model.scenario.playState.stepsCount", ["loc", [null, [65, 11], [65, 50]]]], ["block", "if", [["get", "model.scenario.playState.stepsCount", ["loc", [null, [66, 10], [66, 45]]]]], [], 0, null, ["loc", [null, [66, 4], [70, 11]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 56,
              "column": 1
            },
            "end": {
              "line": 73,
              "column": 1
            }
          },
          "moduleName": "ttexp/templates/play.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "id", "debug-window");
          var el2 = dom.createTextNode("\n			Video: ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("			\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(element1, 1, 1);
          morphs[1] = dom.createMorphAt(element1, 3, 3);
          morphs[2] = dom.createMorphAt(element1, 5, 5);
          return morphs;
        },
        statements: [["content", "model.scenario.playState.video.uniqueCode", ["loc", [null, [58, 10], [58, 55]]]], ["block", "if", [["get", "model.scenario.playState.prevVideo", ["loc", [null, [59, 9], [59, 43]]]]], [], 0, null, ["loc", [null, [59, 3], [61, 10]]]], ["block", "if", [false], [], 1, null, ["loc", [null, [63, 3], [71, 10]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 76,
            "column": 0
          }
        },
        "moduleName": "ttexp/templates/play.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "overlay");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "id", "overlay-content");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "id", "overlay-description");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "id", "overlay-button");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "class", "btn btn-primary");
        var el6 = dom.createTextNode("INIZIA");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "video-container");
        dom.setAttribute(el2, "class", "cinemaOff hiddenxxx");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("video");
        dom.setAttribute(el3, "id", "video-player");
        var el4 = dom.createTextNode("\n			Your browser does not support the video element.\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "text-container");
        dom.setAttribute(el2, "class", "fullscreenXXX subtitles hiddenXXX");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "id", "text-dialog");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "id", "text-baloon");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("				Video: ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "side-chat");
        dom.setAttribute(el2, "class", "minimized");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "id", "button-chat");
        dom.setAttribute(el3, "class", "btn btn-link ttexp-btn ttexp-position-absolute top-left");
        dom.setAttribute(el3, "role", "button");
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "glyphicon glyphicon-comment");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "id", "button-audio");
        dom.setAttribute(el3, "class", "btn btn-link ttexp-btn ttexp-position-absolute top-right");
        dom.setAttribute(el3, "role", "button");
        dom.setAttribute(el3, "style", "display:none;");
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "glyphicon glyphicon-volume-up");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "id", "chat-options");
        dom.setAttribute(el3, "class", "list-group ");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("			\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("\n			<li class=\"list-group-item\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenenan massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas.</li>\n			<li class=\"list-group-item\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenenan massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas.</li>\n			<li class=\"list-group-item\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenenan massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas.</li>\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "id", "button-close");
        dom.setAttribute(el2, "class", "btn btn-link ttexp-btn ttexp-position-absolute top-left");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "fa fa-home");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("\n	{{#link-to \"scenarios\" id=\"button-close\" class=\"btn btn-link ttexp-btn ttexp-position-absolute top-left\"}}<span class=\"glyphicon glyphicon-remove-circle\"></span>{{/link-to}}\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "customer-logo");
        var el3 = dom.createElement("img");
        dom.setAttribute(el3, "src", "assets/images/logo-customer.png");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element4 = dom.childAt(fragment, [0]);
        var element5 = dom.childAt(element4, [1, 1]);
        var element6 = dom.childAt(element5, [3, 1]);
        var element7 = dom.childAt(element4, [3, 1]);
        var element8 = dom.childAt(element4, [7]);
        var element9 = dom.childAt(element8, [1]);
        var element10 = dom.childAt(element4, [9]);
        var morphs = new Array(10);
        morphs[0] = dom.createMorphAt(dom.childAt(element5, [1]), 1, 1);
        morphs[1] = dom.createElementMorph(element6);
        morphs[2] = dom.createAttrMorph(element7, 'onended');
        morphs[3] = dom.createAttrMorph(element7, 'onerror');
        morphs[4] = dom.createMorphAt(dom.childAt(element4, [5, 1, 1]), 2, 2);
        morphs[5] = dom.createElementMorph(element9);
        morphs[6] = dom.createMorphAt(dom.childAt(element8, [5]), 1, 1);
        morphs[7] = dom.createElementMorph(element10);
        morphs[8] = dom.createMorphAt(element4, 15, 15);
        morphs[9] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["inline", "breaklines", [["get", "model.scenario.description", ["loc", [null, [5, 17], [5, 43]]]]], [], ["loc", [null, [5, 4], [5, 45]]]], ["element", "action", ["startVideo"], [], ["loc", [null, [8, 7], [8, 30]]]], ["attribute", "onended", ["subexpr", "action", ["videoEnded"], [], ["loc", [null, [13, 35], [13, 58]]]]], ["attribute", "onerror", ["subexpr", "action", ["videoEnded"], [], ["loc", [null, [13, 67], [13, 90]]]]], ["content", "model.scenario.playState.video.uniqueCode", ["loc", [null, [21, 11], [21, 56]]]], ["element", "action", ["toggleSideChat"], ["on", "click"], ["loc", [null, [26, 105], [26, 143]]]], ["block", "if", [["get", "model.scenario.playState.gameCompleted", ["loc", [null, [30, 9], [30, 47]]]]], [], 0, 1, ["loc", [null, [30, 3], [39, 10]]]], ["element", "action", ["exit"], [], ["loc", [null, [49, 86], [49, 103]]]], ["block", "if", [false], [], 2, null, ["loc", [null, [56, 1], [73, 8]]]], ["content", "outlet", ["loc", [null, [75, 0], [75, 10]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("ttexp/templates/scenarios", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 34,
                  "column": 13
                },
                "end": {
                  "line": 34,
                  "column": 133
                }
              },
              "moduleName": "ttexp/templates/scenarios.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createElement("i");
              dom.setAttribute(el1, "class", "fa fa-play-circle");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() {
              return [];
            },
            statements: [],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 33,
                "column": 12
              },
              "end": {
                "line": 35,
                "column": 12
              }
            },
            "moduleName": "ttexp/templates/scenarios.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("													");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["block", "link-to", ["play", ["get", "scenario.id", ["loc", [null, [34, 31], [34, 42]]]]], ["id", ["subexpr", "concat", ["button-play-", ["get", "scenario.id", ["loc", [null, [34, 69], [34, 80]]]]], [], ["loc", [null, [34, 46], [34, 81]]]], "class", "btn-link"], 0, null, ["loc", [null, [34, 13], [34, 145]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 35,
                "column": 12
              },
              "end": {
                "line": 37,
                "column": 12
              }
            },
            "moduleName": "ttexp/templates/scenarios.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("													");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("a");
            dom.setAttribute(el1, "class", "btn btn-link disabled");
            var el2 = dom.createElement("i");
            dom.setAttribute(el2, "class", "fa fa-minus-circle");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 41,
                  "column": 13
                },
                "end": {
                  "line": 41,
                  "column": 122
                }
              },
              "moduleName": "ttexp/templates/scenarios.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["content", "scenario.name", ["loc", [null, [41, 105], [41, 122]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 40,
                "column": 12
              },
              "end": {
                "line": 42,
                "column": 12
              }
            },
            "moduleName": "ttexp/templates/scenarios.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("													");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["block", "link-to", ["play", ["get", "scenario.id", ["loc", [null, [41, 31], [41, 42]]]]], ["id", ["subexpr", "concat", ["button-play-text-", ["get", "scenario.id", ["loc", [null, [41, 74], [41, 85]]]]], [], ["loc", [null, [41, 46], [41, 86]]]], "class", "btn-link"], 0, null, ["loc", [null, [41, 13], [41, 134]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child3 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 42,
                "column": 12
              },
              "end": {
                "line": 44,
                "column": 12
              }
            },
            "moduleName": "ttexp/templates/scenarios.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("													");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("a");
            dom.setAttribute(el1, "class", "disabled");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "scenario.name", ["loc", [null, [43, 33], [43, 50]]]]],
          locals: [],
          templates: []
        };
      })();
      var child4 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 50,
                  "column": 14
                },
                "end": {
                  "line": 52,
                  "column": 14
                }
              },
              "moduleName": "ttexp/templates/scenarios.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("															/ ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["content", "scenario.requiredPlays", ["loc", [null, [51, 17], [51, 43]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 47,
                "column": 12
              },
              "end": {
                "line": 54,
                "column": 12
              }
            },
            "moduleName": "ttexp/templates/scenarios.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("									  				");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("a");
            var el2 = dom.createTextNode("\n										  				");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("													");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(element1, 1, 1);
            morphs[1] = dom.createMorphAt(element1, 3, 3);
            return morphs;
          },
          statements: [["content", "scenario.attempts", ["loc", [null, [49, 16], [49, 37]]]], ["block", "if", [["get", "scenario.requiredPlays", ["loc", [null, [50, 20], [50, 42]]]]], [], 0, null, ["loc", [null, [50, 14], [52, 21]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child5 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 57,
                  "column": 14
                },
                "end": {
                  "line": 59,
                  "column": 14
                }
              },
              "moduleName": "ttexp/templates/scenarios.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("															/ ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["content", "scenario.requiredPlays", ["loc", [null, [58, 17], [58, 43]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 54,
                "column": 12
              },
              "end": {
                "line": 61,
                "column": 12
              }
            },
            "moduleName": "ttexp/templates/scenarios.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("									  				");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("a");
            dom.setAttribute(el1, "class", "disabled");
            var el2 = dom.createTextNode("\n									  					");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("									  				");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(element0, 1, 1);
            morphs[1] = dom.createMorphAt(element0, 3, 3);
            return morphs;
          },
          statements: [["content", "scenario.attempts", ["loc", [null, [56, 16], [56, 37]]]], ["block", "if", [["get", "scenario.requiredPlays", ["loc", [null, [57, 20], [57, 42]]]]], [], 0, null, ["loc", [null, [57, 14], [59, 21]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child6 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 65,
                  "column": 13
                },
                "end": {
                  "line": 67,
                  "column": 13
                }
              },
              "moduleName": "ttexp/templates/scenarios.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("														");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("a");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("%");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
              return morphs;
            },
            statements: [["inline", "round", [["get", "scenario.rating", ["loc", [null, [66, 25], [66, 40]]]]], [], ["loc", [null, [66, 17], [66, 42]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 67,
                  "column": 13
                },
                "end": {
                  "line": 69,
                  "column": 13
                }
              },
              "moduleName": "ttexp/templates/scenarios.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("														");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("a");
              var el2 = dom.createTextNode("-");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() {
              return [];
            },
            statements: [],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 64,
                "column": 12
              },
              "end": {
                "line": 70,
                "column": 12
              }
            },
            "moduleName": "ttexp/templates/scenarios.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["get", "scenario.attempts", ["loc", [null, [65, 19], [65, 36]]]]], [], 0, 1, ["loc", [null, [65, 13], [69, 20]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      var child7 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 71,
                  "column": 13
                },
                "end": {
                  "line": 73,
                  "column": 13
                }
              },
              "moduleName": "ttexp/templates/scenarios.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("														");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("a");
              dom.setAttribute(el1, "class", "disabled");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("%");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
              return morphs;
            },
            statements: [["inline", "round", [["get", "scenario.rating", ["loc", [null, [72, 42], [72, 57]]]]], [], ["loc", [null, [72, 34], [72, 59]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 73,
                  "column": 13
                },
                "end": {
                  "line": 75,
                  "column": 13
                }
              },
              "moduleName": "ttexp/templates/scenarios.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("														");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("a");
              dom.setAttribute(el1, "class", "disabled");
              var el2 = dom.createTextNode("-");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() {
              return [];
            },
            statements: [],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 70,
                "column": 12
              },
              "end": {
                "line": 76,
                "column": 12
              }
            },
            "moduleName": "ttexp/templates/scenarios.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["get", "scenario.attempts", ["loc", [null, [71, 19], [71, 36]]]]], [], 0, 1, ["loc", [null, [71, 13], [75, 20]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 30,
              "column": 9
            },
            "end": {
              "line": 82,
              "column": 9
            }
          },
          "moduleName": "ttexp/templates/scenarios.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("									  	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n											");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "class", "fit");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("											");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n											");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("											");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n									  		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("								  			");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n									  		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("											");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n									  		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n									  			");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("a");
          dom.setAttribute(el3, "href", "#");
          dom.setAttribute(el3, "class", "btn-link");
          var el4 = dom.createElement("i");
          dom.setAttribute(el4, "class", "fa fa-download");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("X");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n								  			");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n									  	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1]);
          var element3 = dom.childAt(element2, [9, 1]);
          var morphs = new Array(5);
          morphs[0] = dom.createMorphAt(dom.childAt(element2, [1]), 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
          morphs[2] = dom.createMorphAt(dom.childAt(element2, [5]), 1, 1);
          morphs[3] = dom.createMorphAt(dom.childAt(element2, [7]), 1, 1);
          morphs[4] = dom.createElementMorph(element3);
          return morphs;
        },
        statements: [["block", "if", [["get", "scenario.enabled", ["loc", [null, [33, 18], [33, 34]]]]], [], 0, 1, ["loc", [null, [33, 12], [37, 19]]]], ["block", "if", [["get", "scenario.enabled", ["loc", [null, [40, 18], [40, 34]]]]], [], 2, 3, ["loc", [null, [40, 12], [44, 19]]]], ["block", "if", [["get", "scenario.enabled", ["loc", [null, [47, 18], [47, 34]]]]], [], 4, 5, ["loc", [null, [47, 12], [61, 19]]]], ["block", "if", [["get", "scenario.enabled", ["loc", [null, [64, 18], [64, 34]]]]], [], 6, 7, ["loc", [null, [64, 12], [76, 19]]]], ["element", "action", ["download", ["get", "scenario", ["loc", [null, [79, 46], [79, 54]]]]], [], ["loc", [null, [79, 26], [79, 56]]]]],
        locals: ["scenario"],
        templates: [child0, child1, child2, child3, child4, child5, child6, child7]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 82,
              "column": 9
            },
            "end": {
              "line": 86,
              "column": 9
            }
          },
          "moduleName": "ttexp/templates/scenarios.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("									  	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n									  		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "colspan", "5");
          var el3 = dom.createTextNode("Nessuna simulazione disponibile");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n								  		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 99,
            "column": 10
          }
        },
        "moduleName": "ttexp/templates/scenarios.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "container-fluid");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "col-md-3 sidebar");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "id", "content");
        dom.setAttribute(el4, "class", "col-md-9 col-md-offset-3");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row hidden-xs");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-sm-12");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "id", "logo-app");
        var el8 = dom.createElement("img");
        dom.setAttribute(el8, "src", "assets/images/logo-app.png");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "id", "main-content");
        dom.setAttribute(el5, "class", "panel panel-primary");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "panel-heading");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("h3");
        dom.setAttribute(el7, "class", "panel-title");
        var el8 = dom.createTextNode("Simulazioni disponibili");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "panel-body");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "table-responsive");
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("table");
        dom.setAttribute(el8, "class", "table table-striped");
        var el9 = dom.createTextNode("\n								");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("thead");
        var el10 = dom.createTextNode("\n									");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("tr");
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("th");
        dom.setAttribute(el11, "class", "fit");
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("th");
        var el12 = dom.createTextNode("Simulazione");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("th");
        dom.setAttribute(el11, "style", "width:25%");
        var el12 = dom.createTextNode("Tentativi");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("th");
        dom.setAttribute(el11, "style", "width:25%");
        var el12 = dom.createTextNode("Valutazione");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n										");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("th");
        dom.setAttribute(el11, "class", "fit");
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n									");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n								");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n								");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("tbody");
        var el10 = dom.createTextNode("\n");
        dom.appendChild(el9, el10);
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("								");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n							");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n						");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode(" \n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "customer-logo");
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "src", "assets/images/logo-customer.png");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element4 = dom.childAt(fragment, [0, 1, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element4, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element4, [3, 3, 3, 1, 1, 3]), 1, 1);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "partial", ["layout/menu"], [], ["loc", [null, [5, 4], [5, 29]]]], ["block", "each", [["get", "model.scenarios", ["loc", [null, [30, 17], [30, 32]]]]], [], 0, 1, ["loc", [null, [30, 9], [86, 18]]]], ["content", "outlet", ["loc", [null, [99, 0], [99, 10]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("ttexp/templates/scores", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "ttexp/templates/scores.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "fa fa-home");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 15,
                "column": 8
              },
              "end": {
                "line": 16,
                "column": 8
              }
            },
            "moduleName": "ttexp/templates/scores.hbs"
          },
          isEmpty: true,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 16,
                "column": 8
              },
              "end": {
                "line": 20,
                "column": 8
              }
            },
            "moduleName": "ttexp/templates/scores.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("								");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            var el2 = dom.createTextNode("\n									");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("br");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("%\n								");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(element1, 1, 1);
            morphs[1] = dom.createMorphAt(element1, 3, 3);
            return morphs;
          },
          statements: [["content", "score.variableName", ["loc", [null, [18, 9], [18, 31]]]], ["content", "score.percent", ["loc", [null, [18, 37], [18, 54]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 7
            },
            "end": {
              "line": 21,
              "column": 7
            }
          },
          "moduleName": "ttexp/templates/scores.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "score.variableId", ["loc", [null, [15, 14], [15, 30]]]]], [], 0, 1, ["loc", [null, [15, 8], [20, 15]]]]],
        locals: ["score"],
        templates: [child0, child1]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 27,
              "column": 7
            },
            "end": {
              "line": 29,
              "column": 7
            }
          },
          "moduleName": "ttexp/templates/scores.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("								Raggiunto\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 29,
              "column": 7
            },
            "end": {
              "line": 31,
              "column": 7
            }
          },
          "moduleName": "ttexp/templates/scores.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("								Mancato\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 57,
                "column": 11
              },
              "end": {
                "line": 61,
                "column": 11
              }
            },
            "moduleName": "ttexp/templates/scores.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("												");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("th");
            var el2 = dom.createTextNode("\n													");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "score-name");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n												");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 0, 0);
            return morphs;
          },
          statements: [["content", "score.variableName", ["loc", [null, [59, 37], [59, 59]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 56,
              "column": 10
            },
            "end": {
              "line": 62,
              "column": 10
            }
          },
          "moduleName": "ttexp/templates/scores.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "score.variableId", ["loc", [null, [57, 17], [57, 33]]]]], [], 0, null, ["loc", [null, [57, 11], [61, 18]]]]],
        locals: ["score"],
        templates: [child0]
      };
    })();
    var child5 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 68,
                "column": 11
              },
              "end": {
                "line": 72,
                "column": 11
              }
            },
            "moduleName": "ttexp/templates/scores.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("												");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("td");
            var el2 = dom.createTextNode("\n													");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n												");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1, 1]);
            var morphs = new Array(2);
            morphs[0] = dom.createAttrMorph(element0, 'class');
            morphs[1] = dom.createMorphAt(element0, 0, 0);
            return morphs;
          },
          statements: [["attribute", "class", ["concat", ["score-vote ", ["get", "score.voteClass", ["loc", [null, [70, 38], [70, 53]]]]]]], ["content", "score.vote", ["loc", [null, [70, 57], [70, 71]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 67,
              "column": 10
            },
            "end": {
              "line": 73,
              "column": 10
            }
          },
          "moduleName": "ttexp/templates/scores.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "score.variableId", ["loc", [null, [68, 17], [68, 33]]]]], [], 0, null, ["loc", [null, [68, 11], [72, 18]]]]],
        locals: ["score"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 91,
            "column": 0
          }
        },
        "moduleName": "ttexp/templates/scores.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("<div id=\"scores-container\" style=\"background-image: url('./assets/images/results-.png');\"></div>");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "scores-container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "main-content");
        dom.setAttribute(el2, "class", "panel panel-default");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "panel-body");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "quadrant-top-left");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "spacer");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "id", "general-score-container");
        var el8 = dom.createTextNode("\n");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("						");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "spacer");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "id", "objective-container");
        var el8 = dom.createTextNode("\n							Obiettivo");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("br");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("						");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "quadrant-top-right");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "spacer");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "id", "hint-container");
        var el8 = dom.createTextNode("\n							Suggerimento");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("br");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "id", "hint-text");
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n						");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("\n				<div class=\"col-md-6\">\n					<div id=\"hints-container\">Suggerimento</div>\n				</div>\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "quadrant-bottom");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "spacer");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "id", "variables-score-container");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "table-responsive");
        var el8 = dom.createTextNode("\n							");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("table");
        var el9 = dom.createTextNode("\n								");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("thead");
        var el10 = dom.createTextNode("\n									");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("tr");
        var el11 = dom.createTextNode("\n");
        dom.appendChild(el10, el11);
        var el11 = dom.createComment("");
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("									");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n								");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n								");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("tbody");
        var el10 = dom.createTextNode("\n									");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("tr");
        var el11 = dom.createTextNode("\n");
        dom.appendChild(el10, el11);
        var el11 = dom.createComment("");
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("									");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n								");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n							");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n						");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "customer-logo");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "src", "assets/images/logo-customer.png");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [4]);
        var element3 = dom.childAt(element2, [1, 1]);
        var element4 = dom.childAt(element3, [1]);
        var element5 = dom.childAt(element4, [1]);
        var element6 = dom.childAt(element3, [3, 1, 1, 1, 1]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[1] = dom.createAttrMorph(element2, 'class');
        morphs[2] = dom.createMorphAt(dom.childAt(element5, [1, 1]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element5, [3, 1]), 3, 3);
        morphs[4] = dom.createMorphAt(dom.childAt(element4, [3, 1, 1, 3]), 0, 0);
        morphs[5] = dom.createMorphAt(dom.childAt(element6, [1, 1]), 1, 1);
        morphs[6] = dom.createMorphAt(dom.childAt(element6, [3, 1]), 1, 1);
        morphs[7] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        return morphs;
      },
      statements: [["block", "link-to", ["scenarios"], ["id", "button-close", "class", "btn btn-link ttexp-btn\r\nttexp-position-absolute top-left"], 0, null, ["loc", [null, [2, 0], [5, 12]]]], ["attribute", "class", ["concat", ["show-hints-", ["get", "model.playthrough.scenario.showHints", ["loc", [null, [7, 47], [7, 83]]]]]]], ["block", "each", [["get", "model.playthrough.scores", ["loc", [null, [14, 15], [14, 39]]]]], [], 1, null, ["loc", [null, [14, 7], [21, 16]]]], ["block", "if", [["get", "model.playthrough.success", ["loc", [null, [27, 13], [27, 38]]]]], [], 2, 3, ["loc", [null, [27, 7], [31, 14]]]], ["content", "model.playthrough.hint", ["loc", [null, [39, 27], [39, 53]]]], ["block", "each", [["get", "model.playthrough.scores", ["loc", [null, [56, 18], [56, 42]]]]], [], 4, null, ["loc", [null, [56, 10], [62, 19]]]], ["block", "each", [["get", "model.playthrough.scores", ["loc", [null, [67, 18], [67, 42]]]]], [], 5, null, ["loc", [null, [67, 10], [73, 19]]]], ["content", "outlet", ["loc", [null, [90, 0], [90, 10]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5]
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('ttexp/config/environment', ['ember'], function(Ember) {
  var prefix = 'ttexp';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("ttexp/app")["default"].create({"serverApiUrl":"http://ttexp-server.localhost/api","LOG_ACTIVE_GENERATION":true,"LOG_VIEW_LOOKUPS":true,"name":"ttexp","version":"1.0.4.2+d28facba"});
}

/* jshint ignore:end */
//# sourceMappingURL=ttexp.map