import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    // catchall route to allow pages inside subdirectories.
    // otherwise, each subdirectory would require its own route...
    this.transitionTo('pagecontent', params.userpath);
  }
});
