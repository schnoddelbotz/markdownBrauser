import Ember from 'ember';
import config from 'markdown-brauser/config/environment';

export default Ember.Controller.extend({
  markdownPath: config.markdownPath
});
