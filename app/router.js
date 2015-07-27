import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  // document index -- URL: /#/
  this.route('index', { path: '/' });
  this.route('indexerror');

  // single page -- URL: /#/single_page_id
  this.route('pagecontent',  { path: '/:id' });
  this.route('pagecontenterror',  { path: '/error/:id' });
  // single page -- URL: /#/directory1/directory2/single_page_id
  this.route('catchall',  { path: '/*userpath' });
});

Ember.Route.reopen({
  // http://stackoverflow.com/questions/13120474/emberjs-scroll-to-top-when-changing-view
  render: function() {
    this._super();
    window.scrollTo(0, 0);
  }
});

export default Router;
