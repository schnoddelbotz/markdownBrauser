import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

/*Ember.onerror = function(error) {
  /// URGH. HOOOOW *BAD* FIXME FIXME
  window.location.href = '#/error/500';
};*/

// http://stackoverflow.com/questions/4723213/detect-http-or-https-then-force-https-in-javascript ?
//if (window.location.protocol != "https:")
 //   window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
