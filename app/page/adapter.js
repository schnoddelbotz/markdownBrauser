import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  buildURL: function() {
    return "../pageindex.json";
  }
});
