import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    query: {
      replace: true
    }
  },

  model: function() {
    // possibly not the nicest place to restore document title?
    Ember.$(document).attr('title', 'markdownBrauser');

    // always use cached data from application route
    return this.store.peekAll('page').filter(function(item/*, index, enumerable*/){
      if (item.get('is_directory')!==true && item.get('is_internal')!==true) {
        return true;
      }
      return false;
    });
  }

});
