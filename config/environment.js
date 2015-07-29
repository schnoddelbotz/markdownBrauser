/* jshint node: true */

module.exports = function(environment) {

  var customOptions = {
    locationType: 'hash',
    // *** no trailing slashes here: ***
    markdownPath: '../pages',
    pageindexPath: '..'
    // showAboutPageLink
    // showSyntaxPageLink
    // appTitle = 'markdownBrauser'
    // docIndexHeader = 'markdown document index'
    // ...
  }
  // FIXME doesnt work and looks ugly from the start
  if (typeof locationType != 'undefined') {
    customOptions.locationType = locationType;
  }
  if (typeof markdownPath != 'undefined') {
    customOptions.markdownPath = markdownPath;
  }
  if (typeof pageindexPath != 'undefined') {
    customOptions.pageindexPath = pageindexPath;
  }

  var ENV = {
    // markdownBrauser
    markdownPath: customOptions.markdownPath,
    pageindexPath: customOptions.pageindexPath,
    // emberjs
    locationType: customOptions.locationType,
    modulePrefix: 'markdown-brauser',
    environment: environment,
    baseURL: null, // '/', nearly deprecated, use null to disable

    //locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.emberHighlightJs = {
    style: 'github'
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' https://cdn.mxpnl.com", // Allow scripts from https://cdn.mxpnl.com
    'font-src': "'self' https://fonts.gstatic.com", // Allow fonts to be loaded from http://fonts.gstatic.com
    'connect-src': "'self' https://api.mixpanel.com http://custom-api.local", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
    'img-src': "'self'",
    'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
    'media-src': "'self'"
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
