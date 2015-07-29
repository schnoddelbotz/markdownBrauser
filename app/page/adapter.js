import DS from 'ember-data';
import config from 'markdown-brauser/config/environment';

export default DS.RESTAdapter.extend({
  buildURL: function() {
    return config.pageindexPath + "/pageindex.json";
  }
});
