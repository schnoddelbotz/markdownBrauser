
import config from '../config/environment';

// based on
// https://github.com/pk4media/ember-cli-docker-config/blob/master/app/initializers/docker-config.js
// ... but trying to avoid lodash dependency

export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
  var customConfig = window.DynamicENV;
  if (customConfig) {
    for (var opt in customConfig) {
      if (typeof config[opt] !== 'undefined') {
        config[opt] = customConfig[opt];
      }
    }
  }
}

export default {
  name: 'dynamic-env',
  initialize: initialize
};
