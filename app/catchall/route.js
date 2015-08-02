import Ember from 'ember';

export default Ember.Route.extend({
  // catchall route to allow pages inside subdirectories.
  // otherwise, each subdirectory would require its own route...
  // http://guides.emberjs.com/v1.10.0/routing/redirection/
  beforeModel: function(args) {
    this.transitionTo('pagecontent', args.params.catchall.userpath);
  }
});
