import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    query: {
      replace: true
    }
  },

  model: function() {
    // always use cached data from application route
    return this.store.peekAll('page');
  }

});
