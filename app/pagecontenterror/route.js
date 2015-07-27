import Ember from 'ember';

export default Ember.Route.extend({
  model: function(args) {
    var httpResponseCode = parseInt(args.id);
    var m = 'An unexpected error occured. Please check console.';
    console.log('Got CODE '+httpResponseCode+' foo!');
    switch (httpResponseCode) {
      case 401: m = 'Unauthorized. Bad password?';  break;
      case 403: m = 'Access forbidden.';            break;
      case 404: m = 'Page not found.';              break;
      case 500: m = 'Server error. Bad htaccess?';  break;
    }
    args.errorMessage = m;
    return args;
  }
});
